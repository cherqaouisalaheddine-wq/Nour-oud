'use client'

import { Check, Plus, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Product } from '@/lib/products'
import type { ProductTagKey } from '@/lib/site'
import { useCart } from '@/components/cart/cart-provider'
import { useI18n } from '@/components/i18n/locale-provider'

type ProductCardProps = {
  product: Product
  onView: (product: Product) => void
  /** Slightly tighter type for the bestseller rail. */
  compact?: boolean
}

/**
 * Product card used by the featured collection and the best-sellers rail.
 *
 * The whole card is a button that opens the quick view. The add button and the
 * card button are siblings, not nested, so there is no interactive element
 * inside another.
 */
export function ProductCard({ product, onView, compact = false }: ProductCardProps) {
  const { add } = useCart()
  const { dict, locale, formatPrice, productName, productNotes } = useI18n()
  const [justAdded, setJustAdded] = useState(false)

  const name = productName(product)
  const tag = dict.tags[product.tag as ProductTagKey] ?? product.tag

  useEffect(() => {
    if (!justAdded) return
    const timer = window.setTimeout(() => setJustAdded(false), 1800)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  function handleAdd() {
    add(product, 1)
    setJustAdded(true)
  }

  return (
    <article className="group relative flex flex-col">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block aspect-4/5 w-full cursor-pointer overflow-hidden bg-[var(--bone-deep)] text-start"
        aria-label={dict.product.viewAria(name)}
      >
        <img
          src={product.image}
          alt={dict.product.imageAlt(name)}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* Legibility scrim so the tag reads over any product photo. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        <span className="absolute top-3 start-3 bg-[var(--bone)]/92 px-2.5 py-1 text-[0.5625rem] font-medium tracking-[0.16em] uppercase backdrop-blur-sm">
          {tag}
        </span>
      </button>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={`truncate font-[family-name:var(--font-display)] leading-tight ${compact ? 'text-xl' : 'text-2xl'}`}
            >
              <button
                type="button"
                onClick={() => onView(product)}
                dir="auto"
                className="cursor-pointer text-start transition-colors duration-500 hover:text-[var(--champagne)]"
              >
                {name}
              </button>
            </h3>
            {/* Keep the original (Latin) perfume name visible in Arabic mode. */}
            {locale === 'ar' && (
              <p
                dir="ltr"
                className="mt-0.5 truncate text-[0.6875rem] tracking-wide text-[var(--ink-muted)]"
              >
                {product.name}
              </p>
            )}
            <p className="mt-1 truncate text-[0.6875rem] tracking-wide text-[var(--ink-muted)]">
              {dict.filters.family[product.category]} · {dict.filters.gender[product.gender]} ·{' '}
              {product.size} {dict.units.ml}
            </p>
            <p className="mt-1.5 inline-block border border-[var(--hairline-strong)] px-1.5 py-0.5 text-[0.5625rem] tracking-[0.12em] uppercase text-[var(--champagne)]">
              {dict.filters.lineage[product.lineage]}
            </p>
          </div>
          <p className="shrink-0 text-sm tabular-nums">{formatPrice(product.price)}</p>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
          {productNotes(product)}
        </p>

        <div className="mt-3 flex items-center gap-1.5">
          <Star className="size-3 fill-[var(--champagne)] text-[var(--champagne)]" aria-hidden="true" />
          <span className="text-xs tabular-nums">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-[var(--ink-muted)]">({product.reviews})</span>
        </div>

        {/* Actions sit outside the image button so they stay tappable. */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="btn-ink flex-1 min-h-11! px-3! py-2! text-[0.625rem]!"
            aria-label={dict.product.addAria(name)}
          >
            {justAdded ? (
              <>
                <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
                {dict.product.added}
              </>
            ) : (
              <>
                <Plus className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                {dict.product.add}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => onView(product)}
            className="btn-outline min-h-11! px-4! py-2! text-[0.625rem]!"
          >
            {dict.product.details}
          </button>
        </div>
      </div>
    </article>
  )
}
