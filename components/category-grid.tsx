'use client'

import { ArrowUpRight } from 'lucide-react'
import { categoryMeta } from '@/lib/site'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Large visual category cards.
 *
 * Unisex and Coffrets have no products in the catalogue yet, so they render as
 * an explicit "coming soon" state rather than pointing at an empty grid. No
 * placeholder products are invented.
 */
export function CategoryGrid() {
  const { dict } = useI18n()

  return (
    <section id="categories" className="bg-[var(--bone-deep)] px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{dict.categories.eyebrow}</p>
              <h2 className="section-title mt-4">{dict.categories.title}</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.categories.subtitle}
            </p>
          </div>
        </Reveal>

        {/* First two cards are larger to create editorial rhythm. */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryMeta.map((category, index) => {
            const copy = dict.categories.items[category.slug]
            return (
              <Reveal
                key={category.slug}
                delay={(index % 3) * 90}
                className={index < 2 ? 'lg:col-span-1' : ''}
              >
                <a
                  href={category.href}
                  aria-disabled={!category.available}
                  className="group relative block aspect-4/5 overflow-hidden bg-[var(--ink)]"
                >
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    aria-hidden="true"
                    className={`size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] ${
                      category.available ? '' : 'opacity-45 saturate-50'
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/35 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    {!category.available && (
                      <span className="mb-3 inline-block border border-[var(--champagne)]/70 px-2.5 py-1 text-[0.5rem] tracking-[0.18em] uppercase text-[var(--champagne)]">
                        {dict.categories.comingSoon}
                      </span>
                    )}
                    <p className="text-[0.5625rem] tracking-[0.22em] uppercase text-[var(--bone)]/60">
                      {copy.eyebrow}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-none text-[var(--bone)]">
                      {copy.name}
                    </h3>
                    <p className="mt-3 max-w-xs text-xs leading-relaxed text-[var(--bone)]/70">
                      {copy.description}
                    </p>

                    {category.available && (
                      <span className="mt-5 inline-flex items-center gap-2 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--champagne)]">
                        {dict.categories.viewCollection}
                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
