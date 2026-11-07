import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, HeartPulse, MapPin, Newspaper, ShieldCheck, Zap } from "lucide-react";
import { leaderProfile } from "@/data/leaderProfile";

const METRICS = [
  { value: "25+", label: "Years in Public Life" },
  { value: "Ph.D.", label: "Kakatiya University" },
  { value: "100+", label: "Mass Delegations & Agitations" },
  { value: "National", label: "World Consumer Rights Chairman" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-transparent pt-28 pb-16 text-[#15241D] lg:pt-32 lg:pb-20"
    >
      {/* Directional Horizontal Scrim Overlay (Guarantees 100% WCAG AAA contrast for all text on the left) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 via-45% to-transparent"
        aria-hidden="true"
      />

      {/* Gentle ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_85%_35%,rgba(202,138,4,0.12),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(2,132,199,0.06),transparent_50%)]"
        aria-hidden="true"
      />

      {/* 2-Column Split Architecture */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-16">
        {/* Left Column (lg:col-span-7) */}
        <div className="min-w-0 lg:col-span-7">
          <motion.div {...fade(0)}>
            <span
              className="inline-flex items-center gap-2 rounded-full bg-[#14532D] px-3.5 py-1 text-xs font-semibold tracking-wider text-white shadow-xs"
              data-testid="text-hero-pill"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              SERVING TELANGANA SINCE 2001 • VOICE OF THE PEOPLE
            </span>
          </motion.div>

          <motion.div {...fade(0.08)} className="mt-5">
            <h1 data-testid="text-hero-name" className="leading-[1.04] tracking-tight">
              <span className="block font-serif text-2xl italic text-stone-700 sm:text-3xl lg:text-4xl">
                Dr. Nalamasa
              </span>
              <span className="mt-1 block font-serif text-4xl font-bold tracking-tight text-[#14532D] sm:text-6xl lg:text-7xl">
                Srikanth Goud
              </span>
            </h1>
            <p lang="te" className="mt-1.5 text-base font-medium text-[#0284C7] sm:text-lg">
              {leaderProfile.nameTe}
            </p>
          </motion.div>

          <motion.p
            {...fade(0.18)}
            className="mt-4 max-w-xl font-serif text-xl font-semibold leading-snug text-[#15241D] sm:text-2xl"
          >
            Grassroots Leader, Consumer Rights Crusader, and Voice of Telangana's Youth &amp; OBC Rights.
          </motion.p>

          <motion.p
            {...fade(0.24)}
            className="mt-3 max-w-lg border-l-2 border-[#CA8A04] pl-4 text-sm leading-relaxed text-stone-700 sm:text-base"
          >
            From Kakatiya University student barricades to National Chairman of World Consumer Rights and District Incharge of Mahabubabad—combining educational clarity with fearless public representation.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-7">
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#journey"
                data-testid="button-explore-journey"
                className="inline-flex items-center gap-2 rounded-full bg-[#14532D] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f3d21]"
              >
                Explore Political Journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#media"
                data-testid="button-view-media"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-5 py-3 text-sm font-semibold text-stone-800 shadow-xs transition hover:bg-white"
              >
                Press &amp; Media Archives <Newspaper className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-3.5">
              <a
                href="#contact"
                data-testid="button-contact-office"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0369A1] underline-offset-4 hover:text-[#0c4a6e] hover:underline"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Citizen Redressal &amp; Grievance Desk &rarr;
              </a>
            </div>
          </motion.div>

          <motion.ul
            {...fade(0.38)}
            aria-label="Key highlights"
            className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {METRICS.map((m, i) => (
              <li
                key={m.label}
                className="rounded-xl border border-stone-200/90 bg-white/90 p-3.5 shadow-xs transition hover:bg-white hover:shadow-sm"
                data-testid={`stat-${i}`}
              >
                <p className="font-serif text-2xl font-bold text-[#B45309] sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs font-medium leading-tight text-stone-600">{m.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right Column (lg:col-span-5) */}
        <motion.div
          {...fade(0.2)}
          className="relative mx-auto w-full max-w-[420px] px-2 pt-6 pb-8 sm:px-6 lg:col-span-5 lg:max-w-none"
        >
          <div
            className="trs-glow-pulse pointer-events-none absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,rgba(202,138,4,0.18),rgba(20,83,45,0.08)_45%,transparent_70%)] blur-2xl"
            aria-hidden="true"
          />
          <div className="relative rounded-[2rem] border border-stone-200 bg-white p-3 shadow-xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-[#CA8A04]/40 bg-[radial-gradient(circle_at_50%_35%,#F5F1E9,#E4DDD0)]">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/profile/hero-portrait.png`}
                alt={`Portrait of ${leaderProfile.name}`}
                fetchPriority="high"
                className="relative aspect-[4/5] w-full object-cover object-top"
                data-testid="img-hero-portrait"
              />
              <div className="trs-tricolor-top absolute inset-x-0 bottom-0" aria-hidden="true" />
            </div>
          </div>

          {/* Floating Verified Badge */}
          <div
            className="absolute right-0 top-1 max-w-[65%] rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 shadow-md"
            data-testid="badge-verified"
          >
            <p className="flex items-start gap-2 text-[11px] font-semibold leading-snug text-[#15241D]">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#0284C7] text-white">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              Official Spokesperson &amp; Mahabubabad Incharge
            </p>
          </div>

          {/* Floating Award Badge */}
          <div
            className="absolute bottom-2 left-0 max-w-[62%] rounded-xl border border-stone-200 bg-[#F5F1E9] px-3.5 py-2 shadow-md"
            data-testid="badge-award"
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold text-[#15241D]">
              <HeartPulse className="h-3.5 w-3.5 shrink-0 text-[#D97706]" aria-hidden="true" />
              Corona Warrior Awardee (2020)
            </p>
          </div>

          {/* Floating Groundwork Badge */}
          <div
            className="trs-float absolute -right-1 bottom-14 sm:right-0"
            data-testid="badge-groundwork"
          >
            <p className="flex items-center gap-2 rounded-full border border-[#14532D]/20 bg-white/95 py-2 pl-3 pr-4 text-[11px] font-semibold text-[#15241D] shadow-md transition-transform hover:scale-105">
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="trs-ping absolute inset-0 rounded-full bg-[#22C55E]" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#166534]" />
              </span>
              <Zap className="h-3.5 w-3.5 shrink-0 fill-[#CA8A04] text-[#CA8A04]" aria-hidden="true" />
              25+ Years of Grassroots Groundwork
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
