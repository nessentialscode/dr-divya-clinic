import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import aboutMan from "@/assets/about-man.jpg";
import aboutWoman from "@/assets/about-woman.jpg";
import { servicesData } from "@/data/servicesData";
import { AppointmentTrigger } from "./AppointmentTrigger";

export function AboutSection() {
  return (
    <section id="about" className="site-container py-24 sm:py-32 lg:py-44">
      <div className="grid items-center gap-10 lg:grid-cols-[180px_minmax(0,1fr)_180px]">
        <img
          src={aboutMan}
          alt="Patient smiling in sunglasses"
          width={816}
          height={816}
          loading="lazy"
          className="hidden aspect-[4/3] rotate-[-6deg] rounded-lg object-cover lg:block"
        />
        <div className="text-center">
          <span className="eyebrow">About Us</span>
          <h2 className="mx-auto mt-6 max-w-4xl text-2xl font-light leading-relaxed text-muted-foreground sm:text-4xl">
            The guiding <em>principles behind every smile we create are rooted</em> in care,
            precision, trust, and a commitment to delivering <em>confidence through</em> every{" "}
            <em>experience</em> we design.
          </h2>
          <Button asChild className="mt-8">
            <a href="#services">
              <span className="grid size-7 place-items-center rounded-full bg-foreground text-background">
                →
              </span>
              Explore Our Services
            </a>
          </Button>
        </div>
        <img
          src={aboutWoman}
          alt="Patient smiling in glasses"
          width={816}
          height={816}
          loading="lazy"
          className="hidden aspect-[4/3] rotate-[6deg] rounded-lg object-cover lg:block"
        />
      </div>
    </section>
  );
}

const serviceCategoryBadge: Record<string, string> = {
  "dental-implants": "RESTORATIVE SURGERY",
  "root-canal-treatment": "ENDODONTICS",
  "braces-aligners": "ORTHODONTICS",
  "teeth-whitening": "COSMETIC DENTISTRY",
  "veneers-crowns": "AESTHETIC RESTORATION",
  "preventive-care": "GENERAL DENTISTRY",
  "periodontal-surgery": "PERIODONTICS",
  "maxillofacial-surgery": "ORAL SURGERY",
  "dentures": "PROSTHODONTICS",
  "tmj-splints": "TMJ THERAPY",
  "pediatric-dentistry": "PEDIATRIC CARE",
  "mucosal-pathology": "ORAL PATHOLOGY",
};

export function ServicesSection() {
  const [showAll, setShowAll] = useState(false);

  // 6 Services shown initially in the main screen (2 rows of 3), remaining 6 revealed on "See All"
  const visibleServices = showAll ? servicesData : servicesData.slice(0, 6);

  return (
    <section id="services" className="bg-[#edf5f0] py-20 sm:py-28 lg:py-32">
      <div className="site-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow bg-background">Services We Provide</span>
            <h2 className="section-title mt-4">
              The Guiding Care Behind Every <em>Smile We Create</em>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              From routine preventive checkups to advanced cosmetic transformations and restorative
              procedures, our clinic offers personalized dental solutions tailored to your unique
              comfort, oral health, and lasting confidence.
            </p>
            <AppointmentTrigger className="mt-5">
              <span className="flex items-center justify-center">
                <ArrowUpRight size={14} />
              </span>
              Book Consultation
            </AppointmentTrigger>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map(
            ({ title, shortCopy, image, tag, slug, dbServiceId }) => {
              const category = serviceCategoryBadge[slug] || tag.toUpperCase();

              return (
                <article
                  key={slug}
                  className="group relative flex min-h-[460px] sm:min-h-[490px] flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[32px] border border-black/10 shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {/* Procedure Photo Background */}
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark gradient overlay for high contrast and legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#d4f933] backdrop-blur-md">
                      <span className="text-[#d4f933] text-xs">✦</span>
                      <span>PROCEDURE PHOTO</span>
                    </div>

                    <div className="rounded-full border border-white/20 bg-white/20 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {category}
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 p-5 sm:p-6 pt-0">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#d4f933]">
                      {category}
                    </span>

                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-white leading-snug sm:text-[26px]">
                      <Link
                        to="/services/$slug"
                        params={{ slug }}
                        className="transition-colors hover:text-[#d4f933]"
                      >
                        {title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-white/80 line-clamp-3">
                      {shortCopy}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                        <span className="size-1.5 rounded-full bg-[#d4f933]" />
                        <span>State-of-the-art care</span>
                      </div>

                      <AppointmentTrigger
                        serviceId={dbServiceId}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f933] px-4 py-2 text-xs font-bold text-black transition-all hover:bg-[#c2e728] hover:scale-105 shadow-md"
                      >
                        <span>Book Treatment</span>
                        <ArrowUpRight size={13} className="stroke-[2.5]" />
                      </AppointmentTrigger>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>

        {/* See All / Show Less interactive toggle */}
        <div className="mt-12 flex justify-center">
          <Button
            type="button"
            size="lg"
            variant={showAll ? "outline" : "default"}
            onClick={() => {
              setShowAll((prev) => {
                const next = !prev;
                if (!next) {
                  // If collapsing, smoothly scroll back to the start of the services list
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }
                return next;
              });
            }}
            className="group px-8 py-5 text-sm font-semibold tracking-wide uppercase shadow-md transition-all duration-300 hover:shadow-lg"
          >
            {showAll ? (
              <span className="flex items-center gap-2">
                <span>SHOW LESS</span>
                <ChevronUp
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>SEE ALL</span>
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </span>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

export const CoreValues = ServicesSection;
