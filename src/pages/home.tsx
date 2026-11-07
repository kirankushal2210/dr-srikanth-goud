import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LeadershipPillars from "@/components/leadership-pillars";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Initiatives from "@/components/sections/Initiatives";
import MediaArchive from "@/components/sections/MediaArchive";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import ContactFooter from "@/components/sections/ContactFooter";
import { leaderProfile } from "@/data/leaderProfile";
import {
  ArrowRight, Compass, Flag, Home as HomeIcon,
  Languages, Mail, Menu, Newspaper,
  Target, User, X,
} from "lucide-react";

const NAV = [
  { id: "about", label: "About", icon: User },
  { id: "vision", label: "Vision", icon: Compass },
  { id: "journey", label: "Journey", icon: Flag },
  { id: "initiatives", label: "Initiatives", icon: Target },
  { id: "media", label: "Media", icon: Newspaper },
  { id: "contact", label: "Contact", icon: Mail },
];

function TeluguToggle({ onClick, active }: { onClick: () => void; active: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label="Telugu language toggle — translation coming soon"
      data-testid="button-telugu-toggle"
      className="inline-flex items-center gap-1.5 rounded-full border border-[#CA8A04]/40 px-3 py-1.5 text-xs font-semibold text-[#15241D] transition hover:border-[#CA8A04]"
    >
      <Languages className="h-3.5 w-3.5 text-[#A16207]" aria-hidden />
      <span className={active ? "text-[#4A5B52]" : ""}>EN</span>
      <span className="text-[#4A5B52]">/</span>
      <span className={active ? "text-[#0284C7]" : "text-[#4A5B52]"} lang="te">తెలుగు</span>
    </button>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [telugu, setTelugu] = useState(false);
  const [active, setActive] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", on); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = drawerRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && drawerRef.current) {
        const f = Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a,button"));
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", key); menuBtnRef.current?.focus(); };
  }, [open]);

  return (
    <div className="min-h-[100dvh] bg-transparent text-[#15241D]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-[#14532D] focus:px-4 focus:py-2 focus:text-[#FBF8F1]">Skip to content</a>

      <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "border-b border-[#DFD8CB] bg-[#EAE5DB]/92 backdrop-blur-md" : "bg-[#EAE5DB]/80 backdrop-blur-sm"}`}>
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3" data-testid="link-home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#CA8A04] font-display text-xs font-semibold text-[#A16207]">DSG</span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[15px] font-bold">{leaderProfile.name}</span>
              <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A16207]">{leaderProfile.titles[0]} &amp; Mahabubabad Incharge</span>
            </span>
          </a>
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} data-testid={`link-nav-${n.id}`} aria-current={active === n.id ? "location" : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition ${active === n.id ? "text-[#A16207]" : "text-[#15241D] hover:text-[#15241D]"}`}>
                  {n.label}
                  {active === n.id && <motion.span layoutId="navdot" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-[#14532D]" />}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-3 xl:flex">
            <TeluguToggle active={telugu} onClick={() => setTelugu((t) => !t)} />
            <a href="#contact" data-testid="button-reach-office" className="trs-cta inline-flex items-center gap-2 rounded-full bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-[#FBF8F1] transition hover:bg-[#14532D]">
              Reach Office <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <button ref={menuBtnRef} type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-drawer"
            data-testid="button-menu" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#CA8A04]/50 text-[#15241D] xl:hidden">
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </nav>
        <AnimatePresence>
          {telugu && (
            <motion.div role="status" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="border-t border-[#DFD8CB] bg-[#F5F1E9] px-5 py-2 text-center text-xs font-medium text-[#A16207]">
              Telugu translation coming soon. This site is currently available in English only.
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-[#15241D]/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} aria-hidden />
            <motion.div id="mobile-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-[75] flex w-[86%] max-w-sm flex-col bg-[#F5F1E9] text-[#15241D] shadow-2xl border-l border-[#DFD8CB]"
              initial={reduce ? { opacity: 0 } : { x: "100%" }} animate={reduce ? { opacity: 1 } : { x: 0 }} exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-center justify-between border-b border-[#DFD8CB] p-5">
                <span className="font-display text-lg font-bold">Navigate</span>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" data-testid="button-close-menu" className="grid h-10 w-10 place-items-center rounded-full border border-[#CA8A04]/50">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <ul className="flex-1 space-y-1 overflow-y-auto p-4">
                {[{ id: "top", label: "Home", icon: HomeIcon }, ...NAV].map((n, i) => (
                  <motion.li key={n.id} initial={reduce ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <a href={`#${n.id}`} onClick={() => setOpen(false)} data-testid={`link-drawer-${n.id}`}
                      className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium hover:bg-[#14532D]/[0.06]">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-[#CA8A04]/40 text-[#A16207]"><n.icon className="h-4 w-4" aria-hidden /></span>
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-[#DFD8CB] p-5">
                <TeluguToggle active={telugu} onClick={() => setTelugu((t) => !t)} />
                <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-full bg-[#14532D] py-3 text-sm font-semibold text-[#FBF8F1]">
                  Reach Office <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main id="main">
        <Hero />

        <MarqueeTicker id="hero" />

        <LeadershipPillars />

        <About />

        <Timeline />

        <Initiatives />

        <MediaArchive />

      </main>

      <ContactFooter />
    </div>
  );
}
