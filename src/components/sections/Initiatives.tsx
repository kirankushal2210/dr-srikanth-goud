import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Megaphone,
  Scale,
  ShieldAlert,
  Sprout,
  Briefcase,
  Sparkles,
} from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const CASES = [
  {
    title: "TGPSC Group-I Examination Transparency & Gun Park Agitation",
    icon: ShieldAlert,
    tag: "Youth & recruitment",
    context: "Organized massive demonstrations protesting exam irregularities, paper leaks, and demanding strict adherence to the Presidential Order.",
    consequence: "Detained and held in police custody across Nampally, Gandhi Nagar, and Afzal Gunj stations for defending youth rights.",
    photo: { src: `${BASE}activities/page10_police_arrest.jpg`, alt: "Dr. Srikanth Goud being detained by police during the TGPSC Group-I agitation" },
  },
  {
    title: "HCU Satyagraha Deeksha for OBC Employee & Student Rights",
    icon: Scale,
    tag: "Reservations",
    context: "Extended direct solidarity to OBC unions at Hyderabad Central University demanding strict quota enforcement in Ph.D./M.Phil enrollments and non-teaching appointments.",
    photo: { src: `${BASE}activities/page11_hcu_obc.jpg`, alt: "Satyagraha Deeksha with OBC unions at Hyderabad Central University" },
  },
  {
    title: "Yadadri Sri Lakshmi Narasimha Swamy Darshan & Janam Baata",
    icon: Sparkles,
    tag: "Devotional & mass outreach",
    context: "Offered special prayers at the sacred Yadagirigutta shrine alongside Kalvakuntla Kavitha seeking divine blessings ahead of the statewide 'Janam Baata' mass public connect initiative.",
    consequence: "Spearheaded the grassroots Janam Baata mass contact tour (October 25 – February 13), mobilizing cadre and addressing civic grievances across Telangana.",
    photo: { src: `${BASE}activities/page53_yadadri.jpg`, alt: "Dr. Srikanth Goud and Kalvakuntla Kavitha at Yadadri Sri Lakshmi Narasimha Swamy Darshan" },
  },
] as const;

const CHARTER = [
  { en: "Free Quality Education for All", te: "అందరికి ఉచిత నాణ్యమైన విద్య", icon: GraduationCap },
  { en: "Free Universal Healthcare", te: "అందరికి ఉచిత వైద్యం", icon: HeartPulse },
  { en: "Rythe Raju: Free Agricultural Electricity", te: "రైతే రాజు - ఉచిత విద్యుత్", icon: Sprout },
  {
    en: "Youth Employment & Enterprise", icon: Briefcase,
    points: [
      { k: "4 Lakh", v: "Government jobs in Year 1" },
      { k: "1 Lakh", v: "Jobs for Movement Veterans" },
      { k: "₹20 Cr", v: "MSME Loan Funds" },
    ],
  },
  { en: "Complete Social Justice & Comprehensive BC Caste Census", icon: Landmark },
];

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Initiatives() {
  return (
    <section id="initiatives" aria-labelledby="initiatives-heading" className="relative overflow-hidden border-y border-[#DFD8CB]/60 bg-transparent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Rise className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">
            <Megaphone className="h-4 w-4" aria-hidden /> Initiatives
          </p>
          <h2 id="initiatives-heading" className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-[#15241D] md:text-[3.4rem]">
            Key Initiatives &amp; <span className="italic text-[#0284C7]">Frontline Advocacy</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-stone-700">
            Documented interventions on the ground, followed by the policy commitments he puts before the people.
          </p>
        </Rise>

        {/* I. Agitations */}
        <div className="mt-16">
          <Rise>
            <h3 className="flex items-baseline gap-3 border-b border-[#DFD8CB] pb-4 font-display text-2xl font-semibold text-[#15241D] md:text-3xl">
              <span className="text-sm font-bold text-[#B45309]">I.</span> Frontline Agitations &amp; Interventions
            </h3>
          </Rise>
          <ol className="mt-8 grid gap-6 lg:grid-cols-3">
            {CASES.map((c, i) => (
              <li key={c.title} className="min-w-0">
                <Rise delay={0.08 * i} className="h-full">
                  <article className="trs-card group flex h-full flex-col overflow-hidden rounded-2xl" data-testid={`card-case-${i}`}>
                    {"photo" in c && c.photo ? (
                      <img src={c.photo.src} alt={c.photo.alt} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none" />
                    ) : (
                      <div className="relative grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,#F5F1E9,#EAE5DB)]">
                        <Building2 className="h-14 w-14 text-[#CA8A04]/50" aria-hidden />
                        <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4A5B52]">ESI Nacharam Hospital</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A16207]">Case {String(i + 1).padStart(2, "0")} · {c.tag}</span>
                        <span className="trs-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#CA8A04]/40 text-[#A16207]"><c.icon className="h-5 w-5" aria-hidden /></span>
                      </div>
                      <h4 className="mt-4 font-display text-xl font-semibold leading-snug text-[#15241D]">{c.title}</h4>
                      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                        <div className="border-l-2 border-[#CA8A04] pl-4">
                          <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A16207]">Context</dt>
                          <dd className="mt-1 text-[#15241D]">{c.context}</dd>
                        </div>
                        {"consequence" in c && (
                          <div className="border-l-2 border-[#0284C7] pl-4">
                            <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0284C7]">Consequence</dt>
                            <dd className="mt-1 text-[#15241D]">{c.consequence}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </article>
                </Rise>
              </li>
            ))}
          </ol>
        </div>

        {/* II. Charter */}
        <Rise className="mt-20 lg:mt-28">
          <div className="relative overflow-hidden rounded-3xl bg-[#f3ecdc] text-[#15241D] ring-1 ring-[#CA8A04]" data-testid="banner-charter">
            <div className="trs-tricolor-top h-2" aria-hidden />
            <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:p-14">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">II. Policy commitments</p>
                <h3 className="mt-4 break-words font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight text-[#15241D]">Paanchajanyam</h3>
                <p className="mt-3 font-display text-2xl italic text-[#B45309]">Charter of 5 Guarantees</p>
                <p className="mt-6 text-sm font-medium leading-relaxed text-stone-700">
                  Five core policy commitments covering education, healthcare, agriculture, youth opportunity, and social justice.
                </p>
                <span className="mt-6 inline-flex rounded-full border border-[#15241D] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#15241D]">Policy charter</span>
              </div>
              <ol className="min-w-0 divide-y divide-[#CA8A04]/40 border-y border-[#CA8A04]/40" aria-label="Charter of 5 Guarantees">
                {CHARTER.map((g, i) => (
                  <li key={g.en} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-5 sm:gap-6" data-testid={`item-guarantee-${i}`}>
                    <span className="font-display text-4xl font-semibold leading-none text-[#B45309] sm:text-5xl" aria-hidden>{i + 1}</span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B45309]"><span className="sr-only">Guarantee {i + 1}: </span>Commitment</p>
                      <h4 className="mt-1 flex items-start gap-2 font-display text-xl font-semibold leading-snug text-[#15241D] sm:text-2xl">
                        <g.icon className="mt-1 h-5 w-5 shrink-0 text-[#B45309]" aria-hidden />{g.en}
                      </h4>
                      {"te" in g && g.te && <p lang="te" className="mt-1 text-base font-medium text-[#0284C7]">{g.te}</p>}
                      {"points" in g && g.points && (
                        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                          {g.points.map((p) => (
                            <li
                              key={p.v}
                              className="rounded-2xl border border-[#E2DDD5] bg-[#FAF8F5] p-5 shadow-sm transition-all duration-200 hover:border-[#CA8A04]/50 hover:shadow-md"
                            >
                              <span className="block font-display text-2xl font-bold text-[#B45309] sm:text-3xl">
                                {p.k}
                              </span>
                              <span className="mt-1 block text-sm font-medium leading-snug text-[#4A5568]">
                                {p.v}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
