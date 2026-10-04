'use client'

import { ArrowDown } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[calc(100svh-6.5rem)] items-end overflow-hidden bg-[var(--ink)]"
    >
      {/* Product visual */}
      <img
        src="/oud-hero.png"
        alt="Flacon de parfum Oudia entouré de bois précieux"
        className="absolute inset-0 size-full object-cover"
      />
      {/* Two-stop scrim: legibility at the copy, atmosphere at the top. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/45 to-[var(--ink)]/25"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow animate-rise [animation-delay:80ms]">
            Maison de parfum · Casablanca
          </p>

          <h1
            className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3rem,11vw,7.5rem)] leading-[0.92] font-light tracking-[-0.03em] text-[var(--bone)] animate-rise [animation-delay:180ms]"
          >
            L&apos;essence
            <br />
            de l&apos;élégance.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-[var(--bone)]/75 animate-rise [animation-delay:300ms] lg:text-lg">
            Découvrez une collection de parfums pensée pour révéler votre
            signature.
          </p>

          <div className="mt-10 flex flex-col gap-3 animate-rise [animation-delay:420ms] sm:flex-row sm:items-center">
            <a href="#collection" className="btn-bone">
              Découvrir la collection
            </a>
            <a href="#nouveautes" className="btn-outline-bone">
              Voir les nouveautés
            </a>
          </div>
        </div>

        {/* Signature strip pinned to the bottom of the hero */}
        <div className="mt-16 flex items-end justify-between gap-6 border-t border-[var(--bone)]/15 pt-6 animate-rise [animation-delay:560ms] lg:mt-24">
          <div>
            <p className="text-[0.5625rem] tracking-[0.24em] uppercase text-[var(--bone)]/50">
              Édition signature
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--bone)] lg:text-3xl">
              Oud Royale
            </p>
          </div>

          <a
            href="#histoire"
            aria-label="Découvrir la maison"
            className="hidden size-12 shrink-0 items-center justify-center border border-[var(--bone)]/25 text-[var(--bone)]/70 transition-colors duration-500 hover:border-[var(--bone)] hover:text-[var(--bone)] sm:flex"
          >
            <ArrowDown className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}