'use client'

import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import type {
  Availability,
  FamilyFilter,
  GenderFilter,
  PriceBand,
  Product,
  Scope,
} from '@/lib/products'
import {
  filterProducts,
  filterUpcomingProducts,
  getBrands,
  getUpcomingProducts,
} from '@/lib/products'
import { ALL_BRANDS, CatalogFilters } from '@/components/catalog-filters'
import { ProductCard } from '@/components/product-card'
import { UpcomingProductCard } from '@/components/upcoming-product-card'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/** One block of a listing page: a slice of the catalogue plus its heading. */
export type ResultsSection = {
  key: string
  /** Small line above the heading, when the section carries one. */
  eyebrow?: string
  /** Rendered only when the page groups several sections under one title. */
  title?: string
  note?: string
  scope: Scope
  /**
   * Keeps the section on screen even when it has nothing to show, so an honest
   * empty state can stand in for a line that simply has no published reference
   * yet (the feminine brand line, for instance).
   */
  alwaysShow?: boolean
}

type CategoryResultsProps = {
  sections: ResultsSection[]
  /** Search term owned by the header. */
  query: string
  onView: (product: Product) => void
  /** Clears the header search in addition to the local filters. */
  onReset: () => void
  /** Audience pages fix the gender, so they leave the selector out. */
  showGender?: boolean
}

/**
 * The catalogue block of a category page.
 *
 * One component covers both shapes of page: a range page passes a single
 * section, an audience page passes the two catalogue lines so each keeps its
 * own heading and its own grid. Every filter funnels into `filterProducts` /
 * `filterUpcomingProducts`, so the result count can never disagree with what is
 * rendered.
 */
export function CategoryResults({
  sections,
  query,
  onView,
  onReset,
  showGender = false,
}: CategoryResultsProps) {
  const { dict } = useI18n()

  const [gender, setGender] = useState<GenderFilter>('Tous')
  const [family, setFamily] = useState<FamilyFilter>('Toutes')
  const [priceBand, setPriceBand] = useState<PriceBand>('all')
  const [brand, setBrand] = useState<string>(ALL_BRANDS)
  const [availability, setAvailability] = useState<Availability>('all')

  // The availability selector moves between the two halves of the catalogue:
  // verified, orderable bottles and inquiry-only references.
  const showVerified = availability !== 'onrequest'
  const showUpcoming = availability !== 'available'

  /** `undefined` on audience pages (fixed gender) and for the "Tous" chip. */
  const activeGender = showGender && gender !== 'Tous' ? gender : undefined

  const brands = useMemo(() => {
    const unique = new Set<string>()
    for (const section of sections) {
      const scope = activeGender ? { ...section.scope, gender: activeGender } : section.scope
      for (const name of getBrands(scope)) unique.add(name)
    }
    return [...unique].sort((a, b) => a.localeCompare(b))
  }, [sections, activeGender])

  const hasUpcoming = useMemo(
    () => sections.some((section) => getUpcomingProducts(section.scope).length > 0),
    [sections],
  )

  const results = useMemo(
    () =>
      sections.map((section) => {
        const scope = activeGender ? { ...section.scope, gender: activeGender } : section.scope
        return {
          ...section,
          products: showVerified
            ? filterProducts({
                ...scope,
                family,
                brand: brand || undefined,
                priceBand,
                query,
              })
            : [],
          upcoming: showUpcoming
            ? filterUpcomingProducts({ ...scope, brand: brand || undefined, query })
            : [],
        }
      }),
    [sections, activeGender, showVerified, showUpcoming, family, brand, priceBand, query],
  )

  const visible = results.filter(
    (section) => section.alwaysShow || section.products.length > 0 || section.upcoming.length > 0,
  )
  const total = visible.reduce(
    (sum, section) => sum + section.products.length + section.upcoming.length,
    0,
  )

  function resetFilters() {
    setGender('Tous')
    setFamily('Toutes')
    setPriceBand('all')
    setBrand(ALL_BRANDS)
    setAvailability('all')
    onReset()
  }

  return (
    <section id="categorie" className="bg-[var(--bone)] px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <CatalogFilters
          gender={showGender ? { value: gender, onChange: setGender } : undefined}
          family={showVerified ? { value: family, onChange: setFamily } : undefined}
          priceBand={showVerified ? { value: priceBand, onChange: setPriceBand } : undefined}
          brand={{ value: brand, onChange: setBrand, options: brands }}
          availability={hasUpcoming ? { value: availability, onChange: setAvailability } : undefined}
        />

        {/* Result count, announced politely for screen readers. */}
        <p
          className="mt-6 text-xs tracking-[0.14em] uppercase text-[var(--ink-muted)]"
          aria-live="polite"
        >
          {dict.collection.results(total, query || undefined)}
        </p>

        {total === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center border border-dashed border-[var(--hairline-strong)] px-6 py-24 text-center">
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
          <div className="flex flex-col gap-16 lg:gap-20">
            {visible.map((section, sectionIndex) => (
              <div key={section.key}>
                {(section.eyebrow || section.title) && (
                  <Reveal>
                    <div
                      className={`max-w-2xl border-t border-[var(--hairline)] pt-8 ${
                        sectionIndex === 0 ? 'mt-8' : ''
                      }`}
                    >
                      {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
                      {section.title && (
                        <h2
                          className={`${
                            section.eyebrow ? 'mt-4' : ''
                          } font-[family-name:var(--font-display)] text-2xl leading-tight lg:text-3xl`}
                        >
                          {section.title}
                        </h2>
                      )}
                      {section.note && (
                        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                          {section.note}
                        </p>
                      )}
                    </div>
                  </Reveal>
                )}

                {section.products.length === 0 && section.upcoming.length === 0 ? (
                  <p className="mt-8 max-w-xl text-sm italic leading-relaxed text-[var(--ink-muted)]">
                    {dict.category.sections.empty}
                  </p>
                ) : (
                  <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
                    {section.products.map((product, index) => (
                      <Reveal key={product.slug} delay={(index % 4) * 70}>
                        <ProductCard product={product} onView={onView} />
                      </Reveal>
                    ))}
                    {section.upcoming.map((entry, index) => (
                      <Reveal
                        key={entry.slug}
                        delay={((section.products.length + index) % 4) * 70}
                      >
                        <UpcomingProductCard entry={entry} />
                      </Reveal>
                    ))}
                  </div>
                )}

                {section.upcoming.length > 0 && (
                  <p className="mt-8 max-w-2xl border-t border-[var(--hairline)] pt-6 text-xs leading-relaxed text-[var(--ink-muted)]">
                    {dict.category.upcoming.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
