import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  
  return {
    name: 'Rashid.dev - Freelance Web Developer & Designer',
    short_name: 'Rashid.dev',
    description: 'Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#18181b',
    lang: 'en-US',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

