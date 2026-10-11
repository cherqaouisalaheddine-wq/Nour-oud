'use client'

import type { Locale } from '@/lib/i18n/config'
import type { CategoryId } from '@/lib/categories'
import { StorefrontProviders } from '@/components/storefront-providers'
import { CategoryScreen } from '@/components/category-screen'

/**
 * Client entry point for a category page, mounted by the route with the locale
 * and the category already validated on the server.
 */
export function CategoryStorefront({
  locale,
  categoryId,
}: {
  locale: Locale
  categoryId: CategoryId
}) {
  return (
    <StorefrontProviders locale={locale}>
      <CategoryScreen categoryId={categoryId} />
    </StorefrontProviders>
  )
}
