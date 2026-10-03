import { ArrowUpRight } from "lucide-react";
import { AppointmentTrigger } from "./AppointmentTrigger";
import heroDesktopImage from "@/assets/dental-hero.jpg";
import heroMobileImage from "@/assets/dental-hero-mobile.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#eaf4f8] text-[#0c364e] md:min-h-screen"
    >
      {/* Background Image: Responsive for Mobile (Image 1) and Desktop (Image 2) */}
      <picture className="absolute inset-0 h-full w-full">
        <source media="(max-width: 767px)" srcSet={heroMobileImage} />
        <img
          src={heroDesktopImage}
          alt="A healthy natural smile at Dr. Divya's Ayankalam Dental Clinic"
          className="h-full w-full object-cover object-[center_top] md:object-[60%_center]"
          fetchPriority="high"
        />
      </picture>

      {/* Main Content Area */}
      <div className="site-container relative z-10 flex min-h-[100dvh] flex-col justify-end pb-12 pt-24 sm:pb-16 md:min-h-screen md:justify-center md:pb-0 md:pt-16 lg:pt-20">
        <div className="max-w-xl md:max-w-2xl">
          {/* Eyebrow / Tagline */}
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#12435e] mb-3 sm:mb-4">
            Complete dental care for the whole family
          </p>

          {/* Headline matching Images 1 & 2 */}
          <h1 className="text-[clamp(3.5rem,13vw,7.4rem)] font-extrabold tracking-tight text-[#0c364e] leading-[0.85] sm:leading-[0.82] md:leading-[0.8]">
            Healthy
            <br />
            Smiles
            <br />
            <em className="font-serif italic font-normal tracking-normal text-[#0c364e]">Start Here</em>
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-4 max-w-sm sm:max-w-md text-xs sm:text-base leading-relaxed text-[#27485e] sm:leading-6 font-medium">
            Modern dental care tailored to your needs, delivered by experienced professionals in a
            welcoming environment.
          </p>

          {/* Primary CTA Button matching Images 1 & 2 */}
          <div className="mt-6 sm:mt-8">
            <AppointmentTrigger
              className="h-auto rounded-full bg-[#bbee01] hover:bg-[#aee000] text-black hover:text-black px-6 py-3.5 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-[#bbee01]/25 hover:shadow-xl hover:shadow-[#bbee01]/30 active:scale-[0.98] transition-all inline-flex items-center gap-2.5 border-0 cursor-pointer"
            >
              <ArrowUpRight size={18} className="stroke-[2.6]" />
              <span>Book Appointment</span>
            </AppointmentTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
