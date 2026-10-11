import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  defaultLocale,
  isLocale,
  locales,
  localeOgLocales,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { categoryIds, categoryMeta, findCategoryBySlug } from '@/lib/categories'
import { categoryCopy } from '@/lib/i18n/category-copy'
import { CategoryStorefront } from '@/components/category-storefront'

/**
 * One listing page per category, in both languages: `/fr/categories/…` and
 * `/ar/categories/…`. `[lang]` is a root parameter, so the page provides params
 * for it as well as for `[slug]`.
 */
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    categoryIds.map((id) => ({ lang, slug: categoryMeta[id].slug })),
  )
}

/** Anything outside the generated slugs is a genuine 404, not an on-demand page. */
export const dynamicParams = false

type CategoryRouteParams = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({
  params,
}: CategoryRouteParams): Promise<Metadata> {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : defaultLocale
  const categoryId = findCategoryBySlug(slug)
  if (!categoryId) return {}

  const copy = categoryCopy(getDictionary(locale), categoryId)
  const path = `/categories/${categoryMeta[categoryId].slug}`

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        fr: `/fr${path}`,
        ar: `/ar${path}`,
        'x-default': `/fr${path}`,
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: localeOgLocales[locale],
      type: 'website',
      url: `/${locale}${path}`,
    },
  }
}

export default async function CategoryRoute({ params }: CategoryRouteParams) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()

  const categoryId = findCategoryBySlug(slug)
  if (!categoryId) notFound()

  return <CategoryStorefront locale={lang} categoryId={categoryId} />
}
