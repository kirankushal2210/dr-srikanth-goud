import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Check, HeartPulse, MapPin, Newspaper, ShieldCheck, Sparkles, Zap } from "lucide-react";
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
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-transparent pt-12 pb-16 text-[#15241D] lg:pt-16 lg:pb-20"
    >
      {/* Directional Horizontal Scrim Overlay (Guarantees 100% WCAG AAA contrast for all text on the left) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#FAF2DC] via-[#FAF2DC]/92 via-45% to-transparent"
        aria-hidden="true"
      />

      {/* Gentle ambient lighting in TRS Gold & Royal Blue */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_85%_35%,rgba(243,186,22,0.18),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(30,58,138,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      {/* 2-Column Split Architecture */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-16">
        {/* Left Column (lg:col-span-7) */}
        <div className="min-w-0 lg:col-span-7">
          <motion.div {...fade(0)}>
            <span
              className="inline-flex items-center gap-2 rounded-full bg-[#15803D] px-3.5 py-1 text-xs font-bold tracking-wider text-white shadow-sm"
              data-testid="text-hero-pill"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              TELANGANA RAKSHANA SENA • SERVING PEOPLE SINCE 2001
            </span>
          </motion.div>

          <motion.div {...fade(0.08)} className="mt-5">
            <h1 data-testid="text-hero-name" className="leading-[1.04] tracking-tight">
              <span className="block font-serif text-2xl italic text-stone-800 sm:text-3xl lg:text-4xl">
                Dr. Nalamasa
              </span>
              <span className="mt-1 block font-serif text-4xl font-bold tracking-tight text-[#1E3A8A] sm:text-6xl lg:text-7xl">
                Srikanth Goud
              </span>
            </h1>
            <p lang="te" className="mt-2 text-base font-semibold text-[#172554] sm:text-lg">
              {leaderProfile.nameTe}
            </p>
          </motion.div>

          <motion.p
            {...fade(0.18)}
            className="mt-4 max-w-xl font-serif text-xl font-semibold leading-snug text-[#172554] sm:text-2xl"
          >
            Grassroots Leader, Consumer Rights Crusader, and Voice of Telangana's Youth &amp; OBC Rights.
          </motion.p>

          <motion.p
            {...fade(0.24)}
            className="mt-3 max-w-lg border-l-3 border-[#F3BA16] pl-4 text-sm leading-relaxed text-stone-800 sm:text-base font-medium"
          >
            From Kakatiya University student barricades to National Chairman of World Consumer Rights and District Incharge of Mahabubabad—combining educational clarity with fearless public representation.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-7">
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#association"
                data-testid="button-kavitha-association"
                className="inline-flex items-center gap-2 rounded-full border border-[#F3BA16]/50 bg-[#1E3A8A] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#172554] hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-[#F3BA16]" aria-hidden="true" />
                Kavitha Association <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#journey"
                data-testid="button-explore-journey"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E3A8A]/30 bg-white/95 px-5 py-3 text-sm font-bold text-[#172554] shadow-xs transition hover:bg-white hover:border-[#1E3A8A]"
              >
                Political Journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-3.5">
              <a
                href="#contact"
                data-testid="button-contact-office"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] underline-offset-4 hover:text-[#172554] hover:underline"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
                Citizen Redressal &amp; Representation Desk &rarr;
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
                className="rounded-xl border border-[#F3BA16]/40 bg-white/95 p-3.5 shadow-sm transition hover:bg-white hover:shadow-md hover:border-[#F3BA16]"
                data-testid={`stat-${i}`}
              >
                <p className="font-serif text-2xl font-bold text-[#1E3A8A] sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs font-semibold leading-tight text-stone-700">{m.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right Column (lg:col-span-5) */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md lg:max-w-none"
          >
            {/* Luminous Glow Backdrop */}
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#F3BA16]/25 via-[#1E3A8A]/15 to-transparent blur-2xl"
              aria-hidden="true"
            />

            {/* Framed Subject Canvas */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#F3BA16]/50 bg-gradient-to-b from-white/60 to-white/20 p-2 shadow-2xl backdrop-blur-xs">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-200">
                <img
                  src={`${import.meta.env.BASE_URL}hero-bg.png`}
                  alt="Dr. Nalamasa Srikanth Goud - TRS State Official Spokesperson & Mahabubabad Incharge"
                  className="h-full w-full object-cover object-[center_20%] select-none"
                  fetchPriority="high"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#172554]/60 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Floating Leadership Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-[#F3BA16] bg-[#1E3A8A]/95 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#F3BA16]" aria-hidden="true" />
                  <span>State Official Spokesperson, TRS</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#15803D]/40 bg-white/95 px-3.5 py-2 text-xs font-bold text-[#172554] shadow-md backdrop-blur-md">
                  <Award className="h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>National Chairman, World Consumer Rights</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
