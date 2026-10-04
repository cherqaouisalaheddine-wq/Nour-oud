'use client'

import { useEffect, useRef } from 'react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { cartOrderLink, siteConfig } from '@/lib/site'
import { useCart } from '@/components/cart/cart-provider'

export function CartDrawer() {
  const { lines, itemCount, subtotal, isOpen, close, setQuantity, remove } =
    useCart()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const remainingForFreeShipping = siteConfig.freeShippingThreshold - subtotal

  // Lock body scroll and move focus into the drawer while it is open.
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close])

  if (!isOpen) return null

  const freeShippingProgress = Math.min(
    100,
    (subtotal / siteConfig.freeShippingThreshold) * 100,
  )

  return (
    <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label="Panier">
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-[var(--ink)]/55 backdrop-blur-sm"
        style={{ animation: 'rise-in 0.3s var(--ease-luxury) both' }}
      />

      <aside
        className="absolute top-0 right-0 flex h-full w-full max-w-[27rem] flex-col bg-[var(--bone)] shadow-2xl"
        style={{ animation: 'rise-in 0.45s var(--ease-luxury) both' }}
      >
        <header className="flex items-center justify-between border-b border-[var(--hairline)] px-6 py-5">
          <div>
            <p className="eyebrow">Votre sélection</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
              Panier{' '}
              <span className="text-[var(--ink-muted)]">({itemCount})</span>
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Fermer le panier"
            className="-mr-2 flex size-11 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag
              className="size-10 text-[var(--hairline-strong)]"
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="mt-6 font-[family-name:var(--font-display)] text-2xl">
              Votre panier est vide
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
              Parcourez la collection et ajoutez vos fragrances préférées.
            </p>
            <button type="button" onClick={close} className="btn-ink mt-8">
              Découvrir la collection
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-[var(--hairline)] px-6 py-4">
              <p className="text-xs tracking-wide text-[var(--ink-muted)]">
                {remainingForFreeShipping > 0 ? (
                  <>
                    Plus que{' '}
                    <span className="text-[var(--ink)]">
                      {formatPrice(remainingForFreeShipping)}
                    </span>{' '}
                    pour la livraison offerte
                  </>
                ) : (
                  <span className="text-[var(--ink)]">
                    Livraison offerte débloquée
                  </span>
                )}
              </p>
              <div
                className="mt-2.5 h-px w-full bg-[var(--hairline)]"
                role="presentation"
              >
                <div
                  className="h-px bg-[var(--champagne)] transition-[width] duration-700"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <li
                  key={line.slug}
                  className="flex gap-4 border-b border-[var(--hairline)] py-5"
                >
                  <img
                    src={line.image}
                    alt={`Parfum ${line.name}`}
                    loading="lazy"
                    className="size-24 shrink-0 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-[family-name:var(--font-display)] text-lg leading-tight">
                          {line.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-muted)]">
                          {line.nameAr}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm tabular-nums">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-[var(--hairline)]">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          aria-label={`Diminuer la quantité de ${line.name}`}
                          className="flex size-9 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                        >
                          <Minus className="size-3.5" strokeWidth={1.5} />
                        </button>
                        <span
                          className="w-8 text-center text-sm tabular-nums"
                          aria-live="polite"
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          aria-label={`Augmenter la quantité de ${line.name}`}
                          className="flex size-9 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                        >
                          <Plus className="size-3.5" strokeWidth={1.5} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)] underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
                      >
                        <Trash2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-[var(--hairline)] px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs tracking-[0.18em] uppercase text-[var(--ink-muted)]">
                  Sous-total
                </span>
                <span className="font-[family-name:var(--font-display)] text-2xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-[var(--ink-muted)]">
                Frais de livraison calculés à la confirmation.
              </p>
              <a
                href={cartOrderLink(
                  lines.map((line) => ({
                    name: line.name,
                    quantity: line.quantity,
                    price: line.price,
                  })),
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-ink mt-5 w-full"
              >
                Commander via WhatsApp
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}