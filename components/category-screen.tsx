'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/lib/products'
import { audienceGenders, categoryMeta, type CategoryId } from '@/lib/categories'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QuickView } from '@/components/product-quickview'
import { CategoryHero } from '@/components/category-hero'
import { CategoryResults, type ResultsSection } from '@/components/category-results'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Composition root for a category listing page.
 *
 * Mirrors `PerfumeStorefront` (same header, cart drawer and quick view) but the
 * catalogue is scoped to one category. An audience page (Homme / Femme) is
 * split into its two catalogue lines, each with its own heading and grid; a
 * range page (Arabic & oud / Brand) is a single block with an audience
 * selector. The header search box filters the page, exactly as it does on the
 * homepage.
 */
export function CategoryScreen({ categoryId }: { categoryId: CategoryId }) {
  const { dict } = useI18n()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const meta = categoryMeta[categoryId]

  const sections = useMemo<ResultsSection[]>(() => {
    if (meta.kind === 'range') {
      // The brand line is entirely inquiry-only at the moment, so it gets a
      // heading that states as much. The maison line's own hero already covers
      // it, so that page needs no second title.
      return [
        {
          key: meta.range,
          eyebrow: meta.range === 'marques' ? dict.category.upcoming.eyebrow : undefined,
          title: meta.range === 'marques' ? dict.category.upcoming.title : undefined,
          scope: { range: meta.range },
        },
      ]
    }

    const gender = audienceGenders[meta.audience]
    return [
      {
        key: 'arabes-oud',
        title: dict.category.sections.arabesOud.title,
        note: dict.category.sections.arabesOud.note,
        scope: { range: 'arabes-oud', gender },
      },
      {
        key: 'marques',
        title: dict.category.sections.marques.title,
        note: dict.category.sections.marques.note,
        scope: { range: 'marques', gender },
        // The line is kept visible even with nothing in it, so the section
        // explains itself rather than silently disappearing.
        alwaysShow: true,
      },
    ]
  }, [meta, dict])

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

        <CategoryResults
          sections={sections}
          query={query}
          onView={setSelectedProduct}
          onReset={() => setQuery('')}
          showGender={meta.kind === 'range'}
        />
      </main>

      <SiteFooter />

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer />
    </div>
  )
}
