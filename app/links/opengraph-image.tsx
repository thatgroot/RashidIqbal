import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Rashid Iqbal - Links & Connect';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

const links = [
    "Framer Expert Profile",
    "Portfolio & Services",
    "Read My Latest Articles",
    "Hire Me on Upwork",
    "Follow on LinkedIn",
    "Follow on X/Twitter",
    "View Designs on Behance",
];

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#fafafa', // zinc-50
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Grid Background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage:
                            'linear-gradient(to right, #f4f4f5 2px, transparent 2px), linear-gradient(to bottom, #f4f4f5 2px, transparent 2px)',
                        backgroundSize: '40px 40px',
                        zIndex: 0,
                    }}
                />

                {/* Orange gradient orb - top right */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 60%)',
                        borderRadius: '50%',
                        zIndex: 0,
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '500px',
                        zIndex: 10,
                    }}
                >
                    {/* Profile Section */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '32px',
                        }}
                    >
                        <div
                            style={{
                                width: '96px',
                                height: '96px',
                                background: 'white',
                                borderRadius: '50%',
                                border: '1px solid #f4f4f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    background: '#18181b', // matching the logo color roughly
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '36px',
                                    fontWeight: 800,
                                    color: 'white',
                                }}
                            >
                                R
                            </div>
                        </div>

                        <h1
                            style={{
                                fontSize: '36px',
                                fontWeight: 700,
                                color: '#18181b',
                                margin: '0 0 8px 0',
                                letterSpacing: '-1px',
                            }}
                        >
                            Rashid Iqbal
                        </h1>
                        <p
                            style={{
                                fontSize: '20px',
                                fontWeight: 500,
                                color: '#52525b',
                                margin: '0 0 8px 0',
                            }}
                        >
                            Next.js & Framer Developer
                        </p>
                        <p
                            style={{
                                fontSize: '16px',
                                color: '#71717a',
                                margin: 0,
                                textAlign: 'center',
                                maxWidth: '300px',
                                lineHeight: 1.5,
                            }}
                        >
                            Building high-converting landing pages and scalable web apps.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: '12px',
                        }}
                    >
                        {links.map((link, i) => (
                            <div
                                key={link}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px 20px',
                                    background: i === 0 ? '#18181b' : 'white',
                                    color: i === 0 ? 'white' : '#18181b',
                                    borderRadius: '16px',
                                    border: i === 0 ? 'none' : '1px solid #e4e4e7',
                                    boxShadow: i === 0 ? '0 20px 25px -5px rgba(24, 24, 27, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                }}
                            >
                                <span>{link}</span>
                                <span style={{ color: i === 0 ? 'white' : '#a1a1aa' }}>→</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
