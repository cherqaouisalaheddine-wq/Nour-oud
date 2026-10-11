'use client'

import type { UpcomingProduct } from '@/lib/products'
import { UpcomingProductCard } from '@/components/upcoming-product-card'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

type CategoryUpcomingProps = {
  /** Entries matching the active search. */
  entries: UpcomingProduct[]
  /** Total in the category, before the search, used to decide whether to render. */
  total: number
}

/**
 * The unverified fragrances of a universe.
 *
 * No price and no stock are shown — only an availability notice and a WhatsApp
 * inquiry path — until the supplier confirms the reference. Renders nothing
 * when the universe has none.
 */
export function CategoryUpcoming({ entries, total }: CategoryUpcomingProps) {
  const { dict } = useI18n()

  if (total === 0) return null

  return (
    <section id="a-venir" className="bg-[var(--bone)] px-5 pt-4 pb-20 lg:px-8 lg:pt-6 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl border-t border-[var(--hairline)] pt-10">
            <p className="eyebrow">{dict.category.upcoming.eyebrow}</p>
            <h2 className="section-title mt-4">{dict.category.upcoming.title}</h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.category.upcoming.note}
            </p>
          </div>
        </Reveal>

        {entries.length === 0 ? (
          <p className="mt-10 max-w-sm text-sm italic leading-relaxed text-[var(--ink-muted)]">
            {dict.collection.emptyTitle}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {entries.map((entry, index) => (
              <Reveal key={entry.slug} delay={(index % 4) * 70}>
                <UpcomingProductCard entry={entry} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
