'use client'

import { useMemo } from 'react'
import {
  getProductBySlug,
  getSimilarProducts,
  getSimilarReferences,
  getUpcomingBySlug,
} from '@/lib/products'
import { localePath } from '@/lib/i18n/config'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductDetail, ReferenceDetail } from '@/components/product-detail'
import { useI18n } from '@/components/i18n/locale-provider'

/**
 * Composition root for a product fiche.
 *
 * Mirrors `CategoryScreen` (same header, cart drawer and footer) but the main
 * region is a single bottle instead of a grid. The route resolves nothing but
 * the slug, so the same screen serves a verified product and an inquiry-only
 * reference. The header search is omitted here: there is no catalogue on the
 * page for it to act on. The not-found branch is a defensive fallback — the
 * route already rejects unknown slugs.
 */
export function ProductScreen({ slug }: { slug: string }) {
  const { dict, locale } = useI18n()

  const product = useMemo(() => getProductBySlug(slug), [slug])
  const reference = useMemo(
    () => (product ? undefined : getUpcomingBySlug(slug)),
    [product, slug],
  )
  const similarProducts = useMemo(
    () => (product ? getSimilarProducts(product) : []),
    [product],
  )
  const similarReferences = useMemo(
    () => (reference ? getSimilarReferences(reference) : []),
    [reference],
  )

  return (
    <div className="min-h-screen bg-[var(--bone)]">
      <SiteHeader />

      <main>
        {product ? (
          <ProductDetail product={product} similar={similarProducts} />
        ) : reference ? (
          <ReferenceDetail reference={reference} similar={similarReferences} />
        ) : (
          <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-32 text-center">
            <p className="eyebrow">{dict.notFound.eyebrow}</p>
            <h1 className="section-title max-w-xl">{dict.notFound.title}</h1>
            <p className="max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
              {dict.notFound.text}
            </p>
            <a href={localePath(locale)} className="btn-ink mt-2">
              {dict.notFound.cta}
            </a>
          </section>
        )}
      </main>

      <SiteFooter />
      <CartDrawer />
    </div>
  )
}
