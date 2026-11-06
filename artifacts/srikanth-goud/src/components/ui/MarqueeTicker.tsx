import { useState } from "react";
import { Pause, Play } from "lucide-react";

const ITEMS = [
  "DR. NALAMASA SRIKANTH GOUD",
  "STATE OFFICIAL SPOKESPERSON, TRS",
  "MAHABUBABAD DISTRICT INCHARGE",
  "NATIONAL CHAIRMAN, WORLD CONSUMER RIGHTS",
  "TELANGANA STATEHOOD VETERAN",
  "CHAMPION OF SOCIAL JUSTICE & BC RIGHTS",
  "DOCTOR OF PHILOSOPHY (Ph.D.), KAKATIYA UNIVERSITY",
];

function Group({ dup }: { dup?: boolean }) {
  return (
    <ul className={`marquee-group flex shrink-0 items-center ${dup ? "marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {ITEMS.map((t) => (
        <li key={t} className="marquee-item flex items-center gap-3 whitespace-nowrap px-6 py-3.5 font-ticker text-[13px] font-semibold tracking-[0.18em] text-[#15241D]">
          <span className="marquee-star text-base" aria-hidden>★</span>{t}
        </li>
      ))}
    </ul>
  );
}

export default function MarqueeTicker({ id, reverse = false }: { id: string; reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label="Designations and public roles" data-testid={`ticker-${id}`}
      className="marquee-shell relative flex items-stretch overflow-hidden border-y border-[#DFD8CB] bg-[#F5F1E9]" data-paused={paused}>
      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="marquee-track" style={reverse ? { animationDirection: "reverse" } : undefined}>
          <Group />
          <Group dup />
        </div>
      </div>
      <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused}
        aria-label={paused ? "Play ticker" : "Pause ticker"} data-testid={`button-ticker-toggle-${id}`}
        className="relative z-10 grid w-12 shrink-0 place-items-center border-l border-[#DFD8CB] bg-[#F5F1E9] text-[#A16207] transition-colors hover:bg-[#14532D] hover:text-[#FBF8F1] motion-reduce:hidden">
        {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
      </button>
    </section>
  );
}
