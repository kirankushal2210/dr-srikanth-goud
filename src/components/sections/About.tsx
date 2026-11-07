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
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden border-t border-[#DFD8CB]/60 bg-transparent py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(202,138,4,0.10),transparent_65%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Rise className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">
            <Sprout className="h-4 w-4" aria-hidden />
            ROOTED IN TELANGANA SOIL
          </p>
          <h2 id="about-heading" className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-[#15241D] md:text-[3.4rem]">
            From Student Agitator to <span className="italic text-[#0284C7]">Academic &amp; Statesman</span>
          </h2>
        </Rise>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* LEFT */}
          <div className="min-w-0">
            <Rise>
              <h3 className="flex items-baseline gap-3 font-display text-2xl font-semibold text-[#15241D]">
                <span className="font-display text-sm font-bold text-[#B45309]">I.</span> Academic Rigor &amp; Roots
              </h3>
            </Rise>

            <Rise delay={0.05}>
              <article className="mt-6 rounded-2xl border border-[#DFD8CB] bg-white p-6 shadow-xs" data-testid="card-birth-heritage">
                <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#B45309]">Birth &amp; Heritage</h4>
                <p className="mt-3 font-display text-xl leading-snug text-[#15241D]">
                  Born 12 December 1986 in Mahabubabad; Son of Shri Nalamasa Yakaiah &amp; Smt. Aruna.
                </p>
              </article>
            </Rise>

            <Rise delay={0.1}>
              <h4 className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-[#B45309]">Education Path</h4>
              <ol className="relative mt-5 space-y-5 border-l border-[#CA8A04]/40 pl-6">
                {EDUCATION.map((e, i) => (
                  <li key={e} className="relative" data-testid={`text-education-${i}`}>
                    <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-[#CA8A04] bg-[#FFFFFF]" aria-hidden />
                    <span className="text-[#15241D]">{e}</span>
                  </li>
                ))}
                <li className="relative">
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-[#14532D]" aria-hidden />
                  <span className="font-semibold text-[#A16207]">Doctorate, {leaderProfile.almaMater}</span>
                </li>
              </ol>
            </Rise>

            <Rise delay={0.15}>
              <figure className="mt-10 overflow-hidden rounded-2xl border border-[#CA8A04]/50 bg-[#f7f3ea] text-[#1e293b]" data-testid="card-phd">
                <img
                  src={`${import.meta.env.BASE_URL}activities/page3_phd.jpg`}
                  alt="Doctoral thesis presentation to Smt. Kalvakuntla Kavitha"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="p-6">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#A16207]">
                    <GraduationCap className="h-4 w-4" aria-hidden /> Ph.D. &middot; Kakatiya University
                  </p>
                  <p className="mt-3 leading-relaxed text-[#334155]">
                    Earned his Doctorate from Kakatiya University and formally presented his thesis to Smt. Kalvakuntla Kavitha.
                  </p>
                  <p className="mt-4 border-l-2 border-[#CA8A04] pl-4 font-display text-lg italic text-[#1e293b]">
                    Education gives clarity to leadership.
                  </p>
                </figcaption>
              </figure>
            </Rise>
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <Rise>
              <h3 className="flex items-baseline gap-3 font-display text-2xl font-semibold text-[#15241D]">
                <span className="font-display text-sm font-bold text-[#B45309]">II.</span> Core Tenets
              </h3>
            </Rise>
            <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[#DFD8CB] bg-[#CA8A04]/30 sm:grid-cols-2">
              {TENETS.map((t, i) => (
                <li key={t.title} className="bg-white" data-testid={`card-tenet-${i}`}>
                  <Rise delay={0.06 * i} className="group h-full p-7 transition-colors hover:bg-[#FAF8F5]">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-5xl font-semibold leading-none text-[#CA8A04]/40 transition-colors group-hover:text-[#B45309]" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <t.icon className="h-6 w-6 text-[#B45309]" aria-hidden />
                    </div>
                    <h4 className="mt-8 font-display text-xl font-semibold text-[#15241D]">{t.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-stone-700">{t.desc}</p>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.1}>
              <div className="mt-10 rounded-2xl border border-[#DFD8CB] bg-white p-6 shadow-xs">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B45309]">
                  <BookOpen className="h-4 w-4" aria-hidden /> Present Responsibilities
                </h4>
                <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2" aria-label="Leadership roles">
                  {leaderProfile.titles.map((title, i) => (
                    <li key={title} className="flex gap-3 text-sm text-[#15241D]" data-testid={`text-role-${i}`}>
                      <span className="mt-2 h-1 w-3 shrink-0 bg-[#14532D]" aria-hidden />
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
        <figure className="bg-[#e7e1d3] text-[#1e293b]" data-testid="quote-about">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:px-8 lg:py-20">
            <Quote className="h-12 w-12 text-[#A16207]" aria-hidden />
            <blockquote>
              <p className="font-display text-2xl leading-snug sm:text-3xl lg:text-[2.6rem] lg:leading-[1.2]">
                True leadership is not marked by positions held in calm waters, but by standing steadfast with the people through their fiercest struggles.
              </p>
            </blockquote>
            <figcaption className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A16207] md:col-start-2">{leaderProfile.name}</figcaption>
          </div>
        </figure>
      </Rise>
    </section>
  );
}
