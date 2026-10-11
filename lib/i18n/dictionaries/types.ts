import type { fr } from '@/lib/i18n/dictionaries/fr'

/**
 * The dictionary contract, derived from the French source of truth. Every
 * locale must resolve to this exact shape, which turns a missing translation
 * into a compile-time error rather than a runtime fallback.
 */
export type Dictionary = typeof fr
