import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, GraduationCap, Landmark, Megaphone, Quote, Scale, Sprout, Users } from "lucide-react";
import { leaderProfile } from "@/data/leaderProfile";

const EDUCATION = [
  "Schooling at Vidya Bharathi Gurukula Pathashala",
  "Intermediate & Degree at Vignana Bharathi Institutions",
  "Master\u2019s in Tourism Management (KU)",
];

const TENETS = [
  { title: "Self-Respect & Statehood", desc: "Frontline student fighter in the 2004\u20132014 Telangana statehood movement.", icon: Landmark },
  { title: "Cadre Architecture", desc: "Renowned organizer who mentored hundreds of student leaders across Warangal, Armur, and Balkonda.", icon: Users },
  { title: "Constitutional Reservations", desc: "Advocate for OBC rights, conducting sit-ins and representations at HCU and state universities.", icon: Scale },
  { title: "Consumer Advocacy", desc: "Pioneer in organizing public grievance networks against black marketing and substandard pricing.", icon: Megaphone },
];

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden border-t-2 border-[#F3BA16]/40 bg-transparent py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(243,186,22,0.12),transparent_65%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Rise className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#15803D]">
            <Sprout className="h-4 w-4 text-[#15803D]" aria-hidden />
            ROOTED IN TELANGANA SOIL
          </p>
          <h2 id="about-heading" className="mt-4 font-display text-4xl font-bold leading-[1.08] text-[#172554] md:text-[3.4rem]">
            From Student Agitator to <span className="italic text-[#1E3A8A] underline decoration-[#F3BA16] decoration-4 underline-offset-8">Academic &amp; Statesman</span>
          </h2>
        </Rise>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* LEFT */}
          <div className="min-w-0">
            <Rise>
              <h3 className="flex items-baseline gap-3 font-display text-2xl font-bold text-[#172554]">
                <span className="font-display text-sm font-bold text-[#F3BA16]">I.</span> Academic Rigor &amp; Roots
              </h3>
            </Rise>

            <Rise delay={0.05}>
              <article className="mt-6 rounded-2xl border-2 border-[#F3BA16]/50 bg-white p-6 shadow-md" data-testid="card-birth-heritage">
                <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#15803D]">Birth &amp; Heritage</h4>
                <p className="mt-3 font-display text-xl font-bold leading-snug text-[#172554]">
                  Born 12 December 1986 in Mahabubabad; Son of Shri Nalamasa Yakaiah &amp; Smt. Aruna.
                </p>
              </article>
            </Rise>

            <Rise delay={0.1}>
              <h4 className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-[#15803D]">Education Path</h4>
              <ol className="relative mt-5 space-y-5 border-l-2 border-[#F3BA16] pl-6">
                {EDUCATION.map((e, i) => (
                  <li key={e} className="relative" data-testid={`text-education-${i}`}>
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-[#F3BA16] bg-white" aria-hidden />
                    <span className="font-medium text-stone-800">{e}</span>
                  </li>
                ))}
                <li className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-[#15803D]" aria-hidden />
                  <span className="font-bold text-[#1E3A8A]">Doctorate, {leaderProfile.almaMater}</span>
                </li>
              </ol>
            </Rise>

            <Rise delay={0.15}>
              <figure className="mt-10 overflow-hidden rounded-2xl border-2 border-[#F3BA16]/50 bg-white shadow-lg text-[#1e293b]" data-testid="card-phd">
                <img
                  src={`${import.meta.env.BASE_URL}activities/page3_phd.jpg`}
                  alt="Doctoral thesis presentation to Smt. Kalvakuntla Kavitha"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="p-6">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#15803D]">
                    <GraduationCap className="h-4 w-4" aria-hidden /> Ph.D. &middot; Kakatiya University
                  </p>
                  <p className="mt-3 leading-relaxed text-[#172554] font-medium">
                    Earned his Doctorate from Kakatiya University and formally presented his thesis to Smt. Kalvakuntla Kavitha.
                  </p>
                  <p className="mt-4 border-l-3 border-[#F3BA16] pl-4 font-display text-lg italic text-[#172554] font-semibold">
                    “Education gives clarity to leadership.”
                  </p>
                </figcaption>
              </figure>
            </Rise>
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <Rise>
              <h3 className="flex items-baseline gap-3 font-display text-2xl font-bold text-[#172554]">
                <span className="font-display text-sm font-bold text-[#F3BA16]">II.</span> Core Tenets
              </h3>
            </Rise>
            <ol className="mt-6 grid gap-4 overflow-hidden sm:grid-cols-2">
              {TENETS.map((t, i) => (
                <li key={t.title} className="rounded-2xl border-2 border-[#F3BA16]/50 bg-white shadow-md transition-all duration-300 hover:border-[#1E3A8A] hover:shadow-xl" data-testid={`card-tenet-${i}`}>
                  <Rise delay={0.06 * i} className="group h-full p-6">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-4xl font-bold leading-none text-[#F3BA16] transition-colors group-hover:text-[#1E3A8A]" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1E3A8A] text-[#F3BA16]">
                        <t.icon className="h-5 w-5" aria-hidden />
                      </div>
                    </div>
                    <h4 className="mt-6 font-display text-xl font-bold text-[#172554]">{t.title}</h4>
                    <p className="mt-2.5 text-sm font-medium leading-relaxed text-stone-700">{t.desc}</p>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.1}>
              <div className="mt-10 rounded-2xl border-2 border-[#F3BA16] bg-[#1E3A8A] p-7 text-white shadow-xl">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#F3BA16]">
                  <BookOpen className="h-4 w-4" aria-hidden /> Present Responsibilities
                </h4>
                <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2" aria-label="Leadership roles">
                  {leaderProfile.titles.map((title, i) => (
                    <li key={title} className="flex gap-3 text-sm font-semibold text-blue-50" data-testid={`text-role-${i}`}>
                      <span className="mt-2 h-1.5 w-3 shrink-0 rounded bg-[#F3BA16]" aria-hidden />
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          </div>
        </div>
      </div>

      <Rise className="relative mt-20 lg:mt-28">
        <figure className="border-y-4 border-[#F3BA16] bg-[#172554] text-white shadow-2xl" data-testid="quote-about">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:px-8 lg:py-20">
            <Quote className="h-12 w-12 text-[#F3BA16]" aria-hidden />
            <blockquote>
              <p className="font-display text-2xl font-bold leading-snug sm:text-3xl lg:text-[2.5rem] lg:leading-[1.2] text-white">
                “True leadership is not marked by positions held in calm waters, but by standing steadfast with the people through their fiercest struggles.”
              </p>
            </blockquote>
            <figcaption className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3BA16] md:col-start-2">
              — Dr. Nalamasa Srikanth Goud, Ph.D.
            </figcaption>
          </div>
        </figure>
      </Rise>
    </section>
  );
}
