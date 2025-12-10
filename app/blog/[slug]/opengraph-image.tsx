import { ImageResponse } from "next/og";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;

  // Format slug to title (basic conversion)
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Orange gradient orb - top right */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Top Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#F97316",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "white",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <span style={{ fontSize: "20px", fontWeight: 600, color: "#18181B" }}>
                Rashid Iqbal
              </span>
            </div>

            {/* Blog Badge */}
            <div
              style={{
                padding: "8px 16px",
                background: "#FFF7ED",
                color: "#EA580C",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Blog
            </div>
          </div>

          {/* Middle Section - Title */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
            <h1
              style={{
                fontSize: title.length > 60 ? "48px" : "56px",
                fontWeight: 800,
                color: "#18181B",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#F97316",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                R
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "#18181B" }}>
                  Rashid Iqbal
                </span>
                <span style={{ fontSize: "14px", color: "#71717A" }}>Blog Article</span>
              </div>
            </div>

            {/* Blog indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "white",
                border: "1px solid #E4E4E7",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#F97316",
                  borderRadius: "50%",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#52525B" }}>
                aestho.xyz/blog
              </span>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(to right, #F97316, #EA580C)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
