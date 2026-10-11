import type { Locale } from '@/lib/i18n/config'
import type { Product } from '@/lib/products'

/** The subset of a product that carries translated copy. */
type ProductCopy = Pick<
  Product,
  'name' | 'nameAr' | 'notes' | 'notesAr' | 'description' | 'descriptionAr'
>

/**
 * Primary product title.
 *
 * Latin product names are brand assets and are never translated, but in the
 * Arabic storefront the Arabic name leads and the Latin name becomes the
 * secondary line, which reads far better for an Arabic-speaking shopper.
 */
export function productName(product: ProductCopy, locale: Locale) {
  return locale === 'ar' ? product.nameAr : product.name
}

/** The name shown beneath the primary title (the "other" language). */
export function productAltName(product: ProductCopy, locale: Locale) {
  return locale === 'ar' ? product.name : product.nameAr
}

export function productNotes(product: ProductCopy, locale: Locale) {
  return locale === 'ar' ? product.notesAr : product.notes
}

export function productDescription(product: ProductCopy, locale: Locale) {
  return locale === 'ar' ? product.descriptionAr : product.description
}
