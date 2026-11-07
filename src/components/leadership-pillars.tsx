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
    description: "As National Chairman of World Consumer Rights and NCRC Telangana Chairman, led nationwide drives against market exploitation, consumer fraud, and spearheaded critical food and supply logistics during the COVID-19 pandemic.",
    tag: "Public Welfare Steward",
  },
];

export default function LeadershipPillars() {
  const reduce = useReducedMotion();

  return (
    <section id="vision" aria-labelledby="leadership-heading" className="border-t-2 border-[#F3BA16]/40 bg-transparent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#15803D]">LEADERSHIP &amp; VALUES</p>
          <h2 id="leadership-heading" className="mt-4 font-display text-4xl font-bold leading-[1.1] text-[#172554] md:text-6xl">
            A Relentless Journey Rooted in <span className="text-[#1E3A8A] underline decoration-[#F3BA16] decoration-4 underline-offset-8">Telangana Soil</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-stone-700">
            From student barricades at Kakatiya University to national consumer advocacy and party leadership, Dr. Srikanth Goud combines intellectual rigor with grassroots fidelity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.08 }}
              className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[#F3BA16]/50 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A] hover:shadow-xl lg:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-[#F3BA16] bg-[#1E3A8A] text-[#F3BA16] shadow-sm">
                  <pillar.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold text-[#F3BA16]" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-[#172554]">{pillar.title}</h3>
              <p className="mt-3.5 flex-1 text-sm font-medium leading-relaxed text-stone-700">{pillar.description}</p>
              <div className="mt-6 border-t border-stone-200 pt-4">
                <span className="inline-block rounded-full border border-[#15803D]/40 bg-[#15803D]/10 px-3 py-1.5 text-xs font-bold tracking-wide text-[#15803D]">{pillar.tag}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Highlight Quote in Deep Royal Blue Container */}
        <figure className="relative mt-12 overflow-hidden rounded-2xl border-2 border-[#F3BA16] bg-[#1E3A8A] px-7 py-10 text-white shadow-xl md:px-12">
          <Quote className="mb-4 h-8 w-8 text-[#F3BA16]" aria-hidden="true" />
          <blockquote className="max-w-4xl font-display text-2xl leading-relaxed text-white md:text-3xl">
            “True leadership is defined not by titles, but by standing unwavering with the people during their most vulnerable challenges.”
          </blockquote>
          <figcaption className="mt-5 text-sm font-bold text-[#F3BA16] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" /> Dr. Nalamasa Srikanth Goud
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
