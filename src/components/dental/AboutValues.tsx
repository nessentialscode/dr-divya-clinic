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

export function ServicesSection() {
  const [showAll, setShowAll] = useState(false);

  // 6 Services shown initially in the main screen, remaining 6 revealed on "See All"
  const visibleServices = showAll ? servicesData : servicesData.slice(0, 6);

  return (
    <section id="services" className="bg-[#fefde8] py-20 sm:py-28 lg:py-32">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {visibleServices.map(
            ({ title, shortCopy, icon: Icon, image, tag, slug, dbServiceId }) => (
              <article
                key={slug}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/20 bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-48 md:w-56">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-background/40 bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur-md">
                    {tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-lg border border-primary/30 bg-background/80 text-foreground">
                        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-semibold leading-snug">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{shortCopy}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      to="/services/$slug"
                      params={{ slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors group-hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      <span>View Details</span>
                      <span className="transition duration-200 group-hover:translate-x-1">→</span>
                    </Link>

                    <AppointmentTrigger
                      serviceId={dbServiceId}
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/80"
                    >
                      Book Now <ArrowUpRight size={12} className="ml-1" />
                    </AppointmentTrigger>
                  </div>
                </div>
              </article>
            ),
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
