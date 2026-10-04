'use client'

import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/site'
import { Reveal } from '@/components/reveal'

const PILLARS = [
  {
    number: '01',
    title: 'Des matières premières nobles',
    text: "L'oud de Mysore, l'ambre suifé et le musc blanc sont sélectionnés chez des producteurs partenaires, jamais reconstitués.",
  },
  {
    number: '02',
    title: 'Un rituel sur mesure',
    text: "Besoin d'aide pour choisir ? Notre équipe vous guide par WhatsApp, simplement et sans engagement.",
  },
  {
    number: '03',
    title: 'Assemblé au Maroc',
    text: 'Nos flacons sont finis et contrôlés à Casablanca, puis garantis à vie par la maison.',
  },
]

export function BrandStory() {
  return (
    <section
      id="histoire"
      className="bg-[var(--bone)] px-5 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Editorial image stack */}
          <Reveal className="relative">
            <div className="aspect-4/5 overflow-hidden bg-[var(--bone-deep)]">
              <img
                src="/products/makhsouse-oud.jpg"
                alt="Flacon Makhsouse Oud, pièce signature de la maison Oudia"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            {/* Offset accent panel, hidden on small screens to avoid clutter. */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -bottom-4 -z-10 hidden h-2/3 w-1/2 border border-[var(--champagne)]/40 lg:block"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">L&apos;art du parfum</p>
              <h2 className="section-title mt-4 max-w-md">
                Un parfum ne se porte pas. Il se <em className="font-light italic">reconnaît</em>.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 space-y-4 text-sm leading-[1.9] text-[var(--ink-muted)]">
                <p>
                  Oudia est née d&apos;une conviction simple : un bon parfum ne
                  se remarque pas, il se retient. Il accompagne celui qui le
                  porte et révèle ce qu&apos;il ne dit pas.
                </p>
                <p>
                  De l&apos;oud fumé de Mysore au musc blanc de Cachemire, chaque
                  composition est construite autour d&apos;une matière noble,
                  équilibrée pour tenir sur la peau du matin jusqu&apos;à la
                  nuit.
                </p>
              </div>
            </Reveal>

            <dl className="mt-10 flex flex-col">
              {PILLARS.map((pillar, index) => (
                <Reveal key={pillar.number} delay={160 + index * 90}>
                  <div className="flex gap-6 border-t border-[var(--hairline)] py-6">
                    <dt className="font-[family-name:var(--font-display)] text-sm text-[var(--champagne)] tabular-nums">
                      {pillar.number}
                    </dt>
                    <dd>
                      <h3 className="font-[family-name:var(--font-display)] text-xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-muted)]">
                        {pillar.text}
                      </p>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={420}>
              <a
                href={whatsappLink(
                  'Bonjour, je voudrais des conseils pour choisir un parfum.',
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-8"
              >
                <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Parler à un conseiller
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}