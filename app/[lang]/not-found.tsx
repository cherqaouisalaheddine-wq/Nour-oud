import Link from 'next/link'
import { lang } from 'next/root-params'
import { defaultLocale, isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

/**
 * Not-found boundary for the storefront.
 *
 * The boundary is the top-level `[lang]` segment, so the active language comes
 * from `next/root-params` rather than from a prop: `not-found.tsx` receives none.
 * It has to be a Server Component - `next/root-params` is not available on the
 * client, and a client boundary here would fall back to the default 404.
 *
 * An unknown first segment is not a valid language, so it falls back to French,
 * which keeps the message readable while still rendering `/ar/...` correctly.
 */
export default async function NotFound() {
  const segment = await lang()
  const locale = isLocale(segment) ? segment : defaultLocale
  const dict = getDictionary(locale)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--bone)] px-6 text-center">
      <p className="eyebrow">{dict.notFound.eyebrow}</p>
      <h1 className="section-title max-w-xl">{dict.notFound.title}</h1>
      <p className="max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
        {dict.notFound.text}
      </p>
      <Link href={`/${locale}`} className="btn-ink mt-2">
        {dict.notFound.cta}
      </Link>
    </main>
  )
}
