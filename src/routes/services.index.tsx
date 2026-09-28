import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { Header } from "@/components/dental/Header";
import { NewsletterFooter } from "@/components/dental/PricingFooter";
import { AppointmentTrigger } from "@/components/dental/AppointmentTrigger";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "All Dental Services — Dr. Divya's Family Dental Clinic" },
      {
        name: "description",
        content:
          "Explore our complete range of specialized dental treatments: preventive care, cosmetic smile design, orthodontics, implants, and teeth whitening.",
      },
    ],
  }),
  component: ServicesIndexComponent,
});

function ServicesIndexComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header mode="sticky" />

      <main className="overflow-hidden">
        {/* Services Directory Hero */}
        <section className="bg-gradient-to-b from-[#fefde8] to-background py-16 sm:py-24">
          <div className="site-container text-center">
            <span className="eyebrow bg-background">Complete Care Spectrum</span>
            <h1 className="section-title mx-auto mt-4 max-w-3xl">
              Explore Our Comprehensive <em>Dental Treatments</em>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every smile is unique. Click on any service below to explore detailed
              clinical explanations, procedure breakdowns, symptom checklists, and
              specialist recommendations.
            </p>
          </div>
        </section>

        {/* Services List with Detailed Cards */}
        <section className="site-container pb-24 sm:pb-32">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/20 bg-secondary/60 shadow-xs transition duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
                >
                  <div>
                    {/* Image with Tag */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full border border-background/40 bg-background/90 px-3 py-0.5 text-xs font-semibold text-foreground backdrop-blur-md">
                        {service.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-background text-foreground shadow-2xs">
                          <Icon size={20} strokeWidth={1.7} />
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight text-foreground">
                          {service.title}
                        </h2>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {service.shortCopy}
                      </p>

                      <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                        {service.keyHighlights.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Sparkles size={12} className="text-primary shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-border/70 bg-background/50 px-6 py-4 backdrop-blur">
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors group-hover:text-primary"
                    >
                      <span>View Full Details</span>
                      <ArrowRight size={13} className="transition duration-200 group-hover:translate-x-1" />
                    </Link>

                    <AppointmentTrigger
                      serviceId={service.dbServiceId}
                      {...(service.recommendedSpecialists[0]
                        ? { specialistId: service.recommendedSpecialists[0].id }
                        : {})}
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium"
                    >
                      Book <ArrowUpRight size={12} className="ml-1" />
                    </AppointmentTrigger>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  );
}
