import type { Locale } from '@/lib/i18n/config'

/**
 * Price formatting.
 *
 * Moroccan dirhams are the only currency. Prices are rendered as a plain number
 * followed by `DH` rather than via `Intl`'s currency style, because the currency
 * slot placement differs per locale (`349 DH` vs `DH 349`). The Latin numbering
 * system is forced even in Arabic (`-u-nu-latn`) so prices stay as `349 DH`
 * instead of Arabic-Indic digits, which is what Moroccan retail actually prints.
 */
const numberFormatters: Record<Locale, Intl.NumberFormat> = {
  fr: new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }),
  ar: new Intl.NumberFormat('ar-MA-u-nu-latn', { maximumFractionDigits: 0 }),
}

/** Formats a number as a Moroccan dirham price, e.g. `349 DH`. */
export function formatPrice(amount: number, locale: Locale = 'fr') {
  return `${numberFormatters[locale].format(amount)} DH`
}
