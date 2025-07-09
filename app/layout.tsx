import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import '../styles/globals.css'
import Layout from '../components/layout/Layout'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jobhulp - Find Your Next Career',
  description: 'Job board website for finding your next career opportunity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={ibmPlexSans.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}