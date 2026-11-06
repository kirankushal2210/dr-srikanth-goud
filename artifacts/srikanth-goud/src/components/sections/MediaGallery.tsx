import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { allGalleryItems, isImageAvailable, type GalleryCategory } from "@/data/galleryData";
import GalleryFilters from "./gallery/GalleryFilters";
import GalleryCard from "./gallery/GalleryCard";
import GalleryLightbox from "./gallery/GalleryLightbox";

export default function MediaGallery() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<GalleryCategory>("all");
  const [index, setIndex] = useState<number | null>(null);
  const [origin, setOrigin] = useState<HTMLElement | null>(null);

  const items = useMemo(() => (
    cat === "all" ? [...allGalleryItems] : allGalleryItems.filter((i) => i.category === cat)
  ).sort((a, b) => Number(isImageAvailable(b)) - Number(isImageAvailable(a))), [cat]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allGalleryItems.length };
    allGalleryItems.forEach((i) => { c[i.category] = (c[i.category] ?? 0) + 1; });
    return c;
  }, []);
  const close = useCallback(() => setIndex(null), []);

  return (
    <section id="media" aria-labelledby="media-title" className="border-y border-[#DFD8CB] bg-gradient-to-b from-[#EAE5DB] to-[#EDE7DD] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="mb-10 max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#A16207]">📸 ARCHIVAL PHOTOGRAPHS • THE LEADERSHIP RECORD</p>
          <h2 id="media-title" className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-[#15241D] md:text-[3.4rem]">Photographic Archive & Public Life</h2>
          <p lang="te" className="mt-4 text-xl text-[#0284C7]">ప్రజా జీవితంలో మైలురాళ్ళు — అరుదైన చిత్రమాలిక</p>
          <p className="mt-4 text-sm leading-relaxed text-[#4A5B52]">Images are supplied screenshots shown at their original resolution. Page references come from the source brief and are not independently verified; records without a supplied photograph are marked as such.</p>
        </header>
        <GalleryFilters value={cat} onChange={setCat} counts={counts} />
        <p className="sr-only" aria-live="polite">{items.length} photographs shown</p>
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.li key={`${cat}-${item.id}`} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}>
              <GalleryCard item={item} onOpen={(el) => { setOrigin(el); setIndex(i); }} />
            </motion.li>
          ))}
        </ul>
      </div>
      <GalleryLightbox items={items} index={index} onIndex={setIndex} onClose={close} returnFocus={origin} />
    </section>
  );
}
