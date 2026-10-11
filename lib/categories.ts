import { localePath, type Locale } from '@/lib/i18n/config'
import { mainCategoryIds, type MainCategoryId } from '@/lib/products'

/**
 * Presentation for the two top-level universes.
 *
 * Display names, taglines and SEO copy are translated in the dictionaries; this
 * module only holds what is identical in both languages: the URL segment and the
 * decorative artwork. Segments are kept in Latin so a shared link stays valid no
 * matter which language the visitor is reading.
 */
export const mainCategoryMeta: Record<MainCategoryId, { slug: string; image: string }> = {
  orientaux: {
    slug: 'parfums-orientaux-oud',
    image: '/products/sheikh-zayed-oud.jpg',
  },
  marques: {
    slug: 'parfums-de-marque',
    // Brand-level artwork for the universe card: a generic flacon, deliberately
    // not attached to any named fragrance.
    image: '/oud-hero.png',
  },
}

/** Resolves a URL segment back to its universe, or `undefined` when unknown. */
export function findCategoryBySlug(slug: string): MainCategoryId | undefined {
  return mainCategoryIds.find((id) => mainCategoryMeta[id].slug === slug)
}

/** Absolute, locale-aware link to a universe listing page. */
export function categoryPath(locale: Locale, id: MainCategoryId): string {
  return `${localePath(locale)}/categories/${mainCategoryMeta[id].slug}`
}
