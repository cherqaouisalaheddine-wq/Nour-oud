'use client'

import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import type {
  FamilyFilter,
  GenderFilter,
  MainCategoryId,
  Product,
} from '@/lib/products'
import { familyFilters, filterProducts, genderFilters } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

type CategoryBrowserProps = {
  categoryId: MainCategoryId
  gender: GenderFilter
  onGenderChange: (value: GenderFilter) => void
  family: FamilyFilter
  onFamilyChange: (value: FamilyFilter) => void
  query: string
  /** Clears the filters *and* the search, which lives in the header. */
  onReset: () => void
  onView: (product: Product) => void
}

/**
 * The verified perfumes of one universe, with the same search + filter
 * behaviour as the homepage collection, scoped to the category.
 */
export function CategoryBrowser({
  categoryId,
  gender,
  onGenderChange,
  family,
  onFamilyChange,
  query,
  onReset,
  onView,
}: CategoryBrowserProps) {
  const { dict } = useI18n()

  // Shared entry point so the result count can never disagree with the grid.
  const results = useMemo(
    () => filterProducts({ mainCategory: categoryId, gender, family, query }),
    [categoryId, gender, family, query],
  )

  return (
    <section id="categorie" className="bg-[var(--bone)] px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Filters */}
        <div className="flex flex-col gap-4 border-y border-[var(--hairline)] py-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
            role="group"
            aria-label={dict.collection.genderAria}
          >
            {genderFilters.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onGenderChange(option)}
                aria-pressed={gender === option}
                className={`shrink-0 border px-5 py-2.5 text-[0.6875rem] font-medium tracking-[0.12em] uppercase transition-colors duration-400 ${
                  gender === option
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bone)]'
                    : 'border-[var(--hairline)] hover:border-[var(--ink)]'
                }`}
              >
                {dict.filters.gender[option]}
              </button>
            ))}
          </div>

          <div
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
            role="group"
            aria-label={dict.collection.familyAria}
          >
            {familyFilters.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onFamilyChange(option)}
                aria-pressed={family === option}
                className={`shrink-0 px-4 py-2 text-xs tracking-wide transition-colors duration-400 ${
                  family === option
                    ? 'text-[var(--ink)] underline decoration-[var(--champagne)] decoration-2 underline-offset-[6px]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {dict.filters.family[option]}
              </button>
            ))}
          </div>
        </div>

        {/* Result count, announced politely for screen readers. */}
        <p className="mt-6 text-xs tracking-[0.14em] uppercase text-[var(--ink-muted)]" aria-live="polite">
          {dict.collection.results(results.length, query || undefined)}
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-[var(--hairline-strong)] px-6 py-24 text-center">
            <SearchX className="size-9 text-[var(--hairline-strong)]" strokeWidth={1} aria-hidden="true" />
            <p className="mt-6 font-[family-name:var(--font-display)] text-2xl">
              {dict.collection.emptyTitle}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.collection.emptyText}
            </p>
            <button type="button" onClick={onReset} className="btn-outline mt-8">
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
      </div>
    </section>
  )
}
