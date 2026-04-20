import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

function toBase64(buf: ArrayBuffer): string {
  // Prefer Buffer when available (works in Vercel Edge).
  // Fallback to a Uint8Array chunked loop for strict Web runtimes.
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const B = (globalThis as any).Buffer;
    if (B) return B.from(buf).toString("base64");
  } catch {
    // fall through
  }
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (globalThis as any).btoa(binary);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const rawTitle = searchParams.get("title") ?? "Rashid Iqbal — Blog";
    const title =
      rawTitle.length > 180 ? rawTitle.slice(0, 177) + "…" : rawTitle;

    const [bgBuf, avatarBuf] = await Promise.all([
      fetch(new URL("/blog-cover-bg.png", origin)).then((r) => r.arrayBuffer()),
      fetch(new URL("/favicon.svg", origin)).then((r) => r.arrayBuffer()),
    ]);

    const bgB64 = `data:image/png;base64,${toBase64(bgBuf)}`;
    const avatarB64 = `data:image/svg+xml;base64,${toBase64(avatarBuf)}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${bgB64})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
            padding: "70px",
          }}
        >
          {/* Card */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "21px",
              backgroundColor: "#ffffff",
              borderRadius: "36px",
              padding: "42px",
              outline: "3px solid #ffffff",
              outlineOffset: "-3px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "21px",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "999px",
                    backgroundColor: "#f4f4f5",
                    border: "1px solid #e4e4e7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={avatarB64}
                    width={90}
                    height={90}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {/* Name + handle */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      color: "#000000",
                      fontSize: "28px",
                      fontWeight: 600,
                      lineHeight: "32px",
                    }}
                  >
                    Rashid Iqbal
                  </div>
                  <div
                    style={{
                      color: "#000000",
                      fontSize: "28px",
                      fontWeight: 400,
                      lineHeight: "32px",
                    }}
                  >
                    @rashidrealme
                  </div>
                </div>
              </div>

              {/* Three small dots */}
              <div style={{ display: "flex", gap: "6px" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    backgroundColor: "#525252",
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    backgroundColor: "#525252",
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    backgroundColor: "#525252",
                  }}
                />
              </div>
            </div>

            {/* Title + icons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "21px",
                flex: 1,
              }}
            >
              <div
                style={{
                  color: "#000000",
                  fontSize: title.length > 80 ? 52 : 60,
                  fontWeight: 400,
                  lineHeight: "1.1",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                {title}
              </div>

              {/* Icon row */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "3px solid #000",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  F
                </div>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "3px solid #000",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  Fr
                </div>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    border: "3px solid #000",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  ●
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control":
            "public, immutable, no-transform, max-age=604800",
        },
      },
    );
  } catch (e) {
    console.error(
      `Blog OG generation failed: ${e instanceof Error ? e.message : String(e)}`,
    );
    return new Response("Failed to generate image", { status: 500 });
  }
}
