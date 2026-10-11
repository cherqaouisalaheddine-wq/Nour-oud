'use client'

import type { Locale } from '@/lib/i18n/config'
import { StorefrontProviders } from '@/components/storefront-providers'
import { ProductScreen } from '@/components/product-screen'

/**
 * Client entry point for a product fiche, mounted by the route with the locale
 * already validated and the slug resolved to an existing bottle or reference.
 */
export function ProductStorefront({
  locale,
  slug,
}: {
  locale: Locale
  slug: string
}) {
  return (
    <StorefrontProviders locale={locale}>
      <ProductScreen slug={slug} />
    </StorefrontProviders>
  )
}
