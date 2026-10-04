'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Product } from '@/lib/products'
import { products as allProducts } from '@/lib/products'

/**
 * Cart state, persisted to localStorage.
 *
 * This is deliberately client-side only: the storefront has no payment or order
 * backend, and checkout completes over WhatsApp. Nothing here simulates a
 * server response.
 */

export type CartLine = {
  slug: string
  name: string
  nameAr: string
  price: number
  image: string
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  isOpen: boolean
  hydrated: boolean
  add: (product: Product, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
  clear: () => void
  open: () => void
  close: () => void
}

const STORAGE_KEY = 'oudia.cart.v1'
const MAX_PER_LINE = 20

const CartContext = createContext<CartContextValue | null>(null)

/** Keeps only lines whose slug still exists in the catalogue. */
function reconcile(stored: unknown): CartLine[] {
  if (!Array.isArray(stored)) return []

  return stored.flatMap((entry) => {
    if (typeof entry !== 'object' || entry === null) return []
    const candidate = entry as Partial<CartLine>

    if (typeof candidate.slug !== 'string') return []
    const product = allProducts.find((item) => item.slug === candidate.slug)
    if (!product) return []

    const quantity =
      typeof candidate.quantity === 'number' && candidate.quantity > 0
        ? Math.min(Math.floor(candidate.quantity), MAX_PER_LINE)
        : 1

    return [
      {
        slug: product.slug,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        image: product.image,
        quantity,
      },
    ]
  })
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Read once on mount. Avoids SSR/client markup mismatch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(reconcile(JSON.parse(raw)))
    } catch {
      // Private mode or corrupted payload: start empty rather than crash.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Storage full or unavailable - cart still works for this session.
    }
  }, [lines, hydrated])

  const add = useCallback((product: Product, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.slug === product.slug)
      if (existing) {
        return current.map((line) =>
          line.slug === product.slug
            ? {
                ...line,
                quantity: Math.min(line.quantity + quantity, MAX_PER_LINE),
              }
            : line,
        )
      }
      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          nameAr: product.nameAr,
          price: product.price,
          image: product.image,
          quantity: Math.min(quantity, MAX_PER_LINE),
        },
      ]
    })
  }, [])

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) =>
            line.slug === slug
              ? { ...line, quantity: Math.min(quantity, MAX_PER_LINE) }
              : line,
          ),
    )
  }, [])

  const remove = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = lines.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    )
    return {
      lines,
      itemCount,
      subtotal,
      isOpen,
      hydrated,
      add,
      setQuantity,
      remove,
      clear,
      open,
      close,
    }
  }, [lines, isOpen, hydrated, add, setQuantity, remove, clear, open, close])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}