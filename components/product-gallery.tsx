'use client'

import { X, ZoomIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/components/i18n/locale-provider'

type ProductGalleryProps = {
  /** Ordered photographs. Empty for a reference we have no shot of. */
  images: string[]
  name: string
  /** Merchandising tag, shown over the first photograph. */
  tag?: string
  /** Fallback tile gradient, used when there is no photograph. */
  gradient?: string
}

/**
 * Fiche gallery.
 *
 * Every verified bottle has at least one photograph and a wider lightbox view;
 * a bottle with several shots also gets a thumbnail strip. A reference we have
 * no photograph of falls back to the same gradient tile used on its card, so
 * nothing is invented to fill the frame.
 */
export function ProductGallery({ images, name, tag, gradient }: ProductGalleryProps) {
  const { dict } = useI18n()
  const [active, setActive] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const hasPhoto = images.length > 0
  const current = images[Math.min(active, images.length - 1)]

  // Lock the page, move focus into the lightbox and wire Escape while it is open.
  useEffect(() => {
    if (!zoomOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setZoomOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [zoomOpen])

  function openZoom() {
    setZoomed(false)
    setZoomOpen(true)
  }

  function selectImage(index: number) {
    setActive(index)
    setZoomed(false)
  }

  return (
    <div>
      <div className="relative aspect-4/5 overflow-hidden bg-[var(--bone-deep)]">
        {hasPhoto ? (
          <button
            type="button"
            onClick={openZoom}
            aria-label={dict.productPage.zoomAria(name)}
            className="group block size-full cursor-zoom-in"
          >
            <img
              src={current}
              alt={dict.productPage.imageAlt(name)}
              className="size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute bottom-4 end-4 flex items-center gap-2 bg-[var(--bone)]/92 px-3 py-2 text-[0.5625rem] tracking-[0.14em] uppercase opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <ZoomIn className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              {dict.productPage.zoomHint}
            </span>
          </button>
        ) : (
          <div
            className={`flex size-full items-end bg-gradient-to-br p-8 ${gradient ?? ''}`}
          >
            <span
              dir="auto"
              className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--bone)]"
            >
              {name}
            </span>
          </div>
        )}

        {tag && hasPhoto && (
          <span className="absolute top-4 start-4 bg-[var(--bone)]/92 px-3 py-1 text-[0.5625rem] font-medium tracking-[0.16em] uppercase backdrop-blur-sm">
            {tag}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => selectImage(index)}
              aria-label={dict.productPage.thumbnailAria(index + 1, name)}
              aria-current={index === active}
              className={`aspect-square overflow-hidden border transition-colors duration-400 ${
                index === active
                  ? 'border-[var(--ink)]'
                  : 'border-[var(--hairline)] hover:border-[var(--ink)]/60'
              }`}
            >
              <img src={src} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && hasPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dict.productPage.galleryLabel}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[var(--ink)]/92 p-4"
        >
          <button
            type="button"
            aria-label={dict.productPage.zoomCloseAria}
            onClick={() => setZoomOpen(false)}
            className="absolute inset-0 h-full w-full cursor-zoom-out"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label={dict.productPage.zoomCloseAria}
            className="absolute top-4 end-4 z-10 flex size-11 items-center justify-center text-[var(--bone)] transition-colors hover:text-[var(--champagne)]"
          >
            <X className="size-6" strokeWidth={1.5} />
          </button>
          <img
            src={current}
            alt={dict.productPage.imageAlt(name)}
            onClick={() => setZoomed((value) => !value)}
            className={`relative max-h-[88vh] max-w-full object-contain transition-transform duration-500 ${
              zoomed ? 'scale-[1.6] cursor-zoom-out' : 'cursor-zoom-in'
            }`}
          />
        </div>
      )}
    </div>
  )
}
