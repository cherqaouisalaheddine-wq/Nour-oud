'use client'

import { Check, MessageCircle, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { orderLink } from '@/lib/site'
import { useCart } from '@/components/cart/cart-provider'

type QuickViewProps = {
  product: Product | null
  onClose: () => void
}

/**
 * Product quick view. Preserves the original dialog behaviour: overlay click
 * and Escape both close, and the WhatsApp order link remains the checkout path.
 */
export function QuickView({ product, onClose }: QuickViewProps) {
  const { add, open } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!product) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [product, onClose])

  useEffect(() => {
    if (!product) setJustAdded(false)
  }, [product])

  if (!product) return null

  function handleAdd() {
    if (!product) return
    add(product, 1)
    setJustAdded(true)
  }

  function handleAddOpenCart() {
    if (!product) return
    add(product, 1)
    onClose()
    open()
  }

  return (
    <div className="fixed inset-0 z-90 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fermer les détails"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-[var(--ink)]/65 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        className="relative grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-[var(--bone)] shadow-2xl sm:grid-cols-2"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer les détails"
          className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center bg-[var(--bone)]/90 text-[var(--ink)] backdrop-blur-sm transition-colors hover:bg-[var(--bone)]"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>

        <div className="relative aspect-4/5 overflow-hidden bg-[var(--bone-deep)] sm:aspect-auto sm:min-h-[30rem]">
          <img
            src={product.image}
            alt={`Flacon du parfum ${product.name}`}
            className="size-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-[var(--bone)]/92 px-3 py-1 text-[0.5625rem] font-medium tracking-[0.16em] uppercase backdrop-blur-sm">
            {product.tag}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
          <div>
            <p className="eyebrow">
              {product.category} · {product.gender}
            </p>
            <h2
              id="quickview-title"
              className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight font-light sm:text-4xl"
            >
              {product.name}
            </h2>
            <p className="mt-1.5 text-sm text-[var(--ink-muted)]" dir="rtl">
              {product.nameAr}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--hairline)] py-5 text-sm">
            <div>
              <dt className="text-[0.625rem] tracking-[0.16em] uppercase text-[var(--ink-muted)]">
                Notes
              </dt>
              <dd className="mt-1">{product.notes}</dd>
            </div>
            <div>
              <dt className="text-[0.625rem] tracking-[0.16em] uppercase text-[var(--ink-muted)]">
                Concentration
              </dt>
              <dd className="mt-1">Eau de Parfum · 50 ml</dd>
            </div>
          </dl>

          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
            {product.description}
          </p>

          <div className="flex items-baseline justify-between">
            <p className="font-[family-name:var(--font-display)] text-3xl tabular-nums">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-[var(--ink-muted)]">
              {product.rating.toFixed(1)} / 5 · {product.reviews} avis
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className="btn-ink flex-1"
              >
                {justAdded ? (
                  <>
                    <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    Ajouter au panier
                  </>
                )}
              </button>
              {justAdded && (
                <button
                  type="button"
                  onClick={handleAddOpenCart}
                  className="btn-outline px-5!"
                >
                  Voir le panier
                </button>
              )}
            </div>

            <a
              href={orderLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full"
            >
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}