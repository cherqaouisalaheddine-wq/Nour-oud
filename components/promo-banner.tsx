'use client'

import { Check } from 'lucide-react'
import { promoMeta } from '@/lib/site'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

export function PromoBanner() {
  const { dict } = useI18n()

  return (
    <section id="nouveautes" className="bg-[var(--bone)] px-5 pb-20 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid overflow-hidden bg-[var(--ink)] lg:grid-cols-2">
            <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[30rem]">
              <img
                src="/products/manasik-oud-amber-noir.jpg"
                alt={dict.promo.imageAlt}
                loading="lazy"
                className="size-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--ink)]/25"
              />
              {/* Oversized discount, treated as a graphic element. */}
              <p
                aria-hidden="true"
                className="absolute bottom-0 start-4 font-[family-name:var(--font-display)] text-[7rem] leading-[0.8] font-light text-[var(--bone)]/12 select-none lg:text-[10rem]"
              >
                {promoMeta.discount}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-6 p-8 lg:p-16">
              <p className="eyebrow">{dict.promo.eyebrow}</p>

              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-light text-[var(--bone)]">
                {dict.promo.title}
              </h2>

              <p className="max-w-md text-sm leading-[1.9] text-[var(--bone)]/65">
                {dict.promo.description}
              </p>

              <ul className="flex flex-col gap-2.5">
                {dict.promo.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-sm text-[var(--bone)]/75">
                    <Check
                      className="size-3.5 shrink-0 text-[var(--champagne)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <a href="#collection" className="btn-bone">
                  {dict.promo.cta}
                </a>
                <p className="text-xs tracking-[0.14em] uppercase text-[var(--bone)]/50">
                  {dict.promo.codeLabel}{' '}
                  <span className="text-[var(--champagne)]">{promoMeta.code}</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
