import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Rashid Iqbal - Figma & Framer Expert';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#18181b',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Orange gradient accent - top right */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '56px 64px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Top row: logo + domain */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '22px',
                }}
              >
                R
              </div>
              <span style={{ fontSize: '22px', fontWeight: 600, color: '#e4e4e7' }}>
                Rashid Iqbal
              </span>
            </div>
            <span style={{ fontSize: '18px', color: '#71717a' }}>aestho.xyz</span>
          </div>

          {/* Middle: headline + sub */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 800,
                lineHeight: 1.05,
                color: 'white',
                margin: 0,
                maxWidth: '800px',
                letterSpacing: '-0.02em',
              }}
            >
              Websites that convert.
              <br />
              <span style={{ color: '#f97316' }}>Not just look pretty.</span>
            </h1>
            <p
              style={{
                fontSize: '26px',
                color: '#a1a1aa',
                margin: 0,
                lineHeight: 1.4,
                maxWidth: '700px',
              }}
            >
              Figma design, Framer development, and Chrome extensions. 50+ projects shipped.
            </p>
          </div>

          {/* Bottom: CTA + tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* CTA button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                backgroundColor: '#f97316',
                borderRadius: '8px',
                color: 'white',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              Book a Free Call
              <span style={{ fontSize: '20px' }}>&#8594;</span>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                style={{
                  padding: '8px 18px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  color: '#d4d4d8',
                  fontSize: '17px',
                  fontWeight: 500,
                }}
              >
                Figma
              </div>
              <div
                style={{
                  padding: '8px 18px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  color: '#d4d4d8',
                  fontSize: '17px',
                  fontWeight: 500,
                }}
              >
                Framer
              </div>
              <div
                style={{
                  padding: '8px 18px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  color: '#d4d4d8',
                  fontSize: '17px',
                  fontWeight: 500,
                }}
              >
                Chrome Extensions
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(to right, #f97316, #ea580c)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
