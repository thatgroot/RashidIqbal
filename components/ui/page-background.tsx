interface PageBackgroundProps {
    variant?: "default" | "subtle" | "gradient";
    className?: string;
}

/**
 * Shared page background component
 * Eliminates code duplication across page components
 */
export function PageBackground({
    variant = "default",
    className = "",
}: PageBackgroundProps) {
    return (
        <div className={`fixed inset-0 -z-10 ${className}`}>
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-zinc-50/50" />

            {/* Gradient orbs for default variant */}
            {variant === "default" && (
                <>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1b1938]/[0.02] rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1b1938]/[0.02] rounded-full blur-3xl" />
                </>
            )}

            {/* Gradient orbs for gradient variant */}
            {variant === "gradient" && (
                <>
                    <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#1b1938]/[0.03] rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-3xl" />
                </>
            )}
        </div>
    );
}
