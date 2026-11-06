import { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Expand, ImageOff, MapPin, Newspaper, Camera } from "lucide-react";
import { DATE_NOT_RECORDED, assetUrl, photoCategories, photoRecords, pressEntries, type PhotoCategory, type PhotoRecord, type PressEntry } from "@/data/mediaArchiveData";
import ArchiveViewer, { type ViewerEntry } from "./media-archive/ArchiveViewer";

const pressToViewer = (p: PressEntry): ViewerEntry => ({
  key: p.id,
  kicker: `Press clipping · ${p.publisher}${p.sourcePage ? ` · Biodata PDF p. ${p.sourcePage}` : ""}`,
  title: p.headlineEn ?? p.publisher,
  titleTe: p.headlineTe,
  src: p.scan ? assetUrl(p.scan) : null,
  missingTitle: "Original clipping not available",
  missingBody: "The clipping image for this report could not be located in the supplied material. Zoom is disabled until it is added.",
  meta: [
    { k: "Publisher", v: p.publisher },
    { k: "Date", v: p.date ?? "Date not specified in the record" },
    { k: "Source", v: p.sourcePage ? `Uploaded biodata PDF, page ${p.sourcePage}` : "Not recorded" },
    ...(p.enIsTranslation ? [{ k: "English", v: "Plain translation of the Telugu headline" }] : []),
  ],
  note: p.scan
    ? "Original clipping embedded in the uploaded biodata PDF, extracted and shown at its source resolution. No enhancement, retouching or upscaling."
    : "No clipping image is available for this report.",
});

const kindNote: Record<PhotoRecord["kind"], string> = {
  "pdf-page": "Full page from the uploaded biodata PDF, rendered with its original layout so photographs keep their printed context. Not enhanced.",
  "pdf-photo": "Photograph extracted from the uploaded biodata PDF at source resolution. Not enhanced.",
  screenshot: "Previously supplied screenshot shown at its original resolution. No enhancement or upscaling.",
};

const photoToViewer = (r: PhotoRecord): ViewerEntry => ({
  key: r.id,
  kicker: `${photoCategories.find((c) => c.id === r.cat)?.label} · ${r.sourceLabel}`,
  title: r.titleEn,
  titleTe: r.titleTe,
  src: r.available ? r.src : null,
  missingTitle: "Photograph not supplied",
  missingBody: "This record has no photograph in the supplied material.",
  meta: [
    { k: "Date", v: DATE_NOT_RECORDED },
    { k: "Location", v: r.location },
    { k: "Source", v: r.sourceLabel },
  ],
  description: r.descriptionEn,
  descriptionTe: r.descriptionTe,
  note: kindNote[r.kind],
});

const tabCls = "group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:text-[#15241D] hover:bg-stone-100 data-[state=active]:bg-[#14532D] data-[state=active]:text-white data-[state=active]:shadow-xs";

export default function MediaArchive() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("press");
  const [cat, setCat] = useState<PhotoCategory>("all");
  const [pressIdx, setPressIdx] = useState<number | null>(null);
  const [photoIdx, setPhotoIdx] = useState<number | null>(null);

  const photos = useMemo(() => (cat === "all" ? photoRecords : photoRecords.filter((r) => r.cat === cat))
    .slice().sort((a, b) => Number(b.available) - Number(a.available)), [cat]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: photoRecords.length };
    photoRecords.forEach((r) => { c[r.cat] = (c[r.cat] ?? 0) + 1; });
    return c;
  }, []);
  const pressViewer = useMemo(() => pressEntries.map(pressToViewer), []);
  const photoViewer = useMemo(() => photos.map(photoToViewer), [photos]);

  return (
    <section id="media" aria-labelledby="media-title" className="relative border-y border-[#DFD8CB]/60 bg-transparent py-24 text-[#15241D] lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="grid gap-6 border-b-2 border-[#14532D] pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">The Reading Room · Press and Photographic Record</p>
            <h2 id="media-title" className="mt-4 font-display text-4xl font-bold leading-[1.05] text-[#15241D] md:text-[3.6rem]">What was reported, <span className="italic text-[#14532D]">and what was seen.</span></h2>
            <p lang="te" className="mt-4 text-xl font-semibold text-[#0284C7]">పత్రికా కథనాలు మరియు ప్రజా జీవిత చిత్రమాలిక</p>
          </div>
          <p className="max-w-md text-sm font-medium leading-relaxed text-stone-700">Every entry states what has and has not been supplied. Clippings and photographs are taken from the uploaded biodata PDF at source resolution. Dates and places appear only where recorded.</p>
        </header>

        <Tabs.Root value={tab} onValueChange={setTab} className="mt-10">
          <Tabs.List aria-label="Media archive sections" className="inline-flex flex-wrap gap-1.5 rounded-full border border-[#DFD8CB] bg-white/95 p-1.5 shadow-xs">
            <Tabs.Trigger value="press" className={tabCls} data-testid="tab-press"><Newspaper className="h-4 w-4" aria-hidden />Newspaper Coverage &amp; Press</Tabs.Trigger>
            <Tabs.Trigger value="gallery" className={tabCls} data-testid="tab-gallery"><Camera className="h-4 w-4" aria-hidden />Leadership &amp; Field Gallery</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="press" className="mt-10 outline-none">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pressEntries.map((p, i) => (
                <motion.li key={p.id} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}>
                  <article className="flex h-full flex-col rounded-2xl border border-[#DFD8CB] bg-white p-1.5 shadow-xs transition hover:shadow-md" data-testid={`card-press-${p.id}`}>
                    <div className="flex items-baseline justify-between gap-3 border-b-2 border-double border-[#15241D]/20 px-5 pb-2 pt-4">
                      <p className="font-display text-lg font-bold tracking-tight text-[#15241D]">{p.publisher}</p>
                      <p className={`flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider ${p.date ? "text-[#B45309]" : "text-stone-500 italic"}`}><Calendar className="h-3 w-3" aria-hidden />{p.date ?? "Date unspecified"}</p>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 lang="te" className="text-[17px] font-semibold leading-relaxed text-[#15241D]">{p.headlineTe}</h3>
                      {p.headlineEn && <p className="font-display text-sm italic text-[#14532D]">{p.headlineEn}{p.enIsTranslation && <span className="not-italic text-[10px] uppercase tracking-wider text-stone-500"> (translation)</span>}</p>}
                      {p.thumb ? (
                        <button type="button" onClick={() => setPressIdx(i)} tabIndex={-1} aria-hidden="true"
                          className="group relative mt-1 block aspect-[4/5] w-full overflow-hidden rounded-lg border border-[#DFD8CB] bg-[#F5F1E9]">
                          <img src={assetUrl(p.thumb)} alt="" loading="lazy" className="h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                          <span className="absolute bottom-2 left-2 rounded-sm bg-[#14532D] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FBF8F1]">PDF p. {p.sourcePage}</span>
                        </button>
                      ) : (
                        <div className="mt-auto flex items-center gap-3 rounded-lg border border-dashed border-[#CA8A04]/50 bg-[#FAF8F5] px-4 py-3 text-xs font-medium text-stone-700">
                          <ImageOff className="h-4 w-4 shrink-0 text-[#B45309]" aria-hidden />Original clipping not available
                        </div>
                      )}
                      <button type="button" onClick={() => setPressIdx(i)} data-testid={`button-expand-${p.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#14532D] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#0f3d21]">
                        <Expand className="h-4 w-4" aria-hidden />Expand Clipping<span className="sr-only">: {p.publisher}</span>
                      </button>
                    </div>
                  </article>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-medium text-stone-600">All five clippings are the originals embedded in the uploaded biodata PDF (pages 54, 55 and 59), shown at source resolution. Dates appear only where the record states them.</p>
          </Tabs.Content>

          <Tabs.Content value="gallery" className="mt-10 outline-none">
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {photoCategories.map((c) => (
                <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} data-testid={`filter-${c.id}`}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${cat === c.id ? "border-[#14532D] bg-[#14532D] text-white shadow-xs" : "border-[#DFD8CB] bg-white/90 text-stone-700 hover:border-[#14532D] hover:text-[#15241D]"}`}>
                  {c.label} <span className="ml-1 tabular-nums opacity-75">{counts[c.id] ?? 0}</span>
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">{photos.length} records shown</p>
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((r, i) => (
                <motion.li key={`${cat}-${r.id}`} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.035 }}>
                  <button type="button" onClick={() => setPhotoIdx(i)} data-testid={`card-photo-${r.id}`}
                    aria-label={`${r.titleEn}. ${r.available ? "Open photograph" : "Photograph not supplied, open record"}`}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#DFD8CB] bg-white p-1 text-left shadow-xs transition hover:shadow-md">
                    {r.available ? (
                      <img src={r.thumb ?? r.src} alt="" loading="lazy" className={`h-full w-full rounded-xl ${r.kind === "pdf-page" ? "object-contain bg-[#FAF8F5] p-1.5" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none`} />
                    ) : (
                      <div className="grid h-full place-items-center rounded-xl bg-[repeating-linear-gradient(135deg,#FAF8F5_0_12px,#F5F1E9_12px_24px)]">
                        <span className="flex items-center gap-2 rounded-full border border-[#DFD8CB] bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-xs"><ImageOff className="h-4 w-4 text-[#B45309]" aria-hidden />Photograph not supplied</span>
                      </div>
                    )}
                    <div className="absolute inset-x-1 bottom-1 rounded-b-xl bg-gradient-to-t from-[#07150f]/95 via-[#07150f]/75 to-transparent p-4 pt-12 text-[#FBF8F1] transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#CA8A04]">{photoCategories.find((c) => c.id === r.cat)?.label}</p>
                      <p className="mt-1 font-display text-base font-semibold leading-snug">{r.titleEn}</p>
                      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-300">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" aria-hidden />{DATE_NOT_RECORDED}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" aria-hidden />{r.location}</span>
                      </p>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
            {photos.length === 0 && <p className="mt-8 text-sm font-medium text-stone-600">No records in this category.</p>}
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <ArchiveViewer label="Press clipping viewer" entries={pressViewer} index={pressIdx} onIndex={setPressIdx} onClose={() => setPressIdx(null)} />
      <ArchiveViewer label="Photograph viewer" entries={photoViewer} index={photoIdx} onIndex={setPhotoIdx} onClose={() => setPhotoIdx(null)} />
    </section>
  );
}
