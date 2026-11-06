import { MapPin } from "lucide-react";
import { pageLabel, type GalleryItem } from "@/data/galleryData";
import GalleryImage from "./GalleryImage";

export default function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: (el: HTMLButtonElement) => void }) {
  return (
    <button type="button" onClick={(e) => onOpen(e.currentTarget)} data-testid={`card-gallery-${item.id}`}
      aria-label={`Open details: ${item.titleEn}`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#DFD8CB] bg-[#F5F1E9] text-left transition-colors duration-300 hover:border-[#CA8A04] focus-visible:border-[#CA8A04]">
      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
        <GalleryImage item={item} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15241D]/90 via-[#15241D]/45 to-transparent" />
      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${item.pdfPage ? "bg-[#14532D] text-[#FBF8F1]" : "border border-[#CA8A04]/60 bg-[#FFFFFF]/90 text-[#A16207]"}`}>{pageLabel(item)}</span>
      <span className="absolute right-3 top-3 max-w-[55%] truncate rounded-full border border-[#0284C7]/50 bg-[#FFFFFF]/90 px-2.5 py-1 text-[10px] font-semibold text-[#0284C7]">{item.tag}</span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-white">{item.titleEn}</h3>
        <p lang="te" className="mt-0.5 line-clamp-1 text-sm text-[#1E293B]">{item.titleTe}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#0284C7]"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /><span className="truncate">{item.location}</span></p>
      </div>
    </button>
  );
}
