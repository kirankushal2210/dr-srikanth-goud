import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, FileWarning, ImageOff, Minus, Plus, RotateCcw, X } from "lucide-react";

export interface ViewerEntry {
  key: string;
  kicker: string;
  title: string;
  titleTe?: string;
  src: string | null;
  missingTitle: string;
  missingBody: string;
  meta: { k: string; v: string }[];
  description?: string;
  descriptionTe?: string;
  note: string;
}

type Props = { entries: ViewerEntry[]; index: number | null; onIndex: (i: number) => void; onClose: () => void; label: string };

const ZOOMS = [1, 1.5, 2, 3];
const btn = "grid h-10 w-10 place-items-center rounded-full border border-[#F3BA16]/50 bg-[#172554] text-white transition-colors hover:border-[#F3BA16] hover:bg-[#1E3A8A] hover:text-[#F3BA16] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#F3BA16]/40 disabled:hover:text-white";

export default function ArchiveViewer({ entries, index, onIndex, onClose, label }: Props) {
  const e = index !== null ? entries[index] : undefined;
  const n = entries.length;
  const [z, setZ] = useState(0);
  const [failed, setFailed] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => { setZ(0); setFailed(false); }, [e?.key, index]);

  const go = (d: number) => { if (index !== null && n > 1) onIndex((index + d + n) % n); };
  const canZoom = !!e?.src && !failed;
  const zoom = ZOOMS[z];

  const onKey = (ev: KeyboardEvent) => {
    if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
    const t = ev.target as HTMLElement;
    if (zoom > 1 && t.dataset.pan === "true") return; // allow native panning
    ev.preventDefault();
    ev.stopPropagation();
    go(ev.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <Dialog.Root open={!!e} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-[#0f172a]/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content onKeyDown={onKey} aria-label={label} data-testid="dialog-archive-viewer"
          onOpenAutoFocus={() => { opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; }}
          onCloseAutoFocus={(event) => { if (opener.current?.isConnected) { event.preventDefault(); opener.current.focus(); } }}
          className="fixed inset-0 z-[95] flex flex-col bg-[#172554] text-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 lg:inset-4 lg:rounded-2xl lg:border-2 lg:border-[#F3BA16]/50 shadow-2xl">
          {e && (
            <>
              <div className="flex items-center justify-between gap-3 border-b border-[#F3BA16]/30 px-4 py-3 sm:px-6 bg-[#1E3A8A]">
                <p className="truncate text-[11px] font-bold uppercase tracking-[0.22em] text-[#F3BA16]">{e.kicker}</p>
                <div className="flex items-center gap-2">
                  <button type="button" className={btn} onClick={() => setZ((v) => Math.max(0, v - 1))} disabled={!canZoom || z === 0} aria-label="Zoom out" data-testid="button-zoom-out"><Minus className="h-4 w-4" aria-hidden /></button>
                  <span className="w-12 text-center text-xs font-bold tabular-nums text-blue-100" aria-live="polite">{canZoom ? `${Math.round(zoom * 100)}%` : "--"}</span>
                  <button type="button" className={btn} onClick={() => setZ((v) => Math.min(ZOOMS.length - 1, v + 1))} disabled={!canZoom || z === ZOOMS.length - 1} aria-label="Zoom in" data-testid="button-zoom-in"><Plus className="h-4 w-4" aria-hidden /></button>
                  <button type="button" className={btn} onClick={() => setZ(0)} disabled={!canZoom || z === 0} aria-label="Reset zoom" data-testid="button-zoom-reset"><RotateCcw className="h-4 w-4" aria-hidden /></button>
                  <Dialog.Close className={`${btn} ml-2`} aria-label="Close viewer" data-testid="button-viewer-close"><X className="h-5 w-5" aria-hidden /></Dialog.Close>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 lg:grid-cols-[1.6fr_1fr]">
                <div data-pan="true" tabIndex={canZoom && zoom > 1 ? 0 : -1} aria-label={canZoom && zoom > 1 ? "Enlarged image, scroll to pan" : undefined}
                  className="relative min-h-[45dvh] overflow-auto overscroll-contain bg-[#0f172a] lg:min-h-0">
                  {e.src && !failed ? (
                    <div className="grid min-h-full place-items-center p-4" style={{ width: `${zoom * 100}%`, minWidth: "100%" }}>
                      <img key={e.key} src={e.src} alt={e.title} onError={() => setFailed(true)} draggable={false}
                        className="max-w-full select-none object-contain" style={{ maxHeight: zoom === 1 ? "72dvh" : "none", width: zoom === 1 ? "auto" : "100%" }} />
                    </div>
                  ) : (
                    <div className="grid h-full min-h-[45dvh] place-items-center p-6">
                      <div className="max-w-md rounded-xl border-2 border-dashed border-[#F3BA16]/50 bg-[#1E3A8A]/50 p-8 text-center">
                        {failed ? <FileWarning className="mx-auto h-8 w-8 text-[#F3BA16]" aria-hidden /> : <ImageOff className="mx-auto h-8 w-8 text-[#F3BA16]" aria-hidden />}
                        <p className="mt-4 font-display text-xl font-bold" role="status">{failed ? "Image could not be loaded" : e.missingTitle}</p>
                        <p className="mt-3 text-sm leading-relaxed text-blue-100">{failed ? "The file is referenced in the archive but did not load. Zoom is disabled for this record." : e.missingBody}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex min-h-0 flex-col gap-4 overflow-y-auto border-t border-[#F3BA16]/20 p-5 sm:p-7 lg:border-l lg:border-t-0">
                  <Dialog.Title className="font-display text-2xl font-bold leading-snug text-white">{e.title}</Dialog.Title>
                  {e.titleTe && <p lang="te" className="-mt-1 text-lg font-bold leading-relaxed text-[#F3BA16]">{e.titleTe}</p>}
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-y border-[#F3BA16]/20 py-4 text-sm">
                    {e.meta.map((m) => (
                      <div key={m.k} className="contents">
                        <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F3BA16]">{m.k}</dt>
                        <dd className="text-blue-100">{m.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Dialog.Description className="leading-relaxed text-blue-50">{e.description ?? e.note}</Dialog.Description>
                  {e.descriptionTe && <p lang="te" className="leading-relaxed text-[#F3BA16]">{e.descriptionTe}</p>}
                  {e.description && <p className="text-xs leading-relaxed text-blue-200">{e.note}</p>}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <button type="button" onClick={() => go(-1)} disabled={n < 2} className={btn} aria-label="Previous record" data-testid="button-viewer-prev"><ChevronLeft className="h-5 w-5" aria-hidden /></button>
                    <span className="text-xs tabular-nums text-[#B8BFBA]" aria-live="polite">Record {(index ?? 0) + 1} of {n}</span>
                    <button type="button" onClick={() => go(1)} disabled={n < 2} className={btn} aria-label="Next record" data-testid="button-viewer-next"><ChevronRight className="h-5 w-5" aria-hidden /></button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
