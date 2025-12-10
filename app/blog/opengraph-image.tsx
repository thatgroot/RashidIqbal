import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rashid Iqbal Blog - Web Development Insights";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
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

        {/* Orange gradient orb */}
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
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Blog badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              background: "#FFF7ED",
              color: "#EA580C",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#EA580C",
                borderRadius: "50%",
              }}
            />
            Blog
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#18181B",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Insights & Tutorials
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "24px",
              color: "#52525B",
              margin: 0,
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Web development, mobile apps, design systems, and conversion optimization
          </p>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "48px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#F97316",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              R
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "18px", fontWeight: 600, color: "#18181B" }}>
                Rashid Iqbal
              </span>
              <span style={{ fontSize: "14px", color: "#71717A" }}>
                Freelance Web Developer
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

