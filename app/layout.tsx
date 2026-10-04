import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

/**
 * Display face for headings. A high-contrast Garamond reads as perfume-house
 * editorial rather than tech-brand geometric.
 */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
})

/** Body face. Neutral grotesque so it stays out of the way of the serif. */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NOUR EL OUD | Parfums d’exception',
  description:
    'NOUR EL OUD façonne des parfums orientaux d’exception. Oud, ambre et musc sélectionnés au Maroc. Livraison partout au Maroc, paiement à la livraison.',
  generator: 'v0.app',
  openGraph: {
    title: 'NOUR EL OUD | Parfums d’exception',
    description:
      'Oud, ambre et musc sélectionnés au Maroc. Livraison partout au Maroc, paiement à la livraison.',
    locale: 'fr_MA',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0d0b0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}