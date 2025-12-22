/**
 * NodeGraphPro — center-origin nodes + active-only coord controls
 * - Node X/Y = node CENTER (so 0,0 aligns with canvas center in Origin=Center)
 * - Only shows X/Y controls for nodes that appear in `edges`
 * - Correct initial connectors (ResizeObserver + RAF)
 * - Optimized for Safari performance
 *
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 500
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

import * as React from "react"
import { addPropertyControls, ControlType, PropertyControls, RenderTarget } from "framer"

type Stop = { color: string; at: number }
type Conn = { from: number; to: number }
type OriginMode = "center" | "topleft"
type PulseCurvePreset =
    | "ease"
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut"
    | "circInOut"
    | "backOut"
    | "expoInOut"
    | "custom"

type LineStyle = "solid" | "dashed" | "dotted"
type MarkerType = "none" | "arrow" | "circle"

const GRID = 8
const MAX_NODES = 24

// Detect Safari for performance optimizations
const isSafari =
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

// Debounce utility for measurements
function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

// Dynamic node props type
type NodePositionProps = {
    [key: `node${number}X`]: number
    [key: `node${number}Y`]: number
}

interface NodeGraphProps {
    children?: React.ReactNode[]
    edges: Conn[]
    originMode: OriginMode
    snapToGrid: boolean

    // Connection styling
    noodleColor: string
    noodleWidth: number
    curvature: number
    noodleStyle: LineStyle
    noodleOpacity: number
    startMarker: MarkerType
    endMarker: MarkerType

    // Pulse animation
    pulseEnabled: boolean
    pulseBaseColor: string
    pulseColor: string
    pulseUseGradient: boolean
    pulseAngle: number
    pulseStops: Stop[]
    pulseSizePx: number
    pulseSpeedPxPerSec: number
    pulseCurvePreset: PulseCurvePreset
    pulseCurveCustom?: string

    // Container styling
    backgroundColor: string
    borderColor: string
    borderWidth: number
    borderRadius: number

    // Grid styling
    showGrid: boolean
    gridColor: string
    gridOpacity: number

    style?: React.CSSProperties
}

// Intersection type for props
type Props = NodeGraphProps & NodePositionProps

function cubicPath(
    from: { x: number; y: number },
    to: { x: number; y: number },
    k: number
): string {
    const dx = to.x - from.x
    return `M ${from.x} ${from.y} C ${from.x + dx * k} ${from.y}, ${to.x - dx * k} ${to.y}, ${to.x} ${to.y}`
}

function curveToCSS(p: PulseCurvePreset, custom?: string): string {
    switch (p) {
        case "linear":
            return "linear"
        case "ease":
            return "ease"
        case "easeIn":
            return "cubic-bezier(0.42,0,1,1)"
        case "easeOut":
            return "cubic-bezier(0,0,0.58,1)"
        case "easeInOut":
            return "cubic-bezier(0.42,0,0.58,1)"
        case "circInOut":
            return "cubic-bezier(0.785,0.135,0.15,0.86)"
        case "backOut":
            return "cubic-bezier(0.175,0.885,0.32,1.275)"
        case "expoInOut":
            return "cubic-bezier(1,0,0,1)"
        case "custom":
            return custom && custom.trim() ? custom : "linear"
        default:
            return "ease"
    }
}

function defaultPos(i: number): { x: number; y: number } {
    return { x: 60 + i * 200, y: 60 + (i % 2) * 120 }
}

export default function NodeGraphPro(props: Props) {
    const {
        children,
        edges = [{ from: 1, to: 2 }],
        originMode = "center",
        snapToGrid = false,

        noodleColor = "#0099FF",
        noodleWidth = 4,
        curvature = 0.35,
        noodleStyle = "solid",
        noodleOpacity = 1,
        startMarker = "none",
        endMarker = "none",

        pulseEnabled = false,
        pulseBaseColor = "rgba(0,0,0,0.18)",
        pulseColor = "#38BDF8",
        pulseUseGradient = true,
        pulseAngle = 0,
        pulseStops = [
            { color: "#38BDF8", at: 0 },
            { color: "#06B6D4", at: 100 },
        ],
        pulseSizePx = 20,
        pulseSpeedPxPerSec = 160,
        pulseCurvePreset = "ease",
        pulseCurveCustom = "",

        backgroundColor = "transparent",
        borderColor = "transparent",
        borderWidth = 0,
        borderRadius = 0,

        showGrid = false,
        gridColor = "#000000",
        gridOpacity = 0.06,

        style,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ..._rest
    } = props

    const nodes = React.useMemo(
        () =>
            children ? (Array.isArray(children) ? children : [children]) : [],
        [children]
    )
    const n = nodes.length

    // Canvas size with debounced resize handling
    const wrapRef = React.useRef<HTMLDivElement | null>(null)
    const [wrapSize, setWrapSize] = React.useState({ w: 0, h: 0 })
    const [nodeSizes, setNodeSizes] = React.useState<{ w: number; h: number }[]>([])

    // Measure nodes - batch updates for Safari
    const nodeRefs = React.useRef<(HTMLDivElement | null)[]>([])

    // Measurement logic - safely accessed via callback
    const measure = React.useCallback(() => {
        const wrap = wrapRef.current
        if (!wrap) return
        const r = wrap.getBoundingClientRect()
        setWrapSize({ w: r.width, h: r.height })

        const sizes = nodeRefs.current.map((el) => ({
            w: el?.offsetWidth ?? 0,
            h: el?.offsetHeight ?? 0,
        }))

        setNodeSizes((prev) => {
            if (
                prev.length === sizes.length &&
                prev.every(
                    (s, i) => s.w === sizes[i].w && s.h === sizes[i].h
                )
            ) {
                return prev
            }
            return sizes
        })
    }, [])

    // Debounced measurement update
    const debouncedMeasure = React.useMemo(
        () => debounce(measure, isSafari ? 32 : 16),
        [measure]
    )

    React.useLayoutEffect(() => {
        if (!wrapRef.current) return
        
        // Initial measurement
        debouncedMeasure()

        const ro = new ResizeObserver(() => {
            debouncedMeasure()
        })
        ro.observe(wrapRef.current)
        return () => ro.disconnect()
    }, [debouncedMeasure])

    const panelCenters = React.useMemo(() => {
        const arr: { x: number; y: number }[] = []
        for (let i = 0; i < n; i++) {
            const d = defaultPos(i)
            // Access dynamic props safely using key construction
            const xKey = `node${i + 1}X` as keyof NodePositionProps
            const yKey = `node${i + 1}Y` as keyof NodePositionProps
            
            // @ts-ignore - Dynamic prop access
            const px = props[xKey]
            // @ts-ignore - Dynamic prop access
            const py = props[yKey]
            
            arr.push({
                x: typeof px === 'number' && Number.isFinite(px) ? px : d.x,
                y: typeof py === 'number' && Number.isFinite(py) ? py : d.y,
            })
        }
        return arr
    }, [props, n])

    // Internal center-relative positions (origin-normalized)
    const [relCenters, setRelCenters] = React.useState<
        { x: number; y: number }[]
    >([])

    // Sync state with props when not dragging (or initial load)
    React.useEffect(() => {
        // Prevent resetting state while dragging
        if (dragRef.current.i !== null) return

        const cx = wrapSize.w / 2
        const cy = wrapSize.h / 2
        setRelCenters(
            panelCenters.map((p) =>
                originMode === "center"
                    ? { x: p.x, y: p.y }
                    : { x: p.x - cx, y: p.y - cy }
            )
        )
    }, [panelCenters, originMode, wrapSize.w, wrapSize.h])

    React.useLayoutEffect(() => {
        if (isSafari) {
            // For Safari, use a single RAF instead of multiple ResizeObservers
            const raf = requestAnimationFrame(() => debouncedMeasure())
            return () => cancelAnimationFrame(raf)
        } else {
            // Chrome can handle multiple ResizeObservers efficiently
            const ros: ResizeObserver[] = []
            nodeRefs.current.forEach((el) => {
                if (!el) return
                const ro = new ResizeObserver(() => debouncedMeasure())
                ro.observe(el)
                ros.push(ro)
            })
            const raf = requestAnimationFrame(() => debouncedMeasure())
            return () => {
                ros.forEach((r) => r.disconnect())
                cancelAnimationFrame(raf)
            }
        }
    }, [n, debouncedMeasure])

    // Drag — center-based
    const dragRef = React.useRef<{
        i: number | null
        offCX: number
        offCY: number
    }>({ i: null, offCX: 0, offCY: 0 })
    const captureRef = React.useRef<HTMLElement | null>(null)

    const snap = React.useCallback(
        (v: number) => (snapToGrid ? Math.round(v / GRID) * GRID : v),
        [snapToGrid]
    )

    const onPointerDown = React.useCallback(
        (i: number, e: React.PointerEvent<HTMLDivElement>) => {
            // Allow dragging in preview/production, but maybe restrict in Canvas if you strictly want props to drive it.
            // For now, enabling it everywhere for better UX as requested.
            // if (RenderTarget.current() === RenderTarget.canvas) return

            const el = e.currentTarget as HTMLElement
            el.setPointerCapture(e.pointerId)
            captureRef.current = el
            const r = el.getBoundingClientRect()
            const centerX = r.left + r.width / 2
            const centerY = r.top + r.height / 2
            dragRef.current = {
                i,
                offCX: e.clientX - centerX,
                offCY: e.clientY - centerY,
            }
        },
        []
    )

    const onPointerMove = React.useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const idx = dragRef.current.i
            if (idx == null || !wrapRef.current) return
            const parent = wrapRef.current.getBoundingClientRect()
            const absCX = e.clientX - parent.left - dragRef.current.offCX
            const absCY = e.clientY - parent.top - dragRef.current.offCY
            const cx = wrapSize.w / 2
            const cy = wrapSize.h / 2
            setRelCenters((prev) => {
                const a = prev.slice()
                a[idx] = { x: snap(absCX) - cx, y: snap(absCY) - cy }
                return a
            })
        },
        [wrapSize.w, wrapSize.h, snap]
    )

    const onPointerUp = React.useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (captureRef.current) {
                try {
                    captureRef.current.releasePointerCapture(e.pointerId)
                } catch {}
            }
            dragRef.current.i = null
            captureRef.current = null
        },
        []
    )

    // Anchors from node CENTER → left/right midpoint
    const anchorFor = React.useCallback(
        (i: number, side: "left" | "right") => {
            const cx = wrapSize.w / 2
            const cy = wrapSize.h / 2
            const c = relCenters[i] || { x: 0, y: 0 }
            const w = nodeSizes[i]?.w ?? 0
            const centerX = cx + c.x
            const centerY = cy + c.y
            return {
                x: centerX + (side === "right" ? +w / 2 : -w / 2),
                y: centerY,
            }
        },
        [relCenters, wrapSize.w, wrapSize.h, nodeSizes]
    )

    // Edges → paths
    const edgePairs = React.useMemo<[number, number][]>(() => {
        const out: [number, number][] = []
        const conf = Array.isArray(edges) ? edges : []
        if (conf.length) {
            conf.forEach(({ from, to }) => {
                const a = (Number(from) | 0) - 1
                const b = (Number(to) | 0) - 1
                if (a >= 0 && b >= 0 && a < n && b < n && a !== b)
                    out.push([a, b])
            })
        }
        if (!out.length && n >= 2) {
            for (let i = 0; i < n - 1; i++) out.push([i, i + 1])
        }
        return out
    }, [edges, n])

    // Memoize path strings more efficiently
    const pathData = React.useMemo(() => {
        return edgePairs.map(([a, b]) =>
            cubicPath(anchorFor(a, "right"), anchorFor(b, "left"), curvature)
        )
    }, [edgePairs, anchorFor, curvature])

    // Path lengths - cache more aggressively
    const pathRefs = React.useRef<SVGPathElement[]>([])
    const [lengths, setLengths] = React.useState<number[]>([])

    React.useLayoutEffect(() => {
        // Only recalculate if paths actually changed
        const newLengths = pathRefs.current.map((el) => {
            if (!el) return 0
            try {
                return Math.max(1, el.getTotalLength())
            } catch {
                return 0
            }
        })
        setLengths(newLengths)
    }, [pathData])

    // Pulse animation optimization
    const id = React.useId()
    const instanceId = React.useMemo(
        () => id.replace(/:/g, ""),
        [id]
    )

    const timingFunction = React.useMemo(
        () => curveToCSS(pulseCurvePreset, pulseCurveCustom),
        [pulseCurvePreset, pulseCurveCustom]
    )

    // Generate keyframes CSS with Safari optimizations
    const keyframesCSS = React.useMemo(() => {
        if (!pulseEnabled) return ""

        let css = ""
        for (let i = 0; i < pathData.length; i++) {
            const len = Math.max(1, lengths[i] || 0)
            const size = Math.max(1, pulseSizePx)
            const name = `pulse_${instanceId}_${i}`

            if (isSafari) {
                // Simpler keyframes for Safari
                css += `@keyframes ${name}{0%{stroke-dashoffset:${size}px}100%{stroke-dashoffset:-${len + size}px}}`
            } else {
                css += `@keyframes ${name}{from{stroke-dashoffset:${size}px}to{stroke-dashoffset:-${len + size}px}}`
            }
        }
        return css
    }, [pulseEnabled, pathData.length, lengths, pulseSizePx, instanceId])

    // Gradients - optimize for Safari
    const gradientDefs = React.useMemo(() => {
        if (!pulseEnabled || !pulseUseGradient) return null

        // Skip gradient on Safari if too many edges
        if (isSafari && pathData.length > 5) return null

        return (
            <defs>
                {pathData.map((d, i) => {
                    const m1 = d.match(/^M\s*([-\d.]+)\s+([-\d.]+)/)
                    const m2 = d.match(/([-\d.]+)\s+([-\d.]+)\s*$/)
                    const fx = m1 ? parseFloat(m1[1]) : 0
                    const fy = m1 ? parseFloat(m1[2]) : 0
                    const tx = m2 ? parseFloat(m2[1]) : 100
                    const ty = m2 ? parseFloat(m2[2]) : 0
                    const mx = (fx + tx) / 2
                    const my = (fy + ty) / 2
                    const half = Math.hypot(tx - fx, ty - fy) / 2
                    const th = (pulseAngle * Math.PI) / 180
                    const ux = Math.cos(th)
                    const uy = Math.sin(th)
                    const gx1 = mx - ux * half
                    const gy1 = my - uy * half
                    const gx2 = mx + ux * half
                    const gy2 = my + uy * half
                    const stops = (pulseStops || [])
                        .slice()
                        .sort((a, b) => a.at - b.at)

                    return (
                        <linearGradient
                            key={`g-${i}`}
                            id={`grad_${instanceId}_${i}`}
                            gradientUnits="userSpaceOnUse"
                            x1={gx1}
                            y1={gy1}
                            x2={gx2}
                            y2={gy2}
                        >
                            {stops.map((s, idx) => (
                                <stop
                                    key={idx}
                                    offset={`${Math.max(0, Math.min(100, s.at))}%`}
                                    stopColor={s.color}
                                />
                            ))}
                        </linearGradient>
                    )
                })}
            </defs>
        )
    }, [
        pulseEnabled,
        pulseUseGradient,
        pulseAngle,
        pulseStops,
        pathData,
        instanceId,
    ])

    // Markers definitions
    const markerDefs = React.useMemo(() => {
        return (
            <defs>
                <marker
                    id={`marker-arrow-${instanceId}`}
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={noodleColor} />
                </marker>
                <marker
                    id={`marker-circle-${instanceId}`}
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                >
                    <circle cx="5" cy="5" r="4" fill={noodleColor} />
                </marker>
            </defs>
        )
    }, [noodleColor, instanceId])

    // Safari-specific animation properties
    const getAnimationStyle = React.useCallback(
        (i: number): React.CSSProperties => {
            const len = Math.max(1, lengths[i] || 0)
            const size = Math.max(1, pulseSizePx)
            const name = `pulse_${instanceId}_${i}`
            const duration = (len + size) / Math.max(1, pulseSpeedPxPerSec)
            const dashArray = `${size} ${len + size * 2}`

            if (isSafari) {
                // Reduced complexity for Safari
                return {
                    strokeDasharray: dashArray,
                    strokeDashoffset: `${size}px`,
                    animationName: name,
                    animationDuration: `${Math.max(0.1, duration)}s`,
                    animationTimingFunction: "linear", // Force linear on Safari
                    animationIterationCount: "infinite",
                    animationFillMode: "forwards",
                    // Don't use will-change on Safari
                }
            } else {
                // Full animation for Chrome
                return {
                    strokeDasharray: dashArray,
                    strokeDashoffset: `${size}px`,
                    animationName: name,
                    animationDuration: `${Math.max(0.05, duration)}s`,
                    animationTimingFunction: timingFunction,
                    animationIterationCount: "infinite",
                    animationFillMode: "forwards",
                    willChange: "stroke-dashoffset",
                }
            }
        },
        [lengths, pulseSizePx, pulseSpeedPxPerSec, instanceId, timingFunction]
    )

    const dashArray = noodleStyle === "dashed" ? "8 4" : noodleStyle === "dotted" ? "2 4" : undefined

    // Render
    return (
        <div
            ref={wrapRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                backgroundColor,
                borderColor,
                borderWidth,
                borderRadius,
                borderStyle: borderWidth > 0 ? "solid" : "none",
                ...style,
            }}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
        >
            {showGrid && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        zIndex: 0,
                        opacity: gridOpacity,
                        backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px),
             linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                        backgroundSize: `${GRID}px ${GRID}px`,
                    }}
                />
            )}

            {pulseEnabled && <style>{keyframesCSS}</style>}

            <svg
                width={wrapSize.w}
                height={wrapSize.h}
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 1,
                }}
                // Optimize SVG rendering for Safari
                shapeRendering={isSafari ? "optimizeSpeed" : "auto"}
            >
                {gradientDefs}
                {(startMarker !== "none" || endMarker !== "none") && markerDefs}
                
                {pathData.map((d, i) => {
                    const useGradient =
                        pulseUseGradient && (!isSafari || pathData.length <= 5)

                    const markerStart = startMarker === "arrow" ? `url(#marker-arrow-${instanceId})` : startMarker === "circle" ? `url(#marker-circle-${instanceId})` : undefined
                    const markerEnd = endMarker === "arrow" ? `url(#marker-arrow-${instanceId})` : endMarker === "circle" ? `url(#marker-circle-${instanceId})` : undefined

                    const base = (
                        <path
                            ref={(el) => {
                                if (el) pathRefs.current[i] = el
                            }}
                            key={`base-${i}`}
                            d={d}
                            stroke={pulseEnabled ? pulseBaseColor : noodleColor}
                            strokeWidth={noodleWidth}
                            strokeOpacity={noodleOpacity}
                            strokeDasharray={dashArray}
                            fill="none"
                            vectorEffect="non-scaling-stroke"
                            markerStart={markerStart}
                            markerEnd={markerEnd}
                        />
                    )

                    if (!pulseEnabled) return <g key={`e-${i}`}>{base}</g>

                    return (
                        <g key={`e-${i}`}>
                            {base}
                            <path
                                d={d}
                                stroke={
                                    useGradient
                                        ? `url(#grad_${instanceId}_${i})`
                                        : pulseColor
                                }
                                strokeWidth={noodleWidth}
                                strokeLinecap="round"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                style={getAnimationStyle(i)}
                            />
                        </g>
                    )
                })}
            </svg>

            {/* Nodes — CENTER positioned with translate(-50%,-50%) */}
            {nodes.map((content, i) => {
                const cx = wrapSize.w / 2
                const cy = wrapSize.h / 2
                const c = relCenters[i] || { x: 0, y: 0 }
                return (
                    <div
                        key={`n-${i}`}
                        ref={(el) => {
                            nodeRefs.current[i] = el
                        }}
                        onPointerDown={(e) => onPointerDown(i, e)}
                        style={{
                            position: "absolute",
                            left: cx + c.x,
                            top: cy + c.y,
                            transform: "translate(-50%, -50%)",
                            display: "inline-flex",
                            cursor: RenderTarget.current() === RenderTarget.canvas ? "default" : "grab",
                            userSelect: "none",
                            zIndex: 2,
                            // Use transform3d for better Safari performance
                            ...(isSafari
                                ? {
                                      transform: "translate3d(-50%, -50%, 0)",
                                      backfaceVisibility: "hidden",
                                  }
                                : {}),
                        }}
                        role="button"
                        aria-label={`Node ${i + 1}`}
                    >
                        {content}
                    </div>
                )
            })}
        </div>
    )
}

// ---------- Property Controls ----------
const baseControls: PropertyControls<Props> = {
    children: { 
        type: ControlType.Slot, 
        title: "Nodes", 
        description: "Connect multiple Frames to create nodes.",
        maxCount: MAX_NODES 
    },

    edges: {
        type: ControlType.Array,
        title: "Edges",
        control: {
            type: ControlType.Object,
            controls: {
                from: {
                    type: ControlType.Number,
                    title: "From Node",
                    defaultValue: 1,
                    min: 1,
                    max: MAX_NODES,
                    step: 1,
                },
                to: {
                    type: ControlType.Number,
                    title: "To Node",
                    defaultValue: 2,
                    min: 1,
                    max: MAX_NODES,
                    step: 1,
                },
            },
        },
        defaultValue: [{ from: 1, to: 2 }],
    },

    originMode: {
        type: ControlType.Enum,
        title: "Origin",
        options: ["center", "topleft"],
        optionTitles: ["Center (0,0)", "Top-left (0,0)"],
        defaultValue: "center",
    },

    snapToGrid: {
        type: ControlType.Boolean,
        title: "Snap Grid",
        defaultValue: false,
    },

    // --- Styling Section ---
    noodleColor: {
        type: ControlType.Color,
        title: "Line Color",
        defaultValue: "#0099FF",
    },
    noodleWidth: {
        type: ControlType.Number,
        title: "Line Width",
        defaultValue: 4,
        min: 1,
        max: 32,
        step: 1,
    },
    noodleOpacity: {
        type: ControlType.Number,
        title: "Line Opacity",
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 0.1,
    },
    curvature: {
        type: ControlType.Number,
        title: "Curvature",
        defaultValue: 0.35,
        min: 0,
        max: 1,
        step: 0.05,
    },
    noodleStyle: {
        type: ControlType.Enum,
        title: "Line Style",
        options: ["solid", "dashed", "dotted"],
        optionTitles: ["Solid", "Dashed", "Dotted"],
        defaultValue: "solid",
    },
    startMarker: {
        type: ControlType.Enum,
        title: "Start Cap",
        options: ["none", "arrow", "circle"],
        optionTitles: ["None", "Arrow", "Circle"],
        defaultValue: "none",
    },
    endMarker: {
        type: ControlType.Enum,
        title: "End Cap",
        options: ["none", "arrow", "circle"],
        optionTitles: ["None", "Arrow", "Circle"],
        defaultValue: "none",
    },

    // --- Container Styling ---
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "transparent",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: "transparent",
    },
    borderWidth: {
        type: ControlType.Number,
        title: "Border Width",
        defaultValue: 0,
        min: 0,
        max: 20,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 0,
        min: 0,
        max: 100,
    },

    // --- Grid Styling ---
    showGrid: {
        type: ControlType.Boolean,
        title: "Show Grid",
        defaultValue: false,
    },
    gridColor: {
        type: ControlType.Color,
        title: "Grid Color",
        defaultValue: "#000000",
        hidden: (p: Partial<Props>) => !p.showGrid,
    },
    gridOpacity: {
        type: ControlType.Number,
        title: "Grid Opacity",
        defaultValue: 0.06,
        min: 0,
        max: 1,
        step: 0.01,
        hidden: (p: Partial<Props>) => !p.showGrid,
    },

    // --- Pulse Animation ---
    pulseEnabled: {
        type: ControlType.Boolean,
        title: "Enable Pulse",
        defaultValue: false,
    },
    pulseBaseColor: {
        type: ControlType.Color,
        title: "Track Color",
        defaultValue: "rgba(0,0,0,0.18)",
        hidden: (p: Partial<Props>) => !p.pulseEnabled,
    },
    pulseUseGradient: {
        type: ControlType.Boolean,
        title: "Gradient",
        defaultValue: true,
        hidden: (p: Partial<Props>) => !p.pulseEnabled,
    },
    pulseAngle: {
        type: ControlType.Number,
        title: "Angle",
        defaultValue: 0,
        min: -360,
        max: 360,
        step: 15,
        unit: "°",
        hidden: (p: Partial<Props>) => !p.pulseEnabled || !p.pulseUseGradient,
    },
    pulseStops: {
        type: ControlType.Array,
        title: "Stops",
        hidden: (p: Partial<Props>) => !p.pulseEnabled || !p.pulseUseGradient,
        control: {
            type: ControlType.Object,
            controls: {
                color: {
                    type: ControlType.Color,
                    title: "Color",
                    defaultValue: "#38BDF8",
                },
                at: {
                    type: ControlType.Number,
                    title: "Position",
                    defaultValue: 0,
                    min: 0,
                    max: 100,
                    step: 1,
                    unit: "%",
                },
            },
        },
        defaultValue: [
            { color: "#38BDF8", at: 0 },
            { color: "#06B6D4", at: 100 },
        ],
        maxCount: 6,
    },
    pulseColor: {
        type: ControlType.Color,
        title: "Pulse Color",
        defaultValue: "#38BDF8",
        hidden: (p: Partial<Props>) =>
            !p.pulseEnabled || !!p.pulseUseGradient,
    },
    pulseSizePx: {
        type: ControlType.Number,
        title: "Size",
        defaultValue: 20,
        min: 2,
        max: 200,
        step: 1,
        unit: "px",
        hidden: (p: Partial<Props>) => !p.pulseEnabled,
    },
    pulseSpeedPxPerSec: {
        type: ControlType.Number,
        title: "Speed",
        defaultValue: 160,
        min: 10,
        max: 2000,
        step: 10,
        unit: "px/s",
        hidden: (p: Partial<Props>) => !p.pulseEnabled,
    },
    pulseCurvePreset: {
        type: ControlType.Enum,
        title: "Curve",
        options: [
            "ease",
            "linear",
            "easeIn",
            "easeOut",
            "easeInOut",
            "circInOut",
            "backOut",
            "expoInOut",
            "custom",
        ],
        optionTitles: [
            "Ease",
            "Linear",
            "Ease In",
            "Ease Out",
            "Ease InOut",
            "Circ InOut",
            "Back Out",
            "Expo InOut",
            "Custom",
        ],
        defaultValue: "ease",
        hidden: (p: Partial<Props>) => !p.pulseEnabled,
    },
    pulseCurveCustom: {
        type: ControlType.String,
        title: "Custom Curve",
        placeholder: "cubic-bezier(x1,y1,x2,y2)",
        hidden: (p: Partial<Props>) =>
            !p.pulseEnabled || p.pulseCurvePreset !== "custom",
    },
}

// Show coord controls strictly for nodes referenced in `edges`
for (let i = 1; i <= MAX_NODES; i++) {
    const d = defaultPos(i - 1)
    const hidden = (p: Partial<Props>) => {
        const edges = Array.isArray(p?.edges) ? p.edges : []
        if (!edges.length) return true
        let used = false
        for (const e of edges) {
            const f = Number(e.from) || 0
            const t = Number(e.to) || 0
            if (f === i || t === i) {
                used = true
                break
            }
        }
        return !used
    }
    baseControls[`node${i}X`] = {
        type: ControlType.Number,
        title: `Node ${i} X`,
        defaultValue: d.x,
        min: -4000,
        max: 4000,
        step: 1,
        hidden,
    }
    baseControls[`node${i}Y`] = {
        type: ControlType.Number,
        title: `Node ${i} Y`,
        defaultValue: d.y,
        min: -4000,
        max: 4000,
        step: 1,
        hidden,
    }
}

addPropertyControls(NodeGraphPro, baseControls)
