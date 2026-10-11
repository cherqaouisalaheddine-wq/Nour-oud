import { localePath, type Locale } from '@/lib/i18n/config'
import {
  getProducts,
  type Gender,
  type RangeId,
  type Scope,
} from '@/lib/products'

/**
 * Catalogue organisation.
 *
 * The shop is split two ways, and the two axes cross each other:
 *
 * - **Audience** — `homme` / `femme`, the primary entry points on the homepage.
 * - **Range**   — `arabes-oud` / `marques`, the two catalogue lines.
 *
 * A product carries both a `gender` and a `range`, so `/categories/homme`
 * lists every masculine fragrance and `/categories/parfums-arabes-oud` lists
 * every Arabic & oud fragrance. Display names live in the dictionaries; this
 * module only holds the URL segment and the decorative artwork, both of which
 * are identical in French and Arabic (segments stay Latin so a shared link
 * never breaks when the reader switches language).
 */

export const audienceIds = ['homme', 'femme'] as const
export type AudienceId = (typeof audienceIds)[number]

export const categoryIds = [
  'homme',
  'femme',
  'parfums-arabes-oud',
  'parfums-de-marque',
] as const
export type CategoryId = (typeof categoryIds)[number]

type CategoryMeta =
  | { kind: 'audience'; slug: string; audience: AudienceId; image: string }
  | { kind: 'range'; slug: string; range: RangeId; image: string }

export const categoryMeta: Record<CategoryId, CategoryMeta> = {
  homme: {
    kind: 'audience',
    slug: 'homme',
    audience: 'homme',
    image: '/products/sheikh-zayed-oud.jpg',
  },
  femme: {
    kind: 'audience',
    slug: 'femme',
    audience: 'femme',
    image: '/products/lailat-al-arab.jpg',
  },
  'parfums-arabes-oud': {
    kind: 'range',
    slug: 'parfums-arabes-oud',
    range: 'arabes-oud',
    image: '/products/manasik-oud-amber-noir.jpg',
  },
  'parfums-de-marque': {
    kind: 'range',
    slug: 'parfums-de-marque',
    range: 'marques',
    // Brand-level artwork: a generic flacon, deliberately not attached to any
    // named fragrance.
    image: '/oud-hero.png',
  },
}

export const audienceGenders: Record<AudienceId, Gender> = {
  homme: 'Homme',
  femme: 'Femme',
}

/** Resolves a URL segment back to its category, or `undefined` when unknown. */
export function findCategoryBySlug(slug: string): CategoryId | undefined {
  return categoryIds.find((id) => categoryMeta[id].slug === slug)
}

/** Absolute, locale-aware link to a category listing page. */
export function categoryPath(locale: Locale, id: CategoryId): string {
  return `${localePath(locale)}/categories/${categoryMeta[id].slug}`
}

/** The catalogue slice a category restricts to. */
export function categoryScope(id: CategoryId): Scope {
  const meta = categoryMeta[id]
  return meta.kind === 'range'
    ? { range: meta.range }
    : { gender: audienceGenders[meta.audience] }
}

/** Verified, purchasable products of a category, in catalogue order. */
export function productsForCategory(id: CategoryId) {
  return getProducts(categoryScope(id))
}
