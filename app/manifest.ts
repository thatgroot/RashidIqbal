import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rashid Iqbal - Freelance Web Developer & Designer',
    short_name: 'Rashid Iqbal',
    description: 'Freelance web developer and designer specializing in landing pages, web applications, and mobile apps.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#18181b',
    lang: 'en-US',
    dir: 'ltr',
    categories: ['business', 'developer tools', 'productivity'],
    prefer_related_applications: false,
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/favicon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
    shortcuts: [
      {
        name: 'View Portfolio',
        short_name: 'Portfolio',
        description: 'View my work and projects',
        url: '/#work',
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read articles on web development',
        url: '/blog',
      },
      {
        name: 'Pricing',
        short_name: 'Pricing',
        description: 'View service packages and pricing',
        url: '/#pricing',
      },
    ],
  };
}

