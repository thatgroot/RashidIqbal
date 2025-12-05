import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Rashid Iqbal - Your Vision, Built Right';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Tech stack with inline SVG icons
const techStack = [
  {
    name: 'Next.js',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" fill="#18181B"/>
      </svg>
    ),
  },
  {
    name: 'React Native',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534 23.892 23.892 0 0 0-2.033-2.455c1.522-1.418 2.957-2.287 3.875-2.287zm-6.77 0c.915 0 2.354.87 3.876 2.29a23.892 23.892 0 0 0-2.028 2.457 23.34 23.34 0 0 0-3.11.533 14.38 14.38 0 0 1-.255-1.44c-.225-1.87.064-3.322.73-3.704.152-.083.334-.127.562-.127zm3.38 4.35c.418.642.79 1.316 1.11 2.01a22.195 22.195 0 0 0-2.236-.238 22.008 22.008 0 0 0 1.125-1.772zm-3.76 0c.352.537.727 1.1 1.123 1.773-.739.025-1.478.1-2.236.238.32-.696.693-1.37 1.113-2.011zm6.216 1.606c.51 1.168.905 2.35 1.17 3.514a14.57 14.57 0 0 1-1.443.254 22.195 22.195 0 0 0-1.09-2.02 22.008 22.008 0 0 0 1.363-1.748zm-8.67 0c.424.61.875 1.194 1.36 1.75-.374.636-.723 1.3-1.043 1.98a14.57 14.57 0 0 1-1.432-.244c.252-1.145.64-2.31 1.116-3.487zm10.45 2.41c.543.102 1.05.22 1.523.355.44 1.605.392 2.97-.13 3.268-.152.082-.334.127-.562.127-.913 0-2.35-.87-3.872-2.288a23.892 23.892 0 0 0 2.027-2.456zm-12.23.003a23.476 23.476 0 0 0 2.024 2.456c-1.52 1.418-2.954 2.287-3.87 2.287-.226 0-.407-.044-.558-.127-.52-.302-.568-1.662-.13-3.27.469-.135.978-.254 1.523-.356zm5.622 2.61c.76-.025 1.5-.098 2.238-.238.32.69.69 1.37 1.04 1.98a14.57 14.57 0 0 1-1.43.243 22.195 22.195 0 0 0-1.848-1.984zm.722-.003c.4.45.818.87 1.247 1.263a22.195 22.195 0 0 0 1.25-1.267 22.008 22.008 0 0 0-2.497.004z" fill="#61DAFB"/>
      </svg>
    ),
  },
  {
    name: 'Framer',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#18181B"/>
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg width="18" height="24" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    ),
  },
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAFA',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid Background - Matching site */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Orange gradient orb - top right */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            padding: '60px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Left Column - Text */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              paddingRight: '40px',
            }}
          >
            {/* Logo Mark */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: '#F97316',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%' }} />
              </div>
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#18181B' }}>Rashid Iqbal</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 800,
                color: '#18181B',
                margin: '0 0 20px 0',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Your Vision,
              <br />
              <span style={{ color: '#F97316' }}>Built Right.</span>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: '24px',
                color: '#52525B',
                margin: '0 0 40px 0',
                lineHeight: 1.5,
                maxWidth: '500px',
              }}
            >
              High-converting landing pages, scalable web apps, and native mobile applications.
            </p>

            {/* Tech Stack with Icons and Dotted Border */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    background: 'white',
                    backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                    backgroundPosition: '5px 5px',
                    border: '2px dashed #d4d4d8',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#18181B',
                  }}
                >
                  {tech.icon}
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '400px',
            }}
          >
            {/* Browser Window Mock */}
            <div
              style={{
                width: '350px',
                height: '420px',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #E4E4E7',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
              }}
            >
              {/* Browser Header */}
              <div
                style={{
                  height: '44px',
                  borderBottom: '1px solid #E4E4E7',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: '8px',
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E4E4E7' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E4E4E7' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E4E4E7' }} />
              </div>
              {/* Content */}
              <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Code lines */}
                <div style={{ height: '16px', width: '60%', background: '#F4F4F5', borderRadius: '4px' }} />
                <div style={{ height: '16px', width: '80%', background: '#F4F4F5', borderRadius: '4px' }} />
                <div style={{ height: '16px', width: '45%', background: '#F97316', borderRadius: '4px' }} />
                <div style={{ height: '16px', width: '70%', background: '#F4F4F5', borderRadius: '4px' }} />
                <div style={{ height: '16px', width: '55%', background: '#F4F4F5', borderRadius: '4px' }} />
                <div style={{ height: '24px' }} />
                {/* Component blocks */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1, height: '80px', background: '#F4F4F5', borderRadius: '8px' }} />
                  <div style={{ flex: 1, height: '80px', background: '#F4F4F5', borderRadius: '8px' }} />
                </div>
                {/* Button */}
                <div style={{ height: '44px', width: '120px', background: '#18181B', borderRadius: '8px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #F97316, #EA580C)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
