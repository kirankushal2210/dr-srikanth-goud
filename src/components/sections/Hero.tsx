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
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-transparent pt-12 pb-16 text-[#172554] lg:pt-16 lg:pb-20"
    >
      {/* Directional Horizontal Scrim Overlay (Guarantees 100% WCAG AAA contrast against dark yellow canvas) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#ECC224]/95 via-[#ECC224]/85 via-50% to-transparent"
        aria-hidden="true"
      />

      {/* Gentle ambient lighting in TRS Gold & Royal Blue */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_85%_35%,rgba(245,198,25,0.25),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(30,58,138,0.1),transparent_50%)]"
        aria-hidden="true"
      />

      {/* 2-Column Split Architecture */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-16">
        {/* Left Column (lg:col-span-7) */}
        <div className="min-w-0 lg:col-span-7">
          <motion.div {...fade(0)} className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full bg-[#15803D] px-3.5 py-1.5 text-xs font-bold tracking-wider text-white shadow-md border border-[#F5C619]"
              data-testid="text-hero-pill"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#F5C619]" aria-hidden="true" />
              TELANGANA RAKSHANA SENA • SINCE 2001
            </span>

            {/* Clearly Visible TRS Flag Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E3A8A] bg-white px-3 py-1 shadow-md">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/trs-official-flag.png`}
                alt="TRS Flag"
                className="h-5 w-auto rounded object-contain"
              />
              <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">Official Party Flag</span>
            </div>
          </motion.div>

          <motion.div {...fade(0.08)} className="mt-5">
            <h1 data-testid="text-hero-name" className="leading-[1.04] tracking-tight">
              <span className="block font-serif text-2xl italic text-[#172554] sm:text-3xl lg:text-4xl">
                Dr. Nalamasa
              </span>
              <span className="mt-1 block font-serif text-4xl font-bold tracking-tight text-[#1E3A8A] sm:text-6xl lg:text-7xl">
                Srikanth Goud
              </span>
            </h1>
            <p lang="te" className="mt-2 text-base font-bold text-[#15803D] sm:text-lg">
              {leaderProfile.nameTe}
            </p>
          </motion.div>

          <motion.p
            {...fade(0.18)}
            className="mt-4 max-w-xl font-serif text-xl font-bold leading-snug text-[#172554] sm:text-2xl"
          >
            Grassroots Leader, Consumer Rights Crusader, and Voice of Telangana's Youth &amp; OBC Rights.
          </motion.p>

          <motion.p
            {...fade(0.24)}
            className="mt-3 max-w-lg border-l-4 border-[#1E3A8A] pl-4 text-sm leading-relaxed text-[#172554] sm:text-base font-semibold"
          >
            From Kakatiya University student barricades to National Chairman of World Consumer Rights and District Incharge of Mahabubabad—combining educational clarity with fearless public representation.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-7">
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#association"
                data-testid="button-kavitha-association"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#F5C619] bg-[#1E3A8A] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#172554] hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-[#F5C619]" aria-hidden="true" />
                Kavitha Association <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#journey"
                data-testid="button-explore-journey"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E3A8A] bg-white px-5 py-3 text-sm font-bold text-[#172554] shadow-md transition hover:bg-[#172554] hover:text-white"
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
                <ShieldCheck className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
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
                className="rounded-xl border-2 border-[#1E3A8A]/30 bg-white/95 p-3.5 shadow-md transition hover:bg-white hover:shadow-lg hover:border-[#1E3A8A]"
                data-testid={`stat-${i}`}
              >
                <p className="font-serif text-2xl font-bold text-[#1E3A8A] sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs font-bold leading-tight text-stone-800">{m.label}</p>
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
              className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#F5C619]/40 via-[#1E3A8A]/20 to-transparent blur-2xl"
              aria-hidden="true"
            />

            {/* Framed Subject Canvas */}
            <div className="relative overflow-hidden rounded-3xl border-3 border-[#1E3A8A] bg-white p-2 shadow-2xl">
              {/* Clearly Visible Official TRS Flag Crest Badge Top Right */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2.5 rounded-xl border-2 border-[#1E3A8A] bg-white/95 p-2 shadow-xl backdrop-blur-md">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/trs-official-flag.png`}
                  alt="TRS Official Flag"
                  className="h-11 w-auto rounded object-contain shadow-xs"
                />
                <div className="pr-1 text-left leading-tight">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#15803D]">TRS Flag</span>
                  <span lang="te" className="block text-xs font-bold text-[#172554]">తెలంగాణ రక్షణ సేన</span>
                </div>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-200">
                <img
                  src={`${import.meta.env.BASE_URL}hero-bg.png`}
                  alt="Dr. Nalamasa Srikanth Goud - TRS State Official Spokesperson & Mahabubabad Incharge"
                  className="h-full w-full object-cover object-[center_20%] select-none"
                  fetchPriority="high"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#172554]/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Floating Leadership Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-[#F5C619] bg-[#1E3A8A]/95 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#F5C619]" aria-hidden="true" />
                  <span>State Official Spokesperson, TRS</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#15803D] bg-white/95 px-3.5 py-2 text-xs font-bold text-[#172554] shadow-md backdrop-blur-md">
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
