import type { Locale } from '@/lib/i18n/config'

/**
 * The shapes the copy helpers need. They are structural on purpose: both the
 * full `Product` type and the price-less `UpcomingProduct` type satisfy them,
 * so the two can share the same name/description helpers.
 */
export type NameCopy = { name: string; nameAr: string }
export type NotesCopy = { notes: string; notesAr: string }
export type DescriptionCopy = { description: string; descriptionAr: string }

/**
 * Primary product title.
 *
 * Latin product names are brand assets and are never translated, but in the
 * Arabic storefront the Arabic name leads and the Latin name becomes the
 * secondary line, which reads far better for an Arabic-speaking shopper.
 */
export function productName(product: NameCopy, locale: Locale) {
  return locale === 'ar' ? product.nameAr : product.name
}

/** The name shown beneath the primary title (the "other" language). */
export function productAltName(product: NameCopy, locale: Locale) {
  return locale === 'ar' ? product.name : product.nameAr
}

export function productNotes(product: NotesCopy, locale: Locale) {
  return locale === 'ar' ? product.notesAr : product.notes
}

export function productDescription(product: DescriptionCopy, locale: Locale) {
  return locale === 'ar' ? product.descriptionAr : product.description
}
