const madFormatter = new Intl.NumberFormat('fr-MA', {
  style: 'currency',
  currency: 'MAD',
  maximumFractionDigits: 0,
})

/**
 * Formats a number as a Moroccan dirham price, e.g. `349 DH`.
 * `Intl` renders the currency as `MAD`, so it is swapped for the
 * `DH` notation used across the storefront.
 */
export function formatPrice(amount: number) {
  return madFormatter.format(amount).replace('MAD', 'DH')
}