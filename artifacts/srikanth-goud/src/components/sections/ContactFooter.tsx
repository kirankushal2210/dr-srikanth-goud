import MarqueeTicker from "@/components/ui/MarqueeTicker";
import { ArrowUp, ArrowUpRight, FileBadge, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { leaderProfile } from "@/data/leaderProfile";
import RepresentationForm from "./contact/RepresentationForm";

const ADDRESS = "Plat No-4NP, PRE, Es Colony, STNO-1, Opp SSPA Academy, Boduppal, Chengicherla Road, Telangana – 500092";
const PHONE = leaderProfile.contact.phone; // "+91 8886666006"
const REG = leaderProfile.contact.regNo;
const BIO = leaderProfile.contact.digitalBioUrl;
const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/Srikanthgoudtjsf", Icon: FaFacebookF },
  { label: "X", href: "https://x.com/Srikanthgoudtjsf", Icon: FaXTwitter },
  { label: "YouTube", href: "https://www.youtube.com/@Srikanthgoudtjsf", Icon: FaYoutube },
  { label: "Instagram", href: "https://www.instagram.com/Srikanthgoudtjsf/", Icon: FaInstagram },
];
const LINKS = [
  ["top", "Home"],
  ["association", "Kavitha Association"],
  ["about", "About"],
  ["vision", "Vision"],
  ["journey", "Journey"],
  ["initiatives", "Initiatives"],
  ["media", "Media"],
  ["contact", "Contact"],
];

function Monogram({ size = "h-16 w-16" }: { size?: string }) {
  return (
    <span className={`relative grid ${size} place-items-center rounded-full border-2 border-[#F3BA16] bg-[#172554] font-display text-lg font-bold tracking-[0.12em] text-[#F3BA16] shadow-md`}>
      <span className="absolute inset-1.5 rounded-full border border-[#F3BA16]/40" aria-hidden />
      DSG
    </span>
  );
}

export function ContactSection() {
  const row = "flex items-start gap-4 rounded-xl p-3 -mx-3 transition hover:bg-[#1E3A8A]/[0.06]";
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t-2 border-[#F3BA16]/40 bg-transparent py-24 text-[#15241D] lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#15803D]">Official Contact</p>
          <h2 id="contact-title" className="mt-4 font-display text-4xl font-bold leading-[1.08] text-[#172554] md:text-[3.2rem]">
            Reach the <span className="text-[#1E3A8A]">Secretariat</span>
          </h2>
          <p className="mt-4 font-medium text-stone-700">Official channels of the office, listed in full. Reach out by phone, visit the camp office in Boduppal, or register an official citizen representation below.</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <article className="min-w-0 rounded-2xl border-2 border-[#F3BA16]/50 bg-white p-6 shadow-xl sm:p-8" data-testid="card-office">
            <div className="flex items-start gap-4 border-b border-stone-200 pb-6">
              <Monogram size="h-14 w-14 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold leading-snug text-[#172554] sm:text-2xl">Office of Dr. Nalamasa Srikanth Goud, Ph.D.</h3>
                <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#1E3A8A]">Telangana Rakshana Sena (TRS) State Official Spokesperson | Mahabubabad District Incharge, TRS | National Chairman, World Consumer Rights</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2">
              <li><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className={row} data-testid="link-address">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.16em] text-stone-600">Office address</span><span className="mt-1 block break-words text-[15px] font-medium leading-relaxed">{ADDRESS}</span></span>
              </a></li>
              <li><a href={`tel:${PHONE.replace(/\s/g, "")}`} className={row} data-testid="link-phone">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.16em] text-stone-600">Phone</span><span className="mt-1 block text-[15px] font-bold text-[#172554]">{PHONE}</span></span>
              </a></li>
              <li className="flex items-start gap-4 p-3 -mx-3" data-testid="text-bio-reg">
                <FileBadge className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden />
                <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.16em] text-stone-600">Bio-Data registration</span><span className="mt-1 block break-words text-[15px] font-semibold">Bio-Data Reg No. {REG}</span><span className="mt-0.5 block text-xs text-stone-500">Official reference printed on bio-data certificate.</span></span>
              </li>
            </ul>
            <div className="mt-6 border-t border-stone-200 pt-6">
              <a href={BIO} target="_blank" rel="noopener noreferrer" data-testid="link-digital-bio" className="inline-flex items-center gap-2 text-sm font-bold text-[#1E3A8A] underline underline-offset-4 hover:text-[#172554]">
                Read verified biography on The Leaders Page <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only">(opens in a new tab)</span>
              </a>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-stone-600">Official Social Media &middot; /Srikanthgoudtjsf</p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {SOCIAL.map(({ label, href, Icon }) => (
                  <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}: Srikanthgoudtjsf (opens in a new tab)`} data-testid={`link-social-${label.toLowerCase()}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-stone-300 bg-white text-[#172554] shadow-xs transition hover:border-[#F3BA16] hover:bg-[#1E3A8A] hover:text-white">
                    <Icon className="h-4 w-4" aria-hidden />
                  </a></li>
                ))}
              </ul>
            </div>
          </article>
          <div className="min-w-0"><RepresentationForm /></div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t-4 border-[#F3BA16] bg-[#172554] text-white">
      {/* Tricolor Ribbon on Footer Top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#F3BA16] via-[#15803D] to-[#1E3A8A]" aria-hidden />
      
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#top" aria-label="Back to top - Dr. Nalamasa Srikanth Goud" className="inline-flex items-center gap-4 rounded-lg" data-testid="link-footer-monogram">
                <Monogram />
                <span className="font-display text-2xl font-bold text-white">{leaderProfile.name}</span>
              </a>
              {/* Official TRS Emblem in Footer */}
              <div className="h-12 w-auto overflow-hidden rounded border border-[#F3BA16]/40 shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/trs-official-emblem.png`}
                  alt="Telangana Rakshana Sena"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            <p className="mt-6 max-w-lg font-serif text-xl italic leading-snug text-[#F3BA16] sm:text-2xl">
              "Dedicated to Telangana’s Self-Respect, Prosperity, and Social Justice"
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {leaderProfile.titles.map((title) => (
                <span key={title} className="rounded-full border border-[#F3BA16]/40 bg-[#1E3A8A] px-3.5 py-1 text-xs font-bold text-white shadow-xs">
                  {title}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3BA16]">Quick navigation</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-blue-100">
                {LINKS.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="transition hover:text-[#F3BA16] hover:underline underline-offset-4">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-blue-900/80 pt-6 text-xs text-blue-200">
              <p>&copy; {new Date().getFullYear()} Office of Dr. Nalamasa Srikanth Goud &middot; Telangana Rakshana Sena (TRS).</p>
              <a href="#top" className="inline-flex items-center gap-1.5 font-bold text-[#F3BA16] hover:underline">
                Back to top <ArrowUp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ContactFooter() {
  return (
    <>
      <ContactSection />
      <MarqueeTicker id="footer" reverse />
      <SiteFooter />
    </>
  );
}
