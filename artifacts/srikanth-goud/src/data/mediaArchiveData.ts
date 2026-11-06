import { allGalleryItems, isImageAvailable, imageUrl, pageLabel } from "@/data/galleryData";

export const DATE_NOT_RECORDED = "Date not recorded";
export const PLACE_NOT_RECORDED = "Place not recorded";

export const assetUrl = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${p}`;

export interface PressEntry {
  id: string;
  publisher: string;
  date: string | null;
  headlineTe: string;
  headlineEn: string | null;
  /** True when the English line is our plain translation, not a supplied heading. */
  enIsTranslation?: boolean;
  /** Original clipping extracted from the biodata PDF, at source resolution. Null = not available. */
  scan: string | null;
  thumb: string | null;
  sourcePage: number | null;
}

export const pressEntries: PressEntry[] = [
  { id: "sakshi", publisher: "Sakshi", date: "22 May 2026", headlineTe: "టీఆర్ఎస్ జిల్లా ఇన్చార్జ్ గా శ్రీకాంత్ గౌడ్", headlineEn: "Appointed Mahabubabad District Incharge", scan: "/media/press/sakshi.jpg", thumb: "/media/thumbs/sakshi.jpg", sourcePage: 54 },
  { id: "dd9-vaartha", publisher: "DD9 Vaartha", date: "21 May 2026", headlineTe: "జెండా పండుగకు జిల్లా ఇంచార్జిగా డాక్టర్ నలమాస శ్రీకాంత్ గౌడ్ - అర్మూర్, బాల్కొండ అదనపు బాధ్యతలు", headlineEn: "District flag festival incharge; additional responsibilities for Armur and Balkonda", enIsTranslation: true, scan: "/media/press/dd9.jpg", thumb: "/media/thumbs/dd9.jpg", sourcePage: 55 },
  { id: "thovva", publisher: "Thovva News", date: "04 June 2026", headlineTe: "తెలంగాణ రక్షణ సేన నే ప్రత్యామ్నాయం", headlineEn: "Ground rally at Shadi Khana, Mahabubabad", scan: "/media/press/thovva.jpg", thumb: "/media/thumbs/thovva.jpg", sourcePage: 54 },
  { id: "prabatha", publisher: "Prabatha Vartha", date: null, headlineTe: "సామాజిక దూరంతో కరోనా నియంత్రణ - నిత్యావసర సరుకుల పంపిణీ", headlineEn: "COVID-19 Relief", scan: "/media/press/prabatha.jpg", thumb: "/media/thumbs/prabatha.jpg", sourcePage: 55 },
  { id: "major-praja", publisher: "Major News / Praja Jyothi", date: null, headlineTe: "హైదరాబాద్ సెంట్రల్ యూనివర్సిటీలో ఓబీసీ విద్యార్థుల సత్యాగ్రహ దీక్షకు సంఘీభావం", headlineEn: "Solidarity with HCU OBC students Satyagraha", scan: "/media/press/hcu.jpg", thumb: "/media/thumbs/hcu.jpg", sourcePage: 59 },
];

export type PhotoCategory = "all" | "mentorship" | "leadership" | "agitations" | "devotional" | "cadre" | "welfare";
type Cat = Exclude<PhotoCategory, "all">;

export const photoCategories: { id: PhotoCategory; label: string }[] = [
  { id: "all", label: "All records" },
  { id: "mentorship", label: "Mentorship with Smt. Kalvakuntla Kavitha" },
  { id: "leadership", label: "Other Leadership" },
  { id: "agitations", label: "Public Agitations" },
  { id: "devotional", label: "Devotional Visits" },
  { id: "cadre", label: "Cadre Assemblies" },
  { id: "welfare", label: "Welfare & Relief" },
];

export interface PhotoRecord {
  id: string;
  cat: Cat;
  titleEn: string;
  titleTe?: string;
  descriptionEn?: string;
  descriptionTe?: string;
  location: string;
  sourceLabel: string;
  src: string;
  thumb?: string;
  kind: "pdf-page" | "pdf-photo" | "screenshot";
  available: boolean;
}

const pdfPage = (n: number): PhotoRecord => {
  const cat: Cat = n <= 16 ? "leadership" : n <= 21 ? "mentorship" : "cadre";
  const titleEn = n <= 16 ? `Leadership meetings — source page ${n}`
    : n <= 21 ? `Mentorship with Smt. Kalvakuntla Kavitha — source page ${n}`
    : `Field & organisational activities — source page ${n}`;
  return {
    id: `pdf-page-${n}`, cat, titleEn, location: PLACE_NOT_RECORDED, sourceLabel: `Biodata PDF p. ${n}`,
    src: assetUrl(`/media/photos/page-${n}.jpg`), thumb: assetUrl(`/media/thumbs/page-${n}.jpg`), kind: "pdf-page", available: true,
  };
};

const devotional = (slug: string, en: string, te: string, place: string, page: number): PhotoRecord => ({
  id: `pdf-${slug}`, cat: "devotional", titleEn: en, titleTe: te, location: place, sourceLabel: `Biodata PDF p. ${page}`,
  src: assetUrl(`/media/photos/${slug}.jpg`), thumb: assetUrl(`/media/thumbs/${slug}.jpg`), kind: "pdf-photo", available: true,
});

const MENTORSHIP_IDS = new Set(["phd-presentation", "archive-5"]);

/** Legacy supplied screenshots that actually exist on disk. Missing legacy records are not displayed (source data untouched). */
const legacy: PhotoRecord[] = allGalleryItems.filter(isImageAvailable).map((i) => ({
  id: i.id,
  cat: MENTORSHIP_IDS.has(i.id) ? "mentorship" : (i.category === "all" ? "leadership" : i.category),
  titleEn: i.titleEn, titleTe: i.titleTe, descriptionEn: i.descriptionEn, descriptionTe: i.descriptionTe,
  location: i.location, sourceLabel: pageLabel(i), src: imageUrl(i), kind: "screenshot", available: true,
}));

export const photoRecords: PhotoRecord[] = [
  devotional("medaram", "Medaram Sammakka Sarakka Jatara visit", "మేడారం సమ్మక్క సారక్క జాతర దర్శనం", "Medaram", 52),
  devotional("yadadri", "Yadadri Sri Lakshmi Narasimha Swamy visit", "యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి దర్శనం", "Yadadri", 52),
  devotional("bhadradri", "Bhadradri visit", "భద్రాద్రి సందర్శన", "Bhadradri", 53),
  ...Array.from({ length: 28 }, (_, k) => pdfPage(15 + k)),
  ...legacy,
];
