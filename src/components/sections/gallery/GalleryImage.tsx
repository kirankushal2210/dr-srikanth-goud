import { useState } from "react";
import { ImageOff } from "lucide-react";
import { imageUrl, isImageAvailable, type GalleryItem } from "@/data/galleryData";

export default function GalleryImage({ item, className = "", fit = "cover" }: { item: GalleryItem; className?: string; fit?: "cover" | "contain" }) {
  const [failed, setFailed] = useState(false);
  const available = isImageAvailable(item);
  if (!available || failed) {
    return (
      <div role="img" aria-label={`${available ? "Photo could not be loaded" : "Photo not yet supplied"}: ${item.titleEn}`}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,#EDE7DD_0_14px,#E4DDD0_14px_28px)] p-6 text-center"
        data-testid={`img-missing-${item.id}`}>
        <ImageOff className="h-7 w-7 text-[#A16207]/70" aria-hidden />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A16207]">{available ? "Photo could not be loaded" : "Photo not yet supplied"}</span>
        <span className="text-[11px] text-[#4A5B52]" lang="te">{available ? "చిత్రం లోడ్ కాలేదు" : "చిత్రం ఇంకా అందలేదు"}</span>
      </div>
    );
  }
  return (
    <img src={imageUrl(item)} alt={`${item.titleEn} — ${item.titleTe}`} loading="lazy" decoding="async" onError={() => setFailed(true)}
      className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${className}`} data-testid={`img-gallery-${item.id}`} />
  );
}
