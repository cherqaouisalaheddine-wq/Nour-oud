'use client'

import type { Locale } from '@/lib/i18n/config'
import { LocaleProvider } from '@/components/i18n/locale-provider'
import { CartProvider } from '@/components/cart/cart-provider'

/**
 * Shared client providers.
 *
 * Both the homepage and the category pages render a header, footer and the cart
 * drawer, so they need the exact same locale + cart context. Extracting them
 * here keeps the two composition roots from drifting apart.
 */
export function StorefrontProviders({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <LocaleProvider locale={locale}>
      <CartProvider>{children}</CartProvider>
    </LocaleProvider>
  )
}
