'use client'

import { useEffect, useState } from 'react'
import type { FamilyFilter, GenderFilter, Product } from '@/lib/products'
import type { Locale } from '@/lib/i18n/config'
import { StorefrontProviders } from '@/components/storefront-providers'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { AudienceCategories } from '@/components/audience-categories'
import { RangeCategories } from '@/components/range-categories'
import { CollectionGrid } from '@/components/collection-grid'
import { BrandStory } from '@/components/brand-story'
import { BestSellers } from '@/components/best-sellers'
import { PromoBanner } from '@/components/promo-banner'
import { WhyNourElOud } from '@/components/why-nour-el-oud'
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
   * #collection?family=Oud. Those params live in the fragment, not the query
   * string, so both are read (the fragment wins when present). The listener
   * keeps the links working after load and after a language switch, which
   * navigates to /ar#collection?... while preserving the hash.
   */
  useEffect(() => {
    function applyDeepLinkFilters() {
      const fragment = window.location.hash.slice(1)
      const [target, hashQuery] = fragment.split('?')
      const params = new URLSearchParams(hashQuery ?? window.location.search)

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

      /*
       * A fragment like `#collection?genre=Homme` does not match any element id,
       * so the browser refuses to scroll to it. When it arrives from another
       * page (a category page, a footer link) the visitor would otherwise land
       * at the top. Scroll manually only in that case, so a plain `#accueil`
       * still uses the browser's native anchor behaviour.
       */
      if (hashQuery && target) {
        document.getElementById(target)?.scrollIntoView()
      }
    }

    applyDeepLinkFilters()
    window.addEventListener('hashchange', applyDeepLinkFilters)
    return () => window.removeEventListener('hashchange', applyDeepLinkFilters)
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
        <AudienceCategories />
        <CollectionGrid
          gender={gender}
          onGenderChange={setGender}
          family={family}
          onFamilyChange={setFamily}
          query={query}
          onView={setSelectedProduct}
        />
        <RangeCategories />
        <BrandStory />
        <BestSellers onView={setSelectedProduct} />
        <PromoBanner />
        <WhyNourElOud />
        <Testimonials />
        <Newsletter />
      </main>

      <SiteFooter />

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer />
    </div>
  )
}

export function PerfumeStorefront({ locale }: { locale: Locale }) {
  return (
    <StorefrontProviders locale={locale}>
      <Storefront />
    </StorefrontProviders>
  )
}