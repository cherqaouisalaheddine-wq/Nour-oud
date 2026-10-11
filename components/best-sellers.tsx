'use client'

import type { Product } from '@/lib/products'
import { getProductsBySlugs } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Best sellers, driven by `bestsellerSlugs` in lib/products.ts so the ranking
 * lives with the catalogue rather than in the markup.
 */
export function BestSellers({ onView }: { onView: (product: Product) => void }) {
  const { dict } = useI18n()

  const bestsellers = getProductsBySlugs([
    'sheikh-zayed-oud',
    'ameerat-oud-amber',
    'malikat-al-arab',
    'oud-amber-noir',
    'qasas-hudson',
    'lailat-al-arab',
  ])

  return (
    <section id="bestsellers" className="bg-[var(--bone)] px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{dict.bestsellers.eyebrow}</p>
              <h2 className="section-title mt-4">{dict.bestsellers.title}</h2>
            </div>
            <a href="#collection" className="btn-outline shrink-0">
              {dict.bestsellers.cta}
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {bestsellers.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 3) * 80}>
              <ProductCard product={product} onView={onView} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
