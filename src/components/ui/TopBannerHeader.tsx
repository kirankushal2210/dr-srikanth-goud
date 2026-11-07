export default function TopBannerHeader() {
  return (
    <div className="w-full bg-[#F3BA16] border-b-2 border-[#15803D] shadow-sm select-none">
      <div className="mx-auto max-w-7xl">
        {/* Official Telangana Rakshana Sena (TRS) Full-Width Banner */}
        <div className="relative w-full overflow-hidden bg-[#F3BA16]">
          <img
            src={`${import.meta.env.BASE_URL}trs-header-banner.png`}
            alt="Telangana Rakshana Sena — Telangana Thalli, Martyrs Memorial, Mahatma Jyotirao Phule, Dr. B.R. Ambedkar, Prof. Jayashankar, and Smt. Kalvakuntla Kavitha"
            className="w-full h-auto max-h-[140px] sm:max-h-[160px] md:max-h-[190px] lg:max-h-[220px] object-cover sm:object-contain mx-auto"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
