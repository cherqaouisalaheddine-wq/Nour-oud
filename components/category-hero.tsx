'use client'

import { getProductsByMainCategory, type MainCategoryId } from '@/lib/products'
import { mainCategoryMeta } from '@/lib/categories'
import { localePath } from '@/lib/i18n/config'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Category page hero.
 *
 * Kept on the ivory ground rather than the dark hero treatment: the header is
 * transparent at the top of the page, so a light band keeps the wordmark and
 * nav readable while the dark flacon photograph sits in its own frame.
 */
export function CategoryHero({ categoryId }: { categoryId: MainCategoryId }) {
  const { dict, locale } = useI18n()
  const copy = dict.univers.items[categoryId]
  const count = getProductsByMainCategory(categoryId).length

  return (
    <section className="bg-[var(--bone-deep)] px-5 pt-24 pb-14 lg:px-8 lg:pt-28 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav aria-label={dict.category.eyebrow} className="text-[0.6875rem] tracking-[0.14em] uppercase">
          <a
            href={localePath(locale)}
            className="text-[var(--ink-muted)] transition-colors duration-400 hover:text-[var(--ink)]"
          >
            {dict.category.breadcrumbHome}
          </a>
          <span aria-hidden="true" className="mx-3 text-[var(--hairline-strong)]">
            /
          </span>
          <span className="text-[var(--ink)]">{copy.name}</span>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">{dict.category.eyebrow}</p>
            <h1 className="section-title mt-4 max-w-xl">{copy.name}</h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {count > 0 && (
                <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--ink-muted)]">
                  {dict.collection.results(count)}
                </p>
              )}
              <a
                href={`${localePath(locale)}#collection`}
                className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--champagne)] underline decoration-[var(--champagne)]/40 decoration-1 underline-offset-4 transition-colors duration-400 hover:decoration-[var(--champagne)]"
              >
                {dict.category.backToCollection}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ink)] lg:aspect-[4/5]">
            <img
              src={mainCategoryMeta[categoryId].image}
              alt=""
              aria-hidden="true"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
