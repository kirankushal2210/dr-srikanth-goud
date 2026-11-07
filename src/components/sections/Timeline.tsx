import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TIMELINE_FILTERS, timelineData, type TimelineCategory } from "@/data/timelineData";

type FilterId = "all" | TimelineCategory;
const LABEL: Record<TimelineCategory, string> = {
  student: "Student Movement",
  jagruthi: "Telangana Jagruthi",
  national: "National Roles",
  party: "Party Leadership",
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
    <section id="journey" aria-labelledby="journey-heading" className="relative overflow-hidden border-t-2 border-[#F3BA16]/40 bg-transparent py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(243,186,22,0.12),transparent_65%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#15803D]">Journey · 2001 – 2026</p>
            <h2 id="journey-heading" className="mt-4 font-display text-4xl font-bold leading-[1.08] text-[#172554] md:text-[3.4rem]">
              Twenty-five years <span className="italic text-[#1E3A8A] underline decoration-[#F3BA16] decoration-4 underline-offset-8">on the record</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-stone-700">
              From student welfare drives in Mahabubabad to statewide and national office, in the order it happened.
            </p>
          </div>
          <p className="font-display text-6xl font-bold leading-none text-[#F3BA16]/40 lg:text-8xl" aria-hidden>
            {String(items.length).padStart(2, "0")}
          </p>
        </div>

        <div role="group" aria-label="Filter milestones" className="mt-10 flex flex-wrap gap-2.5">
          {TIMELINE_FILTERS.map((f) => {
            const on = filter === f.id;
            const count = f.id === "all" ? timelineData.length : timelineData.filter((m) => m.categories.includes(f.id as TimelineCategory)).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                data-testid={`button-filter-${f.id}`}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all ${
                  on
                    ? "border-[#F3BA16] bg-[#1E3A8A] text-white shadow-md scale-105"
                    : "border-[#F3BA16]/40 bg-white/95 text-[#172554] hover:border-[#1E3A8A] hover:bg-white"
                }`}
              >
                {f.label}
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${on ? "bg-[#F3BA16] text-[#172554]" : "bg-[#1E3A8A]/10 text-[#1E3A8A]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="mt-4 text-sm font-semibold text-stone-600" data-testid="status-timeline-count">
          Showing {items.length} of {timelineData.length} milestones{filter !== "all" ? ` in ${label}` : ""}.
        </p>

        <motion.ol layout={reduce ? false : true} transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative mt-12">
          <span className="absolute bottom-0 left-[11px] top-0 w-1 bg-gradient-to-b from-[#F3BA16] via-[#15803D] to-[#1E3A8A] md:left-1/2 md:-translate-x-1/2" aria-hidden />
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={m.id}
                  layout={reduce ? false : true}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.97, transition: { duration: reduce ? 0 : 0.18 } }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group/node relative pb-8 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
                  data-testid={`card-milestone-${m.id}`}
                >
                  <span className="absolute left-0 top-5 grid h-6 w-6 place-items-center rounded-full border-2 border-[#F3BA16] bg-white transition-[box-shadow,border-color] duration-300 group-hover/node:border-[#1E3A8A] group-hover/node:shadow-[0_0_0_6px_rgba(30,58,138,0.2)] md:left-1/2 md:-translate-x-1/2" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#15803D] transition-transform duration-300 group-hover/node:scale-150" />
                  </span>
                  <article className={`group min-w-0 rounded-2xl border-2 border-[#F3BA16]/50 bg-white p-6 shadow-md transition-all duration-300 hover:border-[#1E3A8A] hover:shadow-xl ${right ? "md:col-start-2" : "md:col-start-1"}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[#F3BA16] bg-[#172554] px-2.5 py-1 font-display text-base font-bold tabular-nums text-[#F3BA16]" data-testid={`text-year-${m.id}`}>
                        {m.year}
                      </span>
                      <span className="rounded-md border border-stone-200 bg-stone-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#172554]">
                        {m.org}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#172554] md:text-2xl">{m.role}</h3>
                    <p className="mt-2 text-[15px] font-medium leading-relaxed text-stone-700">{m.narrative}</p>
                    <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#15803D]">
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
