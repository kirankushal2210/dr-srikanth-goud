import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TIMELINE_FILTERS, timelineData, type TimelineCategory } from "@/data/timelineData";

type FilterId = "all" | TimelineCategory;
const LABEL: Record<TimelineCategory, string> = {
  student: "Student Movement", jagruthi: "Telangana Jagruthi", national: "National Roles", party: "Party Leadership",
};

export default function Timeline() {
  const [filter, setFilter] = useState<FilterId>("all");
  const reduce = useReducedMotion();
  const items = useMemo(
    () => (filter === "all" ? timelineData : timelineData.filter((m) => m.categories.includes(filter as TimelineCategory))),
    [filter],
  );
  const label = TIMELINE_FILTERS.find((f) => f.id === filter)?.label ?? "All";

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative overflow-hidden border-t border-[#DFD8CB]/60 bg-transparent py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(202,138,4,0.08),transparent_65%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">Journey · 2001 – 2026</p>
            <h2 id="journey-heading" className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-[#15241D] md:text-[3.4rem]">
              Twenty-five years <span className="italic text-[#0284C7]">on the record</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-stone-700">
              From student welfare drives in Mahabubabad to statewide and national office, in the order it happened.
            </p>
          </div>
          <p className="font-display text-6xl font-semibold leading-none text-[#CA8A04]/30 lg:text-8xl" aria-hidden>
            {String(items.length).padStart(2, "0")}
          </p>
        </div>

        <div role="group" aria-label="Filter milestones" className="mt-10 flex flex-wrap gap-2">
          {TIMELINE_FILTERS.map((f) => {
            const on = filter === f.id;
            const count = f.id === "all" ? timelineData.length : timelineData.filter((m) => m.categories.includes(f.id as TimelineCategory)).length;
            return (
              <button key={f.id} type="button" aria-pressed={on} onClick={() => setFilter(f.id)} data-testid={`button-filter-${f.id}`}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold trs-cta ${on ? "border-[#CA8A04] bg-[#14532D] text-white shadow-xs" : "border-[#DFD8CB] bg-white/90 text-stone-700 hover:border-[#CA8A04] hover:text-[#15241D]"}`}>
                {f.label}
                <span className={`rounded-full px-1.5 text-[11px] tabular-nums ${on ? "bg-white/20" : "bg-[#CA8A04]/15 text-[#B45309]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="mt-4 text-sm font-medium text-stone-600" data-testid="status-timeline-count">
          Showing {items.length} of {timelineData.length} milestones{filter !== "all" ? ` in ${label}` : ""}.
        </p>

        <motion.ol layout={reduce ? false : true} transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative mt-12">
          <span className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-gradient-to-b from-[#CA8A04]/70 via-[#CA8A04]/40 to-[#CA8A04]/10 md:left-1/2 md:-translate-x-1/2" aria-hidden />
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li key={m.id} layout={reduce ? false : true}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: reduce ? 0 : 0.18 } }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group/node relative pb-8 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
                  data-testid={`card-milestone-${m.id}`}>
                  <span className="absolute left-0 top-5 grid h-6 w-6 place-items-center rounded-full border-2 border-[#CA8A04] bg-[#F5F1E9] transition-[box-shadow,border-color] duration-300 group-hover/node:border-[#0284C7] group-hover/node:shadow-[0_0_0_6px_rgba(2,132,199,0.16)] md:left-1/2 md:-translate-x-1/2" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-[#14532D] transition-transform duration-300 group-hover/node:scale-150" />
                  </span>
                  <article className={`trs-card group min-w-0 rounded-2xl p-6 ${right ? "md:col-start-2" : "md:col-start-1"}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[#CA8A04]/60 bg-transparent px-2.5 py-1 font-display text-base font-semibold tabular-nums text-[#A16207] transition-colors duration-300 group-hover/node:border-[#CA8A04] group-hover/node:bg-[#14532D] group-hover/node:font-extrabold group-hover/node:text-[#FBF8F1]" data-testid={`text-year-${m.id}`}>{m.year}</span>
                      <span className="rounded-md border border-[#DFD8CB] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4A5B52]">{m.org}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-[#15241D] md:text-2xl">{m.role}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#4A5B52]">{m.narrative}</p>
                    <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0284C7]/90">
                      {m.categories.map((c) => <span key={c}>{LABEL[c]}</span>)}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>
      </div>
    </section>
  );
}
