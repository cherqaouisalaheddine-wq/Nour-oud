'use client'

import { useMemo, useState } from 'react'
import type { FamilyFilter, GenderFilter, MainCategoryId, Product } from '@/lib/products'
import {
  filterUpcomingProducts,
  getProductsByMainCategory,
  getUpcomingProducts,
} from '@/lib/products'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QuickView } from '@/components/product-quickview'
import { CategoryHero } from '@/components/category-hero'
import { CategoryBrowser } from '@/components/category-browser'
import { CategoryUpcoming } from '@/components/category-upcoming'

/**
 * Composition root for a category listing page.
 *
 * Mirrors `PerfumeStorefront` (same header, cart drawer and quick view) but the
 * catalogue is scoped to one universe. The header search box filters the page,
 * exactly as it does on the homepage.
 */
export function CategoryScreen({ categoryId }: { categoryId: MainCategoryId }) {
  const [gender, setGender] = useState<GenderFilter>('Tous')
  const [family, setFamily] = useState<FamilyFilter>('Toutes')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const hasAvailable = getProductsByMainCategory(categoryId).length > 0
  const upcomingTotal = getUpcomingProducts(categoryId).length
  const upcoming = useMemo(
    () => filterUpcomingProducts(categoryId, query),
    [categoryId, query],
  )

  function resetFilters() {
    setGender('Tous')
    setFamily('Toutes')
    setQuery('')
  }

  return (
    <div className="min-h-screen bg-[var(--bone)]">
      <SiteHeader
        query={query}
        onQueryChange={setQuery}
        searchOpen={searchOpen}
        onSearchToggle={() => setSearchOpen((open) => !open)}
      />

      <main>
        <CategoryHero categoryId={categoryId} />

        {hasAvailable && (
          <CategoryBrowser
            categoryId={categoryId}
            gender={gender}
            onGenderChange={setGender}
            family={family}
            onFamilyChange={setFamily}
            query={query}
            onReset={resetFilters}
            onView={setSelectedProduct}
          />
        )}

        <CategoryUpcoming entries={upcoming} total={upcomingTotal} />
      </main>

      <SiteFooter />

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer />
    </div>
  )
}
