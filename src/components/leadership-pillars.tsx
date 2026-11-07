import { motion, useReducedMotion } from "framer-motion";
import { Award, Flag, Quote, Scale, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Flag,
    title: "Telangana Movement & Self-Respect",
    description: "Joined the statehood movement in 2004 under BRS and TRSV. Mobilised thousands of student leaders across Warangal, braved police charges, and stood at the frontline of agitations for Telangana identity.",
    tag: "2004–2014 Movement Leader",
  },
  {
    icon: Users,
    title: "Grassroots Cadre Builder & Trusted Associate",
    description: "Trusted frontline defender of Smt. Kalvakuntla Kavitha through both triumph and political adversity. Served as Balkonda Incharge (2014) and State President of Telangana Jagruthi, building disciplined ground-level cadre networks.",
    tag: "Cadre Architect",
  },
  {
    icon: Scale,
    title: "Social Justice, OBC Rights & Employee Advocacy",
    description: "Staunch crusader for OBC constitutional reservations at Central Universities (HCU Satyagraha Deeksha). Led investigative committees for outsourcing and contract employees across state healthcare infrastructure.",
    tag: "Social Equity Voice",
  },
  {
    icon: Award,
    title: "Consumer Rights Protection & Public Redressal",
    description: "As National Chairman of World Consumer Rights and NCRC Telangana Chairman, led nationwide drives against market exploitation, consumer fraud, and spearheaded critical food and supply logistics during the COVID-19 pandemic (Recognized Corona Warrior).",
    tag: "Public Welfare Steward",
  },
];

export default function LeadershipPillars() {
  const reduce = useReducedMotion();

  return (
    <section id="vision" aria-labelledby="leadership-heading" className="border-t border-[#DFD8CB]/60 bg-transparent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">LEADERSHIP &amp; VALUES</p>
          <h2 id="leadership-heading" className="mt-5 font-display text-4xl font-bold leading-[1.1] text-[#15241D] md:text-6xl">
            A Relentless Journey Rooted in <span className="trs-gradient-text">Telangana Soil</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-stone-700">
            From student barricades at Kakatiya University to national consumer advocacy and party leadership, Dr. Srikanth Goud combines intellectual rigor with grassroots fidelity.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.08 }}
              className="trs-card group flex h-full flex-col overflow-hidden rounded-2xl p-6 lg:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="trs-icon grid h-12 w-12 place-items-center rounded-xl border border-[#CA8A04]/50 bg-[#FFFFFF] text-[#A16207]">
                  <pillar.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-display text-sm text-[#CA8A04]/60" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="mt-7 font-display text-2xl font-bold leading-tight text-[#15241D]">{pillar.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-700">{pillar.description}</p>
              <div className="mt-7 border-t border-[#DFD8CB] pt-5">
                <span className="inline-block rounded-full border border-[#CA8A04]/40 bg-[#FAF8F5] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#B45309]">{pillar.tag}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <figure className="relative mt-10 overflow-hidden rounded-2xl border border-[#CA8A04]/40 bg-[#F5F1E9] px-7 py-10 text-[#15241D] md:px-12">
          <Quote className="mb-5 h-8 w-8 text-[#A16207]" aria-hidden="true" />
          <blockquote className="max-w-4xl font-display text-2xl leading-relaxed text-[#15241D] md:text-3xl">
            “True leadership is defined not by titles, but by standing unwavering with the people during their most vulnerable challenges.”
          </blockquote>
          <figcaption className="mt-6 text-sm font-semibold text-[#0284C7]">— Dr. Nalamasa Srikanth Goud</figcaption>
        </figure>
      </div>
    </section>
  );
}
