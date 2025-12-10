import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rashid Iqbal - Freelance Web Developer & Designer',
    short_name: 'Rashid Iqbal',
    description: 'Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#18181b',
    lang: 'en-US',
    categories: ['business', 'developer tools', 'productivity'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}

