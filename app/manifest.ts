import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jobhulp - Slimme job matching',
    short_name: 'Jobhulp',
    description: 'Match op vaardigheden, persoonlijkheid en voorkeuren. Vind jobs die echt bij je passen.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a2e',
    theme_color: '#00d9a5',
    orientation: 'portrait',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
