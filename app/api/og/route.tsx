import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const title = searchParams.has('title')
            ? searchParams.get('title')?.slice(0, 100)
            : 'Figma & Framer Expert';

        const description = searchParams.has('description')
            ? searchParams.get('description')?.slice(0, 150)
            : 'High-converting landing pages, websites, and Chrome extensions. 50+ projects shipped.';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '60px 80px',
                        backgroundColor: '#18181b', // zinc-900
                        color: 'white',
                    }}
                >
                    {/* Subtle grid pattern background */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                            backgroundSize: '32px 32px',
                            zIndex: 0,
                        }}
                    />

                    {/* Header/Logo area */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            zIndex: 1,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    backgroundColor: '#f97316', // orange-500
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                }}
                            >
                                R
                            </div>
                            <span style={{ fontSize: '24px', fontWeight: 600, color: '#e4e4e7' }}>
                                Rashid Iqbal
                            </span>
                        </div>
                        <span style={{ fontSize: '20px', color: '#a1a1aa' }}>
                            aestho.xyz
                        </span>
                    </div>

                    {/* Main Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            zIndex: 1,
                            marginTop: '40px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: title && title.length > 50 ? '54px' : '72px',
                                fontWeight: 700,
                                lineHeight: 1.1,
                                color: 'white',
                                margin: 0,
                                maxWidth: '900px',
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                fontSize: '32px',
                                color: '#a1a1aa',
                                margin: 0,
                                lineHeight: 1.4,
                                maxWidth: '800px',
                            }}
                        >
                            {description}
                        </p>
                    </div>

                    {/* Footer tags */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            zIndex: 1,
                        }}
                    >
                        <div
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                                border: '1px solid rgba(249, 115, 22, 0.2)',
                                borderRadius: '100px',
                                color: '#f97316',
                                fontSize: '20px',
                            }}
                        >
                            Figma
                        </div>
                        <div
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '100px',
                                color: 'white',
                                fontSize: '20px',
                            }}
                        >
                            Framer
                        </div>
                        <div
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '100px',
                                color: 'white',
                                fontSize: '20px',
                            }}
                        >
                            Chrome Extensions
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error(`OG generation failed: ${e.message}`);
        return new Response('Failed to generate image', { status: 500 });
    }
}
