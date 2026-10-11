'use client'

import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import type { FamilyFilter, GenderFilter, PriceBand, Product, ScentFamily } from '@/lib/products'
import { countByFamily, filterProducts } from '@/lib/products'
import { CatalogFilters } from '@/components/catalog-filters'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

type CollectionGridProps = {
  gender: GenderFilter
  onGenderChange: (value: GenderFilter) => void
  family: FamilyFilter
  onFamilyChange: (value: FamilyFilter) => void
  query: string
  onView: (product: Product) => void
}

/** Family counters exclude the 'Toutes' pseudo-filter. */
const FAMILY_COUNTS: ScentFamily[] = ['Oud', 'Ambre', 'Musc', 'Floral']

/**
 * The homepage's full verified catalogue.
 *
 * Gender, olfactory family and price all route through `filterProducts`, so the
 * result count can never disagree with the grid. Brand and availability
 * selectors are deliberately absent here: the homepage shows only the maison's
 * own line, which carries no brand and is always in stock — those two filters
 * live on the category pages, where they have something to act on.
 */
export function CollectionGrid({
  gender,
  onGenderChange,
  family,
  onFamilyChange,
  query,
  onView,
}: CollectionGridProps) {
  const { dict } = useI18n()
  const [priceBand, setPriceBand] = useState<PriceBand>('all')

  // Shared entry point so the result count can never disagree with the grid.
  const results = useMemo(
    () => filterProducts({ gender, family, priceBand, query }),
    [gender, family, priceBand, query],
  )

  function resetFilters() {
    onGenderChange('Tous')
    onFamilyChange('Toutes')
    setPriceBand('all')
  }

  return (
    <section id="collection" className="bg-[var(--bone)] px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">{dict.collection.eyebrow}</p>
              <h2 className="section-title mt-4 max-w-lg">
                {dict.collection.titleLead}{' '}
                <em className="font-light italic">{dict.collection.titleEm}</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.collection.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100}>
          <div className="mt-10">
            <CatalogFilters
              gender={{ value: gender, onChange: onGenderChange }}
              family={{ value: family, onChange: onFamilyChange }}
              priceBand={{ value: priceBand, onChange: setPriceBand }}
            />
          </div>
        </Reveal>

        {/* Result count, announced politely for screen readers. */}
        <p
          className="mt-6 text-xs tracking-[0.14em] uppercase text-[var(--ink-muted)]"
          aria-live="polite"
        >
          {dict.collection.results(results.length, query || undefined)}
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-[var(--hairline-strong)] px-6 py-24 text-center">
            <SearchX
              className="size-9 text-[var(--hairline-strong)]"
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="mt-6 font-[family-name:var(--font-display)] text-2xl">
              {dict.collection.emptyTitle}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.collection.emptyText}
            </p>
            <button type="button" onClick={resetFilters} className="btn-outline mt-8">
              {dict.collection.reset}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {results.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 4) * 70}>
                <ProductCard product={product} onView={onView} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Family counts, used as a quiet editorial footnote. */}
        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-px border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-4">
            {FAMILY_COUNTS.map((option) => (
              <div key={option} className="bg-[var(--bone)] px-5 py-6">
                <dt className="text-[0.5625rem] tracking-[0.18em] uppercase text-[var(--ink-muted)]">
                  {dict.filters.family[option]}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-display)] text-3xl tabular-nums">
                  {countByFamily(option)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
