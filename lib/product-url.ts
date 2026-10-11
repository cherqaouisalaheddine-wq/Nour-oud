import { localePath, type Locale } from '@/lib/i18n/config'

/**
 * Absolute, locale-aware link to a product fiche.
 *
 * The segment is Latin and identical in both languages (like `categories`), so a
 * shared link keeps working after a language switch; only the `/fr` | `/ar`
 * prefix changes.
 */
export function productPath(locale: Locale, slug: string): string {
  return `${localePath(locale)}/produits/${slug}`
}
