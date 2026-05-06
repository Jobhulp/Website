import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { AuthProvider } from '@/lib/auth-context'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobhulp.be'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jobhulp - Slimme matching tussen kandidaten en werkgevers | België',
    template: '%s | Jobhulp',
  },
  description: 'Jobhulp matcht kandidaten en werkgevers op basis van vaardigheden, persoonlijkheid en voorkeuren. Geen massa sollicitaties, alleen sterke matches. Gratis voor kandidaten.',
  keywords: [
    'jobs België',
    'vacatures België',
    'werk zoeken',
    'personeel zoeken',
    'job matching',
    'recruitment platform',
    'carrière',
    'werkgevers',
    'kandidaten',
    'skills matching',
    'persoonlijkheidstest',
    'solliciteren',
    'HR platform',
    'talent matching',
  ],
  authors: [{ name: 'Jobhulp', url: siteUrl }],
  creator: 'Jobhulp',
  publisher: 'Jobhulp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'nl-BE': '/',
      'nl-NL': '/',
    },
  },
  openGraph: {
    title: 'Jobhulp - Slimme matching tussen kandidaten en werkgevers',
    description: 'Match op vaardigheden, persoonlijkheid en voorkeuren. Geen massa sollicitaties, alleen sterke matches die echt passen.',
    type: 'website',
    locale: 'nl_BE',
    siteName: 'Jobhulp',
    url: siteUrl,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jobhulp - Slimme job matching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobhulp - Slimme matching tussen kandidaten en werkgevers',
    description: 'Match op vaardigheden, persoonlijkheid en voorkeuren. Alleen sterke matches.',
    images: ['/images/og-image.jpg'],
    creator: '@jobhulp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'recruitment',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={ibmPlexSans.className}>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  )
}
