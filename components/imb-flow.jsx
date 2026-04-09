import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

// ── Custom node types ──────────────────────────────────────────────────────────

const HexNode = ({ data }) => (
  <div className="flow-node hex-node" style={{
    background: "#1a1f2e", border: "1.5px solid #4a9eff",
    borderRadius: 6, padding: "10px 22px", fontSize: 14,
    color: "#e8f4ff", fontFamily: "'JetBrains Mono', monospace",
    clipPath: "polygon(8% 0%,92% 0%,100% 50%,92% 100%,8% 100%,0% 50%)",
    minWidth: 200, textAlign: "center", fontStyle: "italic",
    boxShadow: "0 0 16px #4a9eff44", transition: "all 0.3s ease"
  }}>
    {data.label}
  </div>
);

const GlowNode = ({ data }) => (
  <div className="flow-node glow-node pulse-glow" style={{
    background: "linear-gradient(135deg,#0d1117 0%,#1a1f2e 100%)",
    border: "1.5px solid #4a9eff", borderRadius: 10,
    padding: "10px 24px", fontSize: 14, color: "#e8f4ff",
    fontFamily: "'JetBrains Mono', monospace", textAlign: "center",
    boxShadow: "0 0 20px #4a9eff55, inset 0 0 20px #4a9eff11",
    minWidth: 160, transition: "all 0.3s ease"
  }}>
    {data.label}
  </div>
);

const DashedNode = ({ data }) => (
  <div className="flow-node dashed-node" style={{
    background: "transparent", border: "1.5px dashed #7b61ff",
    borderRadius: 6, padding: "8px 16px", fontSize: 13,
    color: "#c9b8ff", fontFamily: "'JetBrains Mono', monospace",
    boxShadow: "0 0 14px #7b61ff33", textAlign: "center",
    transition: "all 0.3s ease"
  }}>
    <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 16 }}>τ</span>(t) {data.label}
  </div>
);

const PillNode = ({ data }) => (
  <div className="flow-node pill-node" style={{
    background: "linear-gradient(135deg,#1a1f2e,#0d1117)",
    border: "1.5px solid #00d4aa", borderRadius: 24,
    padding: "10px 28px", fontSize: 14, color: "#e8f4ff",
    fontFamily: "'JetBrains Mono', monospace", textAlign: "center",
    boxShadow: "0 0 18px #00d4aa44",
    whiteSpace: "pre-line", transition: "all 0.3s ease"
  }}>
    {data.label}
  </div>
);

const QueryNode = ({ data }) => (
  <div className="flow-node query-node animate-float" style={{
    background: "#1a1f2e", border: "1.5px solid #4a9eff",
    padding: "10px 28px", fontSize: 14, color: "#e8f4ff",
    fontFamily: "'JetBrains Mono', monospace", textAlign: "center",
    clipPath: "polygon(6% 0%,94% 0%,100% 50%,94% 100%,6% 100%,0% 50%)",
    minWidth: 180, boxShadow: "0 0 16px #4a9eff44",
    transition: "all 0.3s ease"
  }}>
    {data.label}
  </div>
);

const SideNode = ({ data }) => (
  <div className="flow-node side-node" style={{
    background: "#0d1117", border: "1px solid #333d52",
    borderRadius: 6, padding: "8px 16px", fontSize: 13,
    color: "#8899bb", fontFamily: "'JetBrains Mono', monospace",
    borderLeft: "3px solid #4a9eff33", transition: "all 0.3s ease"
  }}>
    {data.label}
  </div>
);

const GroupBoxNode = ({ data }) => (
  <div className="group-box-node" style={{
    background: "rgba(74,158,255,0.02)", border: "1px dashed #334",
    borderRadius: 16, width: "100%", height: "100%",
    fontFamily: "'JetBrains Mono', monospace", transition: "all 0.5s ease"
  }}>
    {data.label && (
      <div style={{
        position: "absolute", top: -22, left: 16,
        fontSize: 12, color: "#4a9eff99", letterSpacing: 2,
        textTransform: "uppercase",
      }}>{data.label}</div>
    )}
  </div>
);

const FlowStyles = () => (
  <style>{`
    @keyframes dash {
      to { stroke-dashoffset: -20; }
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 15px #4a9eff55; border-color: #4a9eff88; }
      50% { box-shadow: 0 0 30px #4a9eff88; border-color: #4a9eff; }
      100% { box-shadow: 0 0 15px #4a9eff55; border-color: #4a9eff88; }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    .react-flow__edge-path {
      stroke-dasharray: 5;
      animation: dash 1s linear infinite;
    }
    .pulse-glow {
      animation: pulse 3s ease-in-out infinite;
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .flow-node:hover {
      transform: scale(1.05) translateY(-2px);
      z-index: 1000 !important;
      filter: brightness(1.2) contrast(1.1);
      cursor: crosshair;
    }
    .react-flow__handle {
      width: 6px; height: 6px; background: #4a9eff; border: none;
    }
  `}</style>
);

const nodeTypes = {
  hexNode: HexNode,
  glowNode: GlowNode,
  dashedNode: DashedNode,
  pillNode: PillNode,
  queryNode: QueryNode,
  sideNode: SideNode,
  groupBox: GroupBoxNode,
};

// ── Initial nodes ──────────────────────────────────────────────────────────────

const initialNodes = [
  // Background group boxes
  {
    id: "group-reasoning",
    type: "groupBox",
    position: { x: 60, y: 170 },
    data: { label: "Reasoning Memory" },
    style: { width: 760, height: 510, zIndex: 0 },
    draggable: false, selectable: false,
  },
  {
    id: "group-reuse",
    type: "groupBox",
    position: { x: 80, y: 350 },
    data: { label: "" },
    style: { width: 330, height: 70, zIndex: 1, borderColor: "#4a9eff44" },
    draggable: false, selectable: false,
  },

  // Main flow nodes
  {
    id: "incoming-query",
    type: "queryNode",
    position: { x: 320, y: 20 },
    data: { label: "Incoming Query" },
  },
  {
    id: "semantic-encoding",
    type: "glowNode",
    position: { x: 280, y: 110 },
    data: { label: "Semantic Encoding  φ(q)" },
  },
  {
    id: "memory-index",
    type: "default",
    position: { x: 100, y: 230 },
    data: { label: "Memory Index\nM = {(qᵢ, aᵢ)}" },
    style: {
      background: "#111827", border: "1.5px solid #4a9eff88",
      borderRadius: 6, padding: "12px 16px", fontSize: 13,
      color: "#c8d8f0", fontFamily: "'JetBrains Mono', monospace",
      width: 170, textAlign: "center", whiteSpace: "pre-line",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
    },
  },
  {
    id: "similarity-search",
    type: "default",
    position: { x: 310, y: 215 },
    data: { label: "Similarity Search\n◈ Vector Index" },
    style: {
      background: "#111827", border: "1.5px solid #4a9eff",
      borderRadius: 6, padding: "12px 20px", fontSize: 13,
      color: "#c8d8f0", fontFamily: "'JetBrains Mono', monospace",
      width: 200, textAlign: "center", whiteSpace: "pre-line",
      boxShadow: "0 0 12px #4a9eff22",
    },
  },
  {
    id: "adaptive-threshold",
    type: "dashedNode",
    position: { x: 590, y: 225 },
    data: { label: "Adaptive Threshold" },
  },
  {
    id: "sim-check",
    type: "hexNode",
    position: { x: 380, y: 348 },
    data: { label: "sim(q, qᵢ) ≥ τ" },
  },
  {
    id: "reuse-ai",
    type: "default",
    position: { x: 100, y: 360 },
    data: { label: "Reuse  aᵢ" },
    style: {
      background: "#0d1117", border: "2px solid #00d4aa",
      borderRadius: 8, padding: "10px 18px", fontSize: 13,
      color: "#80ffdc", fontFamily: "'JetBrains Mono', monospace",
      boxShadow: "0 0 15px #00d4aa33",
    },
  },
  {
    id: "llm-inference-reuse",
    type: "default",
    position: { x: 240, y: 360 },
    data: { label: "LLM Inference" },
    style: {
      background: "#111827", border: "1px solid #334455",
      borderRadius: 8, padding: "10px 18px", fontSize: 13,
      color: "#667788", fontFamily: "'JetBrains Mono', monospace",
    },
  },
  {
    id: "llm-inference-main",
    type: "glowNode",
    position: { x: 385, y: 460 },
    data: { label: "LLM Inference" },
  },
  {
    id: "memory-update",
    type: "pillNode",
    position: { x: 215, y: 560 },
    data: { label: "Memory Update\nM ← M ∪ {(q, a)}" },
  },
  {
    id: "decay-freshness",
    type: "sideNode",
    position: { x: 740, y: 340 },
    data: { label: "⟳  Decay / Freshness" },
  },
  {
    id: "local-global-imbs",
    type: "sideNode",
    position: { x: 740, y: 460 },
    data: { label: "⟳  Local / Global IMBs" },
  },
];

// ── Initial edges ──────────────────────────────────────────────────────────────

const ARROW = { type: MarkerType.ArrowClosed, color: "#4a9eff" };
const ARROW_DIM = { type: MarkerType.ArrowClosed, color: "#556" };

const initialEdges = [
  { id: "e1", source: "incoming-query", target: "semantic-encoding", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#4a9eff", strokeWidth: 2 } },
  { id: "e2", source: "semantic-encoding", target: "similarity-search", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#4a9eff", strokeWidth: 2 } },
  { id: "e3", source: "memory-index", target: "similarity-search", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#4a9eff66", strokeWidth: 1.5 } },
  { id: "e4", source: "memory-index", target: "reuse-ai", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#4a9eff66", strokeWidth: 1.5 } },
  { id: "e5", source: "adaptive-threshold", target: "sim-check", type: "smoothstep", markerEnd: ARROW_DIM, style: { stroke: "#7b61ff44", strokeWidth: 1.5, strokeDasharray: "5 4" } },
  { id: "e6", source: "similarity-search", target: "sim-check", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#4a9eff", strokeWidth: 2 } },
  {
    id: "e7", source: "sim-check", target: "reuse-ai", type: "smoothstep",
    label: "MATCH", labelStyle: { fill: "#00d4aa", fontSize: 10, fontFamily: "JetBrains Mono", fontWeight: 800, letterSpacing: 1 },
    labelBgStyle: { fill: "#0d1117" },
    markerEnd: { ...ARROW, color: "#00d4aa" }, style: { stroke: "#00d4aa", strokeWidth: 2 },
  },
  {
    id: "e8", source: "sim-check", target: "llm-inference-main", type: "smoothstep",
    label: "MISS", labelStyle: { fill: "#ff6b6b", fontSize: 10, fontFamily: "JetBrains Mono", fontWeight: 800, letterSpacing: 1 },
    labelBgStyle: { fill: "#0d1117" },
    markerEnd: { ...ARROW, color: "#ff6b6b" }, style: { stroke: "#ff6b6b", strokeWidth: 2 },
  },
  { id: "e11", source: "llm-inference-main", target: "memory-update", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#4a9eff", strokeWidth: 2 } },
  { id: "e12", source: "reuse-ai", target: "memory-update", type: "smoothstep", markerEnd: ARROW, style: { stroke: "#00d4aa66", strokeWidth: 1.5 } },
];

// ── Export helpers ─────────────────────────────────────────────────────────────

function downloadJSON(nodes, edges) {
  const data = JSON.stringify({ nodes, edges }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "imb-flow.json"; a.click();
  URL.revokeObjectURL(url);
}

function downloadSVG() {
  const svg = document.querySelector(".react-flow__renderer")?.closest("svg")
    || document.querySelector(".react-flow svg");
  if (!svg) { alert("SVG not found — try zooming to fit first."); return; }
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  const blob = new Blob([source], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "imb-flow.svg"; a.click();
  URL.revokeObjectURL(url);
}

async function downloadPNG(rfInstance) {
  if (!rfInstance) return;
  const viewport = document.querySelector(".react-flow__viewport");
  if (!viewport) return;

  // Use html-to-image via CDN (loaded dynamically)
  if (!window.htmlToImage) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js";
    document.head.appendChild(script);
    await new Promise(r => { script.onload = r; });
  }

  const wrapper = document.querySelector(".react-flow__renderer") || document.querySelector(".react-flow");
  window.htmlToImage.toPng(wrapper, { backgroundColor: "#0d1117", pixelRatio: 2 }).then(url => {
    const a = document.createElement("a");
    a.href = url; a.download = "imb-flow.png"; a.click();
  });
}

// ── Main component ─────────────────────────────────────────────────────────────

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%", background: "#0d1117", fontFamily: "'JetBrains Mono', monospace", position: "relative" }}>
      <FlowStyles />
      {/* Title bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
        background: "linear-gradient(90deg,#0d1117,#111827)",
        borderBottom: "1px solid #1e2a3a", padding: "14px 24px",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div>
          <div style={{ color: "#4a9eff", fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
            Intelligence Memory Banks
          </div>
          <div style={{ color: "#445566", fontSize: 11, marginTop: 2 }}>
            Persistent reasoning memory · deterministic inference
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {[
            { label: "↓ JSON", fn: () => downloadJSON(nodes, edges), color: "#4a9eff" },
            { label: "↓ SVG", fn: downloadSVG, color: "#7b61ff" },
            { label: "↓ PNG", fn: () => downloadPNG(rfInstance), color: "#00d4aa" },
          ].map(btn => (
            <button key={btn.label} onClick={btn.fn} style={{
              background: "transparent", border: `1px solid ${btn.color}44`,
              borderRadius: 6, padding: "6px 14px", color: btn.color,
              fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              transition: "all .15s",
            }}
              onMouseEnter={e => e.target.style.background = btn.color + "22"}
              onMouseLeave={e => e.target.style.background = "transparent"}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        style={{ paddingTop: 60 }}
        defaultEdgeOptions={{ type: "smoothstep" }}
      >
        <Background color="#1e2a3a" gap={20} size={1} />
        <Controls style={{
          background: "#111827", border: "1px solid #1e2a3a",
          borderRadius: 8, overflow: "hidden",
        }} />
        <MiniMap
          nodeColor={() => "#1e2a3a"}
          maskColor="#0d111788"
          style={{ background: "#111827", border: "1px solid #1e2a3a", borderRadius: 8 }}
        />
        <Panel position="bottom-center">
          <div style={{ color: "#2a3a4a", fontSize: 10, letterSpacing: 1 }}>
            drag · scroll to zoom · double-click canvas to reset
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default function AppF() {
  return (
    <Flow />
  );
}
