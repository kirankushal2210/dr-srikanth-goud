import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { isImageAvailable, pageLabel, type GalleryItem } from "@/data/galleryData";
import GalleryImage from "./GalleryImage";

type Props = { items: GalleryItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void; returnFocus: HTMLElement | null };

export default function GalleryLightbox({ items, index, onIndex, onClose, returnFocus }: Props) {
  const item = index !== null ? items[index] : undefined;
  const n = items.length;
  const go = (d: number) => index !== null && onIndex((index + d + n) % n);

  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, n, onIndex]);

  const navBtn = "grid h-11 w-11 place-items-center rounded-full border border-[#3B403C] bg-[#262A27] text-slate-200 transition-colors hover:border-[#E0A526] hover:text-[#E0A526]";
  return (
    <Dialog.Root open={!!item} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content onCloseAutoFocus={(e) => { if (returnFocus) { e.preventDefault(); returnFocus.focus(); } }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain p-3 outline-none sm:p-6 lg:grid lg:place-items-center" data-testid="dialog-lightbox">
          {item && (
            <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-[#3B403C] bg-[#1A1D1B] lg:grid-cols-[1.5fr_1fr]">
              <div className="relative grid min-h-[240px] place-items-center bg-black/60 lg:max-h-[86dvh]">
                <div className="h-full max-h-[60dvh] w-full lg:max-h-[86dvh]"><GalleryImage key={item.id} item={item} fit="contain" /></div>
              </div>
              <div className="flex flex-col gap-4 p-5 sm:p-7 lg:max-h-[86dvh] lg:overflow-y-auto">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#E0A526] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">{pageLabel(item)}</span>
                    <span className="rounded-full border border-[#7DD3FC]/50 px-2.5 py-1 text-[10px] font-semibold text-[#7DD3FC]">{item.tag}</span>
                  </div>
                  <Dialog.Close className={navBtn} aria-label="Close" data-testid="button-lightbox-close"><X className="h-5 w-5" aria-hidden /></Dialog.Close>
                </div>
                <Dialog.Title className="font-display text-2xl font-semibold leading-tight text-white">{item.titleEn}</Dialog.Title>
                <p lang="te" className="-mt-2 text-lg text-[#E0A526]">{item.titleTe}</p>
                <p className="flex items-center gap-1.5 text-sm text-[#7DD3FC]"><MapPin className="h-4 w-4" aria-hidden />{item.location}</p>
                <Dialog.Description className="leading-relaxed text-slate-200">{item.descriptionEn}</Dialog.Description>
                <p lang="te" className="leading-relaxed text-slate-300">{item.descriptionTe}</p>
                <p className="border-t border-[#3B403C] pt-3 text-xs leading-relaxed text-slate-400">
                  {isImageAvailable(item) ? "Shown at the resolution supplied — no enhancement or upscaling applied." : "The photograph for this record has not yet been supplied."}
                  {item.pdfPage > 0 && " Page reference is taken from the source brief and has not been independently verified."}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <button type="button" onClick={() => go(-1)} className={navBtn} aria-label="Previous photograph" data-testid="button-lightbox-prev"><ChevronLeft className="h-5 w-5" aria-hidden /></button>
                  <span className="text-xs tabular-nums text-slate-400" aria-live="polite">{(index ?? 0) + 1} / {n}</span>
                  <button type="button" onClick={() => go(1)} className={navBtn} aria-label="Next photograph" data-testid="button-lightbox-next"><ChevronRight className="h-5 w-5" aria-hidden /></button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
