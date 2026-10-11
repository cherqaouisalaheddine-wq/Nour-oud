'use client'

import { Check, MessageCircle, Minus, Plus, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Product, UpcomingProduct } from '@/lib/products'
import { productGallery } from '@/lib/products'
import type { ProductTagKey } from '@/lib/site'
import { categoryIdForRange, categoryPath } from '@/lib/categories'
import { localePath } from '@/lib/i18n/config'
import { categoryCopy } from '@/lib/i18n/category-copy'
import { useCart } from '@/components/cart/cart-provider'
import { useI18n } from '@/components/i18n/locale-provider'
import { ProductCard } from '@/components/product-card'
import { UpcomingProductCard } from '@/components/upcoming-product-card'
import { ProductGallery } from '@/components/product-gallery'
import { Reveal } from '@/components/reveal'

/** Max units per cart line, mirroring the cart's own ceiling. */
const MAX_QUANTITY = 20

/**
 * A titled block of the fiche. On desktop the eyebrow sits in a narrow left
 * column and the content occupies the rest, which keeps the long editorial
 * sections from running full width.
 */
function FicheSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-[var(--hairline)] pt-10 lg:grid-cols-[15rem_1fr] lg:gap-12">
      <h2 className="eyebrow">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

/** Definition list of the technical rows a fiche can state. */
function Characteristics({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col border-b border-[var(--hairline)] pb-3"
        >
          <dt className="text-[0.625rem] tracking-[0.16em] uppercase text-[var(--ink-muted)]">
            {row.label}
          </dt>
          <dd className="mt-1.5 text-sm" dir="auto">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Breadcrumb shared by both fiche shapes. */
function FicheBreadcrumb({
  rangeName,
  rangeHref,
  name,
  ariaLabel,
  homeLabel,
}: {
  rangeName: string
  rangeHref: string
  name: string
  ariaLabel: string
  homeLabel: string
}) {
  const { locale } = useI18n()

  return (
    <div className="border-b border-[var(--hairline)] bg-[var(--bone-deep)] px-5 pt-24 pb-6 lg:px-8 lg:pt-28">
      <nav aria-label={ariaLabel} className="mx-auto max-w-7xl">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--ink-muted)]">
          <li>
            <a href={localePath(locale)} className="transition-colors hover:text-[var(--ink)]">
              {homeLabel}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href={rangeHref} className="transition-colors hover:text-[var(--ink)]">
              {rangeName}
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--ink)]" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
    </div>
  )
}

/** Verified, purchasable bottle fiche. */
export function ProductDetail({
  product,
  similar,
}: {
  product: Product
  similar: Product[]
}) {
  const { dict, locale, formatPrice, productName, productAltName, productNotes, productDescription } =
    useI18n()
  const { add, open } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const name = productName(product)
  const images = productGallery(product)
  const rangeCategory = categoryIdForRange(product.range)
  const rangeCopy = categoryCopy(dict, rangeCategory)

  const orderable = product.stock === undefined || product.stock > 0
  const availability =
    product.stock === undefined
      ? dict.productPage.availability.available
      : product.stock > 0
        ? dict.productPage.availability.inStock(product.stock)
        : dict.productPage.availability.outOfStock

  const pyramid = [
    { label: dict.productPage.notesTop, value: locale === 'ar' ? product.notesTopAr : product.notesTop },
    { label: dict.productPage.notesHeart, value: locale === 'ar' ? product.notesHeartAr : product.notesHeart },
    { label: dict.productPage.notesBase, value: locale === 'ar' ? product.notesBaseAr : product.notesBase },
  ].filter((row) => Boolean(row.value))

  const rows: { label: string; value: string }[] = [
    { label: dict.productPage.labels.brand, value: product.brand ?? dict.productPage.labels.maison },
    { label: dict.productPage.labels.family, value: dict.filters.family[product.category] },
    { label: dict.productPage.labels.gender, value: dict.filters.gender[product.gender] },
  ]
  if (product.concentration) {
    rows.push({
      label: dict.productPage.labels.concentration,
      value: dict.productPage.concentration[product.concentration],
    })
  }
  rows.push(
    { label: dict.productPage.labels.size, value: `${product.size} ${dict.units.ml}` },
    { label: dict.productPage.labels.reference, value: product.slug.toUpperCase() },
    { label: dict.productPage.labels.availability, value: availability },
  )

  useEffect(() => {
    if (!justAdded) return
    const timer = window.setTimeout(() => setJustAdded(false), 1800)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  function handleAdd() {
    if (!orderable) return
    add(product, quantity)
    setJustAdded(true)
  }

  return (
    <article className="bg-[var(--bone)]">
      <FicheBreadcrumb
        rangeName={rangeCopy.name}
        rangeHref={categoryPath(locale, rangeCategory)}
        name={name}
        ariaLabel={dict.productPage.breadcrumbAria}
        homeLabel={dict.category.breadcrumbHome}
      />

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photographs */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery
              images={images}
              name={name}
              tag={dict.tags[product.tag as ProductTagKey] ?? product.tag}
            />
          </div>

          {/* Title, price and purchase panel */}
          <div>
            <p className="eyebrow">
              {dict.filters.lineage[product.lineage]} · {dict.filters.family[product.category]} ·{' '}
              {dict.filters.gender[product.gender]}
            </p>
            <h1
              dir="auto"
              className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-light lg:text-5xl"
            >
              {name}
            </h1>
            <p dir="auto" className="mt-2 text-sm text-[var(--ink-muted)]">
              {productAltName(product)}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="tracking-[0.14em] uppercase">
                {product.brand ?? dict.productPage.labels.maison}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-3.5 fill-[var(--champagne)] text-[var(--champagne)]" aria-hidden="true" />
                <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-[var(--ink-muted)]">
                  · {dict.productPage.reviewsSuffix(product.reviews)}
                </span>
              </span>
            </div>

            <p className="mt-6 font-[family-name:var(--font-display)] text-3xl tabular-nums">
              {formatPrice(product.price)}
            </p>
            <p className="mt-2 text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--champagne)]">
              {availability}
            </p>

            <p className="mt-6 max-w-prose text-sm leading-relaxed text-[var(--ink-muted)]">
              {productDescription(product)}
            </p>

            <div className="mt-8 border-t border-[var(--hairline)] pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-[0.625rem] tracking-[0.16em] uppercase text-[var(--ink-muted)]">
                  {dict.productPage.quantityLabel}
                </span>
                <div className="flex items-center border border-[var(--hairline)]">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    aria-label={dict.productPage.decrease}
                    className="flex size-10 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    <Minus className="size-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.min(MAX_QUANTITY, value + 1))}
                    aria-label={dict.productPage.increase}
                    className="flex size-10 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    <Plus className="size-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!orderable}
                  className="btn-ink flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {justAdded ? (
                    <>
                      <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                      {dict.productPage.added}
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      {dict.productPage.addToCart}
                    </>
                  )}
                </button>
                {justAdded && (
                  <button type="button" onClick={open} className="btn-outline sm:w-auto">
                    {dict.productPage.viewCart}
                  </button>
                )}
              </div>

              <a
                href={dict.wa.order(name)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-3 w-full"
              >
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.productPage.orderWhatsApp}
              </a>
            </div>
          </div>
        </div>

        {/* Editorial sections */}
        <div className="mt-20 flex flex-col gap-12 lg:mt-28">
          <FicheSection label={dict.productPage.descriptionTitle}>
            <p className="max-w-prose text-sm leading-[1.9] text-[var(--ink-muted)]">
              {productDescription(product)}
            </p>
          </FicheSection>

          <FicheSection label={dict.productPage.notesTitle}>
            {pyramid.length > 0 ? (
              <dl className="grid gap-6 sm:grid-cols-3">
                {pyramid.map((row) => (
                  <div key={row.label}>
                    <dt className="text-[0.625rem] tracking-[0.16em] uppercase text-[var(--ink-muted)]">
                      {row.label}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm leading-relaxed" dir="auto">
                {productNotes(product)}
              </p>
            )}
          </FicheSection>

          <FicheSection label={dict.productPage.characteristicsTitle}>
            <Characteristics rows={rows} />
          </FicheSection>

          <FicheSection label={dict.productPage.similarTitle}>
            {similar.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
                {similar.map((item, index) => (
                  <Reveal key={item.slug} delay={(index % 4) * 70}>
                    <ProductCard product={item} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-[var(--ink-muted)]">
                {dict.productPage.similarEmpty}
              </p>
            )}
          </FicheSection>
        </div>
      </div>
    </article>
  )
}

/** Inquiry-only reference fiche: no price, no cart, an honest notice instead. */
export function ReferenceDetail({
  reference,
  similar,
}: {
  reference: UpcomingProduct
  similar: UpcomingProduct[]
}) {
  const { dict, locale, productName, productAltName, productDescription } = useI18n()

  const name = productName(reference)
  const rangeCategory = categoryIdForRange(reference.range)
  const rangeCopy = categoryCopy(dict, rangeCategory)

  const rows: { label: string; value: string }[] = []
  if (reference.brand) {
    rows.push({ label: dict.productPage.labels.brand, value: reference.brand })
  }
  if (reference.gender) {
    rows.push({ label: dict.productPage.labels.gender, value: dict.filters.gender[reference.gender] })
  }
  rows.push(
    { label: dict.productPage.labels.reference, value: reference.slug.toUpperCase() },
    { label: dict.productPage.labels.availability, value: dict.productPage.availability.onRequest },
  )

  return (
    <article className="bg-[var(--bone)]">
      <FicheBreadcrumb
        rangeName={rangeCopy.name}
        rangeHref={categoryPath(locale, rangeCategory)}
        name={name}
        ariaLabel={dict.productPage.breadcrumbAria}
        homeLabel={dict.category.breadcrumbHome}
      />

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={[]} name={name} gradient={reference.color} />
          </div>

          <div>
            <p className="eyebrow">
              {dict.filters.lineage[reference.lineage]}
              {reference.gender ? ` · ${dict.filters.gender[reference.gender]}` : ''}
            </p>
            <h1
              dir="auto"
              className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-light lg:text-5xl"
            >
              {name}
            </h1>
            <p dir="auto" className="mt-2 text-sm text-[var(--ink-muted)]">
              {productAltName(reference)}
            </p>

            {reference.brand && (
              <p className="mt-4 text-sm tracking-[0.14em] uppercase">{reference.brand}</p>
            )}

            <p className="mt-6 font-[family-name:var(--font-display)] text-3xl">
              {dict.productPage.priceOnRequest}
            </p>
            <p className="mt-2 text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--champagne)]">
              {dict.productPage.availability.onRequest}
            </p>

            <p className="mt-6 max-w-prose text-sm leading-relaxed text-[var(--ink-muted)]">
              {productDescription(reference)}
            </p>

            <div className="mt-8 border-t border-[var(--hairline)] pt-6">
              <p className="max-w-prose text-sm leading-relaxed text-[var(--ink-muted)]">
                {dict.productPage.referenceNotice}
              </p>
              <a
                href={dict.wa.inquire(name)}
                target="_blank"
                rel="noreferrer"
                className="btn-ink mt-5 w-full"
              >
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {dict.productPage.inquire}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-12 lg:mt-28">
          <FicheSection label={dict.productPage.descriptionTitle}>
            <p className="max-w-prose text-sm leading-[1.9] text-[var(--ink-muted)]">
              {productDescription(reference)}
            </p>
          </FicheSection>

          <FicheSection label={dict.productPage.notesTitle}>
            <p className="text-sm italic text-[var(--ink-muted)]">
              {dict.productPage.notesPending}
            </p>
          </FicheSection>

          <FicheSection label={dict.productPage.characteristicsTitle}>
            <Characteristics rows={rows} />
          </FicheSection>

          <FicheSection label={dict.productPage.similarTitle}>
            {similar.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:gap-x-8">
                {similar.map((entry, index) => (
                  <Reveal key={entry.slug} delay={(index % 4) * 70}>
                    <UpcomingProductCard entry={entry} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-[var(--ink-muted)]">
                {dict.productPage.similarEmpty}
              </p>
            )}
          </FicheSection>
        </div>
      </div>
    </article>
  )
}
