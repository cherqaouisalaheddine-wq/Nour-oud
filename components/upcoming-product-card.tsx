'use client'

import { MessageCircle } from 'lucide-react'
import type { UpcomingProduct } from '@/lib/products'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Card for a fragrance whose information is not verified yet.
 *
 * It mirrors the proportions of `ProductCard` so the two read as a family, but
 * it deliberately shows no price, no rating and no add-to-cart button: the only
 * action is asking about it on WhatsApp. The tile is a gradient with the name
 * set in the display face instead of a photograph we do not have.
 */
export function UpcomingProductCard({ entry }: { entry: UpcomingProduct }) {
  const { dict, locale, productName, productAltName, productDescription } = useI18n()

  const name = productName(entry)

  return (
    <article className="group flex h-full flex-col">
      <div
        className={`relative flex aspect-4/5 w-full items-end overflow-hidden bg-gradient-to-br p-6 ${entry.color}`}
      >
        <span className="absolute top-3 start-3 border border-[var(--champagne)]/70 px-2.5 py-1 text-[0.5rem] font-medium tracking-[0.18em] uppercase text-[var(--champagne)]">
          {dict.category.upcoming.badge}
        </span>

        <h3
          dir="auto"
          className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--bone)]"
        >
          {name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        {/* Keep the Latin name visible in Arabic mode, as the product cards do. */}
        {locale === 'ar' && (
          <p dir="ltr" className="truncate text-[0.6875rem] tracking-wide text-[var(--ink-muted)]">
            {productAltName(entry)}
          </p>
        )}

        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-[var(--champagne)]">
            {dict.category.upcoming.priceOnRequest}
          </p>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
          {productDescription(entry)}
        </p>

        <a
          href={dict.wa.inquire(name)}
          target="_blank"
          rel="noreferrer"
          className="btn-outline mt-4 min-h-11! px-4! py-2! text-[0.625rem]!"
        >
          <MessageCircle className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          {dict.category.upcoming.inquire}
        </a>
      </div>
    </article>
  )
}
