import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, Calendar, CheckCircle2, ShieldCheck, Sparkles, X, ZoomIn } from "lucide-react";
import { KAVITHA_HIGHLIGHTS, type KavithaHighlight } from "@/data/kavithaData";

export default function KavithaAssociation() {
  const [selectedPhoto, setSelectedPhoto] = useState<KavithaHighlight | null>(null);
  const [viewMode, setViewMode] = useState<"photo" | "doc">("photo");

  return (
    <section
      id="association"
      aria-labelledby="association-title"
      className="relative border-t-4 border-[#1E3A8A] bg-gradient-to-b from-[#ECC224] via-[#F5C619] to-[#DFAB14] py-24 text-[#172554] lg:py-32"
    >
      {/* Clearly visible TRS official flag watermark in the background of this section */}
      <div
        className="pointer-events-none absolute right-4 top-12 h-[420px] w-80 opacity-[0.20] select-none"
        aria-hidden="true"
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/trs-official-flag.png`}
          alt="TRS Official Flag"
          className="h-full w-full object-contain rounded-2xl drop-shadow-lg"
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header with Clearly Visible Official Flag Badge */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b-2 border-[#1E3A8A]/30 pb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E3A8A] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1E3A8A] shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
              Leadership &amp; Association Record
            </div>

            <h2
              id="association-title"
              className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#172554] sm:text-4xl lg:text-5xl"
            >
              Association with{" "}
              <span className="text-[#1E3A8A] underline decoration-[#15803D] decoration-4 underline-offset-8">
                Kalvakuntla Kavitha
              </span>
            </h2>

            <p lang="te" className="mt-3 text-lg font-bold text-[#15803D] sm:text-xl">
              శ్రీమతి కల్వకుంట్ల కవిత గారితో ఉన్నత సమన్వయం &amp; ప్రజా పోరాటాల స్ఫూర్తి
            </p>

            <p className="mt-4 text-base font-semibold leading-relaxed text-[#172554] sm:text-lg">
              Historical chronicles of strategic meetings, statewide agitations, Janam Baata reviews, and public celebrations alongside
              Telangana leader Smt. Kalvakuntla Kavitha—championing youth rights, BC representation, and grassroots governance.
            </p>
          </div>

          {/* Clearly Visible TRS Flag Spotlight Card */}
          <div className="flex items-center gap-3.5 rounded-2xl border-2 border-[#1E3A8A] bg-white p-3.5 shadow-xl shrink-0 self-start md:self-auto">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/trs-official-flag.png`}
              alt="Telangana Rakshana Sena Official Flag"
              className="h-16 w-auto rounded-lg object-contain shadow-sm"
            />
            <div className="text-left">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#15803D]">Party Emblem &amp; Flag</span>
              <span lang="te" className="block text-sm font-bold text-[#172554]">తెలంగాణ రక్షణ సేన</span>
              <span className="block text-[11px] font-semibold text-stone-600">TELANGANA RAKSHANA SENA</span>
            </div>
          </div>
        </div>

        {/* Responsive Grid of 8 Cards (30% Deep Royal Blue Containers with Gold/Green Accents) */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {KAVITHA_HIGHLIGHTS.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border-3 border-[#F5C619] bg-[#1E3A8A] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-2xl hover:shadow-[#172554]/50"
            >
              {/* Top Accent Ribbon */}
              <div className="h-2 w-full bg-gradient-to-r from-[#F5C619] via-[#15803D] to-[#F5C619]" />

              {/* Image Frame with Aspect Ratio & Zoom Transition */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-stone-900 cursor-pointer"
                onClick={() => { setSelectedPhoto(item); setViewMode("photo"); }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                  alt={`${item.title} - Dr. Nalamasa Srikanth Goud with Smt. Kalvakuntla Kavitha`}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient vignette for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#172554] via-transparent to-black/20" />

                {/* Milestone Badge (10% Emerald Green Accent) */}
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#15803D] px-3.5 py-1 text-xs font-bold text-white shadow-md border border-[#F5C619]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#F5C619]" />
                    {item.milestone}
                  </span>
                </div>

                {/* Zoom Hint Icon */}
                <button
                  type="button"
                  onClick={() => { setSelectedPhoto(item); setViewMode("photo"); }}
                  aria-label={`View enlarged photo: ${item.title}`}
                  className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#F5C619] text-[#172554] shadow-lg transition-transform duration-300 group-hover:scale-110 hover:bg-yellow-300"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
              </div>

              {/* Card Content (Deep Royal Blue Container) */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F5C619]">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-blue-200">
                      Record #{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-white sm:text-2xl group-hover:text-[#F5C619] transition-colors">
                    {item.title}
                  </h3>

                  <p lang="te" className="mt-1 text-base font-bold text-[#F5C619]">
                    {item.titleTe}
                  </p>

                  <p className="mt-3.5 text-sm leading-relaxed text-blue-100 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>

                {item.teluguNote && (
                  <div className="mt-5 rounded-xl border border-[#F5C619]/40 bg-[#172554]/90 p-4">
                    <p lang="te" className="text-xs font-medium leading-relaxed text-yellow-100">
                      {item.teluguNote}
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Full Aspect Photo & Document Inspection */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-2xl border-3 border-[#F5C619] bg-[#172554] text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-blue-800 bg-[#1E3A8A] px-5 py-4">
                <div>
                  <span className="inline-block rounded-full bg-[#15803D] px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider border border-[#F5C619]">
                    {selectedPhoto.milestone}
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                    {selectedPhoto.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  {selectedPhoto.docImage && (
                    <div className="inline-flex rounded-lg border border-[#F5C619] p-0.5 bg-[#172554]">
                      <button
                        type="button"
                        onClick={() => setViewMode("photo")}
                        className={`rounded px-2.5 py-1 text-xs font-bold transition ${viewMode === "photo" ? "bg-[#F5C619] text-[#172554]" : "text-white"}`}
                      >
                        Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("doc")}
                        className={`rounded px-2.5 py-1 text-xs font-bold transition ${viewMode === "doc" ? "bg-[#F5C619] text-[#172554]" : "text-white"}`}
                      >
                        Document Card
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Close preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-[62vh] overflow-auto bg-black/50 p-4 text-center">
                <img
                  src={`${import.meta.env.BASE_URL}${(viewMode === "doc" && selectedPhoto.docImage ? selectedPhoto.docImage : selectedPhoto.image).replace(/^\//, '')}`}
                  alt={selectedPhoto.title}
                  className="mx-auto max-h-[58vh] w-auto rounded-lg object-contain shadow-xl"
                />
              </div>

              <div className="p-5 sm:p-6 bg-[#172554]">
                <p lang="te" className="text-base font-bold text-[#F5C619]">
                  {selectedPhoto.titleTe}
                </p>
                <p className="mt-1 text-sm text-blue-100 sm:text-base leading-relaxed">
                  {selectedPhoto.description}
                </p>
                {selectedPhoto.teluguNote && (
                  <p lang="te" className="mt-2 text-xs font-medium text-yellow-100 border-t border-white/10 pt-2">
                    {selectedPhoto.teluguNote}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
