import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Amiri, Cairo, Cormorant_Garamond, Inter } from 'next/font/google'
import {
  defaultLocale,
  isLocale,
  locales,
  localeDirections,
  localeOgLocales,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import '../globals.css'

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

/**
 * Arabic faces. Cairo for running text (very legible at small sizes) and Amiri
 * — a Naskh serif — for headings, which reads as calligraphic rather than
 * utilitarian. Latin glyphs are intentionally not requested: brand names fall
 * back to Cormorant/Inter, so "NOUR EL OUD" looks identical in both languages.
 */
const arabicSans = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic-sans',
  display: 'swap',
})

const arabicDisplay = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic-display',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nour-oud.vercel.app'

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0d0b0a',
}

/** One statically generated route per language. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type LocaleParams = { params: Promise<{ lang: string }> }

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    generator: 'v0.app',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        ar: '/ar',
        'x-default': '/fr',
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeOgLocales[locale],
      type: 'website',
      url: `/${locale}`,
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
}

/**
 * Root layout.
 *
 * It lives inside the `[lang]` segment because `<html lang>`/`dir` depend on the
 * route. Next.js allows a root layout under a dynamic segment, which is what
 * makes the per-language `dir="rtl"` possible without a client-side flash.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  // Unknown languages render `notFound()` from the page; the shell still needs a
  // valid `lang`/`dir`, so it falls back to French until that happens.
  const locale: Locale = isLocale(lang) ? lang : defaultLocale

  return (
    <html
      lang={locale}
      dir={localeDirections[locale]}
      className={`${display.variable} ${sans.variable} ${arabicSans.variable} ${arabicDisplay.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
