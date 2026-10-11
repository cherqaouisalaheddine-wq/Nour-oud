'use client'

import { MessageCircle, ShieldCheck, Truck, Wallet } from 'lucide-react'
import { benefitMeta } from '@/lib/site'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/components/i18n/locale-provider'

/** Icons are declared as keys in site.ts, so they need an explicit map. */
const ICONS = {
  Truck,
  Wallet,
  ShieldCheck,
  MessageCircle,
} as const

export function WhyNourElOud() {
  const { dict } = useI18n()

  return (
    <section id="avantages" className="bg-[var(--bone-deep)] px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-center">{dict.why.eyebrow}</p>
          <h2 className="section-title mx-auto mt-4 max-w-xl text-center">
            {dict.why.title}
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-px bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {benefitMeta.map((benefit, index) => {
            const Icon = ICONS[benefit.icon as keyof typeof ICONS]
            const copy = dict.why.items[benefit.key]
            return (
              <Reveal as="li" key={benefit.key} delay={index * 80}>
                <div className="flex h-full flex-col bg-[var(--bone)] px-7 py-10">
                  <Icon
                    className="size-6 text-[var(--champagne)]"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl leading-snug">
                    {copy.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-[var(--ink-muted)]">
                    {copy.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
