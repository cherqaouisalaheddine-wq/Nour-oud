'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import type { Locale } from '@/lib/i18n/config'
import {
  LANGUAGE_COOKIE,
  LANGUAGE_STORAGE_KEY,
  localeDirections,
} from '@/lib/i18n/config'
import { getDictionary, type Dictionary } from '@/lib/i18n/dictionaries'
import { formatPrice as formatPriceBase } from '@/lib/format'
import {
  productAltName as productAltNameBase,
  productDescription as productDescriptionBase,
  productName as productNameBase,
  productNotes as productNotesBase,
} from '@/lib/i18n/product'
import type { Product } from '@/lib/products'

type ProductCopy = Pick<
  Product,
  'name' | 'nameAr' | 'notes' | 'notesAr' | 'description' | 'descriptionAr'
>

type I18nValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  dict: Dictionary
  formatPrice: (amount: number) => string
  productName: (product: ProductCopy) => string
  productAltName: (product: ProductCopy) => string
  productNotes: (product: ProductCopy) => string
  productDescription: (product: ProductCopy) => string
}

const I18nContext = createContext<I18nValue | null>(null)

/**
 * Exposes the active locale, its dictionary and the locale-aware formatters to
 * the whole client tree. The locale itself comes from the route (`/fr`, `/ar`),
 * so it is a plain serializable prop and there is no flash of the wrong
 * language on first paint.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const dict = useMemo(() => getDictionary(locale), [locale])
  const dir = localeDirections[locale]

  // Remember the choice so returning visitors land on the same language.
  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    } catch {
      // Storage disabled (private mode): the URL still carries the locale.
    }
    document.cookie = `${LANGUAGE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`

    /*
     * Keep the document in sync on client-side language switches. The server
     * already renders the right `lang`/`dir`, but re-asserting them here makes
     * the RTL flip independent of how the router applies root-layout updates.
     */
    const root = document.documentElement
    root.lang = locale
    root.dir = dir
  }, [locale, dir])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir,
      isRtl: dir === 'rtl',
      dict,
      formatPrice: (amount) => formatPriceBase(amount, locale),
      productName: (product) => productNameBase(product, locale),
      productAltName: (product) => productAltNameBase(product, locale),
      productNotes: (product) => productNotesBase(product, locale),
      productDescription: (product) => productDescriptionBase(product, locale),
    }),
    [locale, dir, dict],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside <LocaleProvider>')
  }
  return context
}
