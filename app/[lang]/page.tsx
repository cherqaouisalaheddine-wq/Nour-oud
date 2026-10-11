import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { PerfumeStorefront } from '@/components/perfume-storefront'

/**
 * Single storefront page, rendered once per language under `/fr` and `/ar`.
 * The locale is passed down as a plain string so the client composition root
 * can build the matching dictionary.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return <PerfumeStorefront locale={lang} />
}
