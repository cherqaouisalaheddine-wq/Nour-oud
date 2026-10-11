import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  defaultLocale,
  isLocale,
  locales,
  localeOgLocales,
  type Locale,
} from '@/lib/i18n/config'
import {
  catalogueSlugs,
  getProductBySlug,
  getUpcomingBySlug,
} from '@/lib/products'
import { ProductStorefront } from '@/components/product-storefront'

/**
 * One fiche per catalogue entry, in both languages: `/fr/produits/…` and
 * `/ar/produits/…`. Verified bottles and inquiry-only references share the
 * route, so every card in the catalogue has somewhere to go.
 */
export function generateStaticParams() {
  return locales.flatMap((lang) => catalogueSlugs.map((slug) => ({ lang, slug })))
}

/** Anything outside the generated slugs is a genuine 404, not an on-demand page. */
export const dynamicParams = false

type ProductRouteParams = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({
  params,
}: ProductRouteParams): Promise<Metadata> {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : defaultLocale

  const product = getProductBySlug(slug)
  const reference = product ? undefined : getUpcomingBySlug(slug)
  if (!product && !reference) return {}

  const name =
    locale === 'ar'
      ? (product?.nameAr ?? reference!.nameAr)
      : (product?.name ?? reference!.name)
  const description =
    locale === 'ar'
      ? (product?.descriptionAr ?? reference!.descriptionAr)
      : (product?.description ?? reference!.description)

  const path = `/produits/${slug}`
  const title = `${name} | NOUR EL OUD`

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        fr: `/fr${path}`,
        ar: `/ar${path}`,
        'x-default': `/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      locale: localeOgLocales[locale],
      type: 'website',
      url: `/${locale}${path}`,
      // Only a verified bottle has a photograph; nothing is invented for a
      // reference we have no shot of.
      images: product ? [{ url: product.image, alt: name }] : undefined,
    },
  }
}

export default async function ProductRoute({ params }: ProductRouteParams) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()

  if (!getProductBySlug(slug) && !getUpcomingBySlug(slug)) notFound()

  return <ProductStorefront locale={lang} slug={slug} />
}
