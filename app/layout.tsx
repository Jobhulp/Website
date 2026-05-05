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

export const metadata: Metadata = {
  title: 'Jobhulp - Slimme matching tussen mensen en jobs',
  description: 'Jobhulp koppelt mensen en jobs aan elkaar voor er gesolliciteerd wordt. Geen massa sollicitaties, alleen sterke matches. Je spreekt alleen met mensen die echt passen.',
  keywords: 'jobs, vacatures, matching, werkzoekenden, werkgevers, carriere, recruitment, België',
  authors: [{ name: 'Jobhulp' }],
  openGraph: {
    title: 'Jobhulp - Slimme matching tussen mensen en jobs',
    description: 'Jobhulp koppelt mensen en jobs aan elkaar voor er gesolliciteerd wordt. Alleen sterke matches komen in contact.',
    type: 'website',
    locale: 'nl_BE',
    siteName: 'Jobhulp',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
