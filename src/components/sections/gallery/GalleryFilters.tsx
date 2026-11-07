import { galleryCategories, type GalleryCategory } from "@/data/galleryData";

export default function GalleryFilters({ value, onChange, counts }: { value: GalleryCategory; onChange: (c: GalleryCategory) => void; counts: Record<string, number> }) {
  return (
    <div role="group" aria-label="Filter photographs by category" className="flex flex-wrap gap-2">
      {galleryCategories.map((c) => {
        const on = value === c.id;
        return (
          <button key={c.id} type="button" aria-pressed={on} onClick={() => onChange(c.id)} data-testid={`button-filter-${c.id}`}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${on ? "bg-[#14532D] font-bold text-[#FBF8F1]" : "border border-[#DFD8CB] bg-[#F5F1E9] text-[#1E293B] hover:border-[#CA8A04]/70 hover:text-[#15241D]"}`}>
            {c.label}
            <span className={`rounded-full px-1.5 text-[11px] tabular-nums ${on ? "bg-slate-950/15" : "bg-[#DFD8CB] text-[#1E293B]"}`}>{counts[c.id] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
