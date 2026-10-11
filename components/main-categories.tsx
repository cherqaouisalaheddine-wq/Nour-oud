'use client'

import { ArrowUpRight } from 'lucide-react'
import { mainCategoryIds } from '@/lib/products'
import { categoryPath, mainCategoryMeta } from '@/lib/categories'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * The two top-level universes as large editorial cards.
 *
 * These are the primary entry points into the catalogue: each one links to its
 * own listing page, so the homepage no longer relies on a single mixed grid.
 */
export function MainCategories() {
  const { dict, locale } = useI18n()

  return (
    <section id="univers" className="bg-[var(--bone-deep)] px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{dict.univers.eyebrow}</p>
              <h2 className="section-title mt-4">{dict.univers.title}</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.univers.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {mainCategoryIds.map((id, index) => {
            const copy = dict.univers.items[id]
            return (
              <Reveal key={id} delay={index * 90}>
                <a
                  href={categoryPath(locale, id)}
                  className="group relative block aspect-4/5 overflow-hidden bg-[var(--ink)] sm:aspect-[16/11]"
                >
                  <img
                    src={mainCategoryMeta[id].image}
                    alt=""
                    loading="lazy"
                    aria-hidden="true"
                    className="size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                    <p className="text-[0.5625rem] tracking-[0.22em] uppercase text-[var(--bone)]/60">
                      {copy.eyebrow}
                    </p>
                    <h3 className="mt-2 max-w-[22ch] font-[family-name:var(--font-display)] text-3xl leading-[1.05] text-[var(--bone)] lg:text-4xl">
                      {copy.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--bone)]/70">
                      {copy.tagline}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 border border-[var(--champagne)]/70 px-5 py-3 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--champagne)] transition-colors duration-500 group-hover:bg-[var(--champagne)] group-hover:text-[var(--ink)]">
                      {dict.univers.discover}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
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
