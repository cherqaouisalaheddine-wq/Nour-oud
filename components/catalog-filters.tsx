'use client'

import type { Availability, FamilyFilter, GenderFilter, PriceBand } from '@/lib/products'
import {
  availabilityFilters,
  familyFilters,
  genderFilters,
  priceBandFilters,
} from '@/lib/products'
import { useI18n } from '@/components/i18n/locale-provider'

/** Sentinel for "all brands". A real brand is never an empty string. */
export const ALL_BRANDS = ''

type SelectOption = { value: string; label: string }

/** A controlled filter slot: present only when the page offers that filter. */
type Slot<T> = { value: T; onChange: (value: T) => void }

type CatalogFiltersProps = {
  gender?: Slot<GenderFilter>
  family?: Slot<FamilyFilter>
  priceBand?: Slot<PriceBand>
  brand?: Slot<string> & { options: string[] }
  availability?: Slot<Availability>
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
}) {
  return (
    <label className="flex items-baseline gap-2 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--ink-muted)]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-[var(--hairline)] bg-[var(--bone)] px-3 py-2 text-xs tracking-wide text-[var(--ink)] outline-none transition-colors duration-400 focus:border-[var(--ink)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

/**
 * Shared catalogue filter bar.
 *
 * Every filter is optional: a page passes only the slots that make sense for
 * its slice, so the Arabic & oud line never shows a brand selector it cannot
 * populate, and a gender page never shows a redundant gender selector.
 */
export function CatalogFilters({
  gender,
  family,
  priceBand,
  brand,
  availability,
}: CatalogFiltersProps) {
  const { dict } = useI18n()

  const hasBrands = Boolean(brand && brand.options.length > 0)

  return (
    <div className="flex flex-col gap-4 border-y border-[var(--hairline)] py-5 lg:flex-row lg:items-center lg:justify-between">
      {gender ? (
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          role="group"
          aria-label={dict.collection.genderAria}
        >
          {genderFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => gender.onChange(option)}
              aria-pressed={gender.value === option}
              className={`shrink-0 border px-5 py-2.5 text-[0.6875rem] font-medium tracking-[0.12em] uppercase transition-colors duration-400 ${
                gender.value === option
                  ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bone)]'
                  : 'border-[var(--hairline)] hover:border-[var(--ink)]'
              }`}
            >
              {dict.filters.gender[option]}
            </button>
          ))}
        </div>
      ) : (
        <span aria-hidden="true" />
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {family && (
          <FilterSelect
            label={dict.filters.labels.type}
            value={family.value}
            onChange={(value) => family.onChange(value as FamilyFilter)}
            options={familyFilters.map((option) => ({
              value: option,
              label: dict.filters.family[option],
            }))}
          />
        )}
        {priceBand && (
          <FilterSelect
            label={dict.filters.labels.price}
            value={priceBand.value}
            onChange={(value) => priceBand.onChange(value as PriceBand)}
            options={priceBandFilters.map((option) => ({
              value: option,
              label: dict.filters.price[option],
            }))}
          />
        )}
        {brand && hasBrands && (
          <FilterSelect
            label={dict.filters.labels.brand}
            value={brand.value}
            onChange={brand.onChange}
            options={[
              { value: ALL_BRANDS, label: dict.filters.brand.all },
              ...brand.options.map((option) => ({ value: option, label: option })),
            ]}
          />
        )}
        {availability && (
          <FilterSelect
            label={dict.filters.labels.availability}
            value={availability.value}
            onChange={(value) => availability.onChange(value as Availability)}
            options={availabilityFilters.map((option) => ({
              value: option,
              label: dict.filters.availability[option],
            }))}
          />
        )}
      </div>
    </div>
  )
}
