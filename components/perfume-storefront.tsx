'use client'

import { useEffect, useState } from 'react'
import type { FamilyFilter, GenderFilter, Product } from '@/lib/products'
import { CartProvider } from '@/components/cart/cart-provider'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { CollectionGrid } from '@/components/collection-grid'
import { BrandStory } from '@/components/brand-story'
import { CategoryGrid } from '@/components/category-grid'
import { BestSellers } from '@/components/best-sellers'
import { PromoBanner } from '@/components/promo-banner'
import { WhyOudia } from '@/components/why-oudia'
import { Testimonials } from '@/components/testimonials'
import { Newsletter } from '@/components/newsletter'
import { QuickView } from '@/components/product-quickview'

/**
 * Composition root.
 *
 * Previously this file held the entire storefront inline: product data, header,
 * hero, collection, dialog and footer in one component. It is now split into
 * the sections above. This component owns only the state that has to be shared
 * across sections - catalogue filters, search and the quick-view target.
 */
function Storefront() {
  const [gender, setGender] = useState<GenderFilter>('Tous')
  const [family, setFamily] = useState<FamilyFilter>('Toutes')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  /*
   * The nav and the category cards deep-link into the collection, e.g.
   * #collection?family=Oud. Pick those params up once on mount so the link
   * actually filters the grid instead of scrolling to an unfiltered list.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const requestedGender = params.get('genre')
    if (requestedGender === 'Homme' || requestedGender === 'Femme') {
      setGender(requestedGender)
    }

    const requestedFamily = params.get('family')
    if (
      requestedFamily === 'Oud' ||
      requestedFamily === 'Ambre' ||
      requestedFamily === 'Musc' ||
      requestedFamily === 'Floral'
    ) {
      setFamily(requestedFamily)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bone)]">
      <SiteHeader
        query={query}
        onQueryChange={setQuery}
        searchOpen={searchOpen}
        onSearchToggle={() => setSearchOpen((open) => !open)}
      />

      <main>
        <Hero />
        <CollectionGrid
          gender={gender}
          onGenderChange={setGender}
          family={family}
          onFamilyChange={setFamily}
          query={query}
          onView={setSelectedProduct}
        />
        <BrandStory />
        <CategoryGrid />
        <BestSellers onView={setSelectedProduct} />
        <PromoBanner />
        <WhyOudia />
        <Testimonials />
        <Newsletter />
      </main>

      <SiteFooter />

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer />
    </div>
  )
}

export function PerfumeStorefront() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  )
}