import MarqueeTicker from "@/components/ui/MarqueeTicker";
import { ArrowUp, ArrowUpRight, FileBadge, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { leaderProfile } from "@/data/leaderProfile";
import RepresentationForm from "./contact/RepresentationForm";

const ADDRESS = "Plat No-4NP, PRE, Es Colony, STNO-1, Opp SSPA Academy, Boduppal, Chengicherla Road, Telangana – 500092";
const PHONE = leaderProfile.contact.phone; // "+91 8886666006"
const EMAIL = leaderProfile.contact.email;
const REG = leaderProfile.contact.regNo;
const BIO = leaderProfile.contact.digitalBioUrl;
const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/Srikanthgoudtjsf", Icon: FaFacebookF },
  { label: "X", href: "https://x.com/Srikanthgoudtjsf", Icon: FaXTwitter },
  { label: "YouTube", href: "https://www.youtube.com/@Srikanthgoudtjsf", Icon: FaYoutube },
  { label: "Instagram", href: "https://www.instagram.com/Srikanthgoudtjsf/", Icon: FaInstagram },
];
const LINKS = [["top", "Home"], ["about", "About"], ["vision", "Vision"], ["journey", "Journey"], ["initiatives", "Initiatives"], ["media", "Media"], ["contact", "Contact"]];

function Monogram({ size = "h-16 w-16" }: { size?: string }) {
  return (
    <span className={`relative grid ${size} place-items-center rounded-full border border-[#CA8A04] font-display text-lg font-semibold tracking-[0.12em] text-[#A16207]`}>
      <span className="absolute inset-1.5 rounded-full border border-[#CA8A04]/40" aria-hidden />
      DSG
    </span>
  );
}

export function ContactSection() {
  const row = "flex items-start gap-4 rounded-xl p-3 -mx-3 transition hover:bg-white/[0.04]";
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-[#DFD8CB]/60 bg-transparent py-24 text-[#15241D] lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B45309]">Contact</p>
          <h2 id="contact-title" className="mt-5 font-display text-4xl font-semibold leading-[1.08] md:text-[3.4rem]">Reach the <span className="text-[#0284C7]">office</span></h2>
          <p className="mt-5 font-medium text-stone-700">Official channels of the office, listed in full. Use them directly, or prepare a written representation below and send it from your own email.</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <article className="min-w-0 rounded-2xl border border-[#DFD8CB] bg-[#FFFFFF] p-6 sm:p-8" data-testid="card-office">
            <div className="flex items-start gap-4 border-b border-[#DFD8CB] pb-6">
              <Monogram size="h-14 w-14 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">Office of Dr. Nalamasa Srikanth Goud, Ph.D.</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#A16207]">BRS State Official Spokesperson | Mahabubabad District Incharge, TRS | National Chairman, World Consumer Rights</p>
              </div>
            </div>
            <ul className="mt-5 space-y-1">
              <li><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className={row} data-testid="link-address">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#A16207]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5B52]">Office address</span><span className="mt-1 block break-words text-[15px] leading-relaxed">{ADDRESS}</span></span>
              </a></li>
              <li><a href={`tel:${PHONE.replace(/\s/g, "")}`} className={row} data-testid="link-phone">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#A16207]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5B52]">Phone</span><span className="mt-1 block text-[15px]">{PHONE}</span></span>
              </a></li>
              <li><a href={`mailto:${EMAIL}`} className={row} data-testid="link-email">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#A16207]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5B52]">Email</span><span className="mt-1 block break-all text-[15px]">{EMAIL}</span></span>
              </a></li>
              <li className="flex items-start gap-4 p-3 -mx-3" data-testid="text-bio-reg">
                <FileBadge className="mt-0.5 h-5 w-5 shrink-0 text-[#A16207]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5B52]">Bio-Data registration</span><span className="mt-1 block break-words text-[15px]">Bio-Data Reg No. {REG}</span><span className="mt-1 block text-xs text-[#4A5B52]">Reference number as printed on the bio-data certificate.</span></span>
              </li>
            </ul>
            <div className="mt-6 border-t border-[#DFD8CB] pt-6">
              <a href={BIO} target="_blank" rel="noopener noreferrer" data-testid="link-digital-bio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#A16207] underline underline-offset-4 hover:text-[#A16207]">
                Read the biography on The Leaders Page <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only">(opens in a new tab)</span>
              </a>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#4A5B52]">Social channels &middot; /Srikanthgoudtjsf</p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {SOCIAL.map(({ label, href, Icon }) => (
                  <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}: Srikanthgoudtjsf (opens in a new tab)`} data-testid={`link-social-${label.toLowerCase()}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#CA8A04]/45 text-[#15241D] transition hover:border-[#CA8A04] hover:bg-[#14532D] hover:text-[#FBF8F1]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </a></li>
                ))}
              </ul>
            </div>
          </article>
          <div className="min-w-0"><RepresentationForm to={EMAIL} /></div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-[#E3DCCE] text-[#4A5B52]">
      <div className="trs-tricolor-top" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <a href="#top" aria-label="Back to top - Dr. Nalamasa Srikanth Goud" className="inline-flex items-center gap-4 rounded-lg" data-testid="link-footer-monogram">
              <Monogram />
              <span className="font-display text-xl font-semibold text-[#15241D]">{leaderProfile.name}</span>
            </a>
            <p className="mt-8 max-w-lg font-display text-2xl italic leading-snug text-[#A16207] sm:text-[1.7rem]">Dedicated to Telangana’s Self-Respect, Prosperity, and Social Justice</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#A16207]">Quick links</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
              {LINKS.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} data-testid={`link-footer-${id}`} className="rounded text-[#4A5B52] underline-offset-4 hover:text-[#A16207] hover:underline">{label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-[#DFD8CB] pt-6 text-[13px] text-[#4A5B52] md:flex-row md:items-center md:justify-between">
          <p data-testid="text-copyright">© 2026 Office of Dr. Nalamasa Srikanth Goud. All Rights Reserved. Bio-Data Reg: TLPC-6428.</p>
          <a href="#top" data-testid="link-back-top" className="inline-flex items-center gap-2 self-start rounded font-semibold text-[#A16207] hover:underline md:self-auto">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function ContactFooter() {
  return (<><ContactSection /><MarqueeTicker id="footer" reverse /><SiteFooter /></>);
}
