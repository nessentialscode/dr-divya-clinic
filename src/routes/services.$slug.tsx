import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Sparkles,
  Stethoscope,
  CalendarCheck,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { getServiceBySlug, servicesData } from "@/data/servicesData";
import { Header } from "@/components/dental/Header";
import { NewsletterFooter } from "@/components/dental/PricingFooter";
import { AppointmentTrigger } from "@/components/dental/AppointmentTrigger";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.service
      ? `${loaderData.service.title} — Dr. Divya's Dental Clinic`
      : "Dental Service Details — Dr. Divya's Dental Clinic";
    const desc =
      loaderData?.service?.shortCopy || "Comprehensive modern dental service explained in detail.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ServiceDetailComponent,
  notFoundComponent: ServiceNotFoundComponent,
});

function ServiceNotFoundComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header mode="sticky" />
      <div className="site-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="eyebrow bg-secondary">Service Not Found</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          We couldn't locate this dental service
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          The service you are looking for might have been moved or renamed. Please browse our full
          directory of dental treatments.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
      <NewsletterFooter />
    </div>
  );
}

function ServiceDetailComponent() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;

  // Other services for bottom recommendation cards
  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header mode="sticky" />

      <main className="overflow-hidden">
        {/* Breadcrumb & Navigation Bar */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border/60 bg-secondary/60 py-3.5 backdrop-blur"
        >
          <div className="site-container flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight size={14} className="opacity-50" />
              <Link to="/services" className="transition-colors hover:text-foreground">
                Services
              </Link>
              <ChevronRight size={14} className="opacity-50" />
              <span className="truncate text-foreground font-semibold">{service.title}</span>
            </div>

            <Link
              to="/"
              hash="services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
            >
              <ArrowLeft size={13} />
              Back to Services Overview
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fefde8] via-secondary/70 to-background py-14 sm:py-20 lg:py-24">
          <div className="site-container">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow bg-background shadow-xs">{service.heroBadge}</span>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-foreground">
                    {service.tag}
                  </span>
                </div>

                <h1 className="mt-5 text-3xl font-medium tracking-tight text-foreground sm:text-5xl lg:leading-[1.15]">
                  {service.headline}
                </h1>

                <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {service.fullDescription}
                </p>

                {/* Quick Info Badges */}
                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-background/80 px-3.5 py-2 backdrop-blur">
                    <Clock size={16} className="text-primary" />
                    <span>
                      <strong className="font-semibold text-foreground">Duration:</strong>{" "}
                      {service.estimatedDuration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-background/80 px-3.5 py-2 backdrop-blur">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>
                      <strong className="font-semibold text-foreground">Suitability:</strong>{" "}
                      {service.idealFor}
                    </span>
                  </div>
                </div>

                {/* Consultation CTAs */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <AppointmentTrigger
                    serviceId={service.dbServiceId}
                    {...(service.recommendedSpecialists[0]
                      ? { specialistId: service.recommendedSpecialists[0].id }
                      : {})}
                    size="lg"
                    className="gap-2 text-sm shadow-md"
                  >
                    <CalendarCheck size={16} />
                    Book Consultation for {service.title}
                  </AppointmentTrigger>

                  <Button variant="outline" size="lg" asChild>
                    <a href="#procedures">Explore Treatment Details</a>
                  </Button>
                </div>
              </div>

              {/* Right Column: Hero Visual Image Card */}
              <div className="relative lg:col-span-5">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-primary/25 bg-muted shadow-2xl sm:aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-background/90 p-3.5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{service.title}</div>
                        <div className="text-[11px] text-muted-foreground">
                          Dr. Divya's Dental Clinic
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                      Verified Treatment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights Grid */}
        <section className="border-y border-border/70 bg-secondary/50 py-10">
          <div className="site-container">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-4 shadow-2xs"
                >
                  <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-xs font-medium leading-relaxed text-foreground sm:text-sm">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Symptoms / When You Need It & Benefits Section */}
        <section className="site-container py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Symptoms Column */}
            <div className="lg:col-span-6">
              <span className="eyebrow bg-secondary">Recognize the Signs</span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                When Do You Need This <em>Treatment?</em>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {service.whyImportant}
              </p>

              <div className="mt-8 space-y-3.5">
                {service.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-primary/20 bg-secondary/60 p-4 transition-colors hover:border-primary/40"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                    <span className="text-sm font-medium text-foreground">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Column */}
            <div className="lg:col-span-6">
              <span className="eyebrow bg-secondary">Clinical Outcomes</span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Key Benefits & <em>Lasting Value</em>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Under the careful hands of our certified specialists, our clinical protocols are
                designed for utmost longevity, natural aesthetics, and absolute peace of mind.
              </p>

              <div className="mt-8 space-y-3.5">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-primary/20 bg-background p-4 shadow-2xs transition-colors hover:border-primary/40"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Procedures Included Breakdown */}
        <section id="procedures" className="bg-[#fefde8] py-16 sm:py-24">
          <div className="site-container">
            <div className="max-w-2xl">
              <span className="eyebrow bg-background">Treatment Solutions</span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-4xl">
                Procedures Included in <em>{service.title}</em>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We customize each treatment according to your individual dental condition, aesthetic
                preference, and long-term oral health goals.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {service.procedures.map((proc, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-primary/25 bg-background p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-xs font-bold text-foreground">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">{proc.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {proc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Procedure Journey */}
        <section className="site-container py-16 sm:py-24">
          <div className="text-center">
            <span className="eyebrow">Your Treatment Journey</span>
            <h2 className="mt-4 text-2xl font-semibold sm:text-4xl">
              What to Expect: <em>Step-by-Step</em>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Clear, transparent, and comfortable care from your initial consultation to
              post-treatment follow-up.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.procedureSteps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-xl border border-border/80 bg-secondary/60 p-6"
              >
                <div>
                  <span className="text-3xl font-bold tracking-tight text-primary/80">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assigned Specialists for this service */}
        <section className="border-t border-border/70 bg-secondary/40 py-16 sm:py-20">
          <div className="site-container">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="eyebrow bg-background">Expert Guidance</span>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  Specialists for <em>{service.title}</em>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our certified surgeons and consultants provide specialized care for this
                  treatment.
                </p>
              </div>

              <AppointmentTrigger
                serviceId={service.dbServiceId}
                {...(service.recommendedSpecialists[0]
                  ? { specialistId: service.recommendedSpecialists[0].id }
                  : {})}
                className="self-start md:self-auto"
              >
                Book with Recommended Doctor
              </AppointmentTrigger>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.recommendedSpecialists.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-xl border border-primary/20 bg-background p-5 shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 place-items-center rounded-full bg-primary/20 text-foreground font-semibold">
                      <Stethoscope size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">{doc.role}</div>
                    </div>
                  </div>

                  <AppointmentTrigger
                    serviceId={service.dbServiceId}
                    specialistId={doc.id}
                    variant="outline"
                    size="sm"
                    className="text-xs font-semibold"
                  >
                    Select
                  </AppointmentTrigger>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="site-container py-16 sm:py-20">
            <div className="max-w-2xl">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Got Questions About <em>{service.title}?</em>
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-background p-5 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Services Navigation Carousel / Grid */}
        <section className="border-t border-border/70 bg-secondary/30 py-16">
          <div className="site-container">
            <div className="flex items-center justify-between">
              <div>
                <span className="eyebrow bg-background">Explore More</span>
                <h2 className="mt-3 text-xl font-semibold sm:text-2xl">Other Dental Services</h2>
              </div>
              <Button variant="ghost" asChild className="text-xs sm:text-sm">
                <Link to="/services">
                  All Services <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  to="/services/$slug"
                  params={{ slug: item.slug }}
                  className="group flex flex-col justify-between rounded-xl border border-border/80 bg-background p-5 shadow-2xs transition duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                      {item.tag}
                    </span>
                    <h3 className="mt-3 text-base font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                      {item.shortCopy}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                    <span>Read Explanation</span>
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Booking Banner */}
        <section className="bg-footer text-hero-foreground py-16 sm:py-20">
          <div className="site-container text-center">
            <h2 className="text-2xl font-light sm:text-4xl">
              Ready to Experience Gentle, Modern Care for{" "}
              <em className="font-serif italic">{service.title}?</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-hero-foreground/80 sm:text-base">
              Schedule your appointment online in under 60 seconds or speak directly with our
              friendly clinical coordinators.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <AppointmentTrigger
                serviceId={service.dbServiceId}
                {...(service.recommendedSpecialists[0]
                  ? { specialistId: service.recommendedSpecialists[0].id }
                  : {})}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Schedule Appointment Now
              </AppointmentTrigger>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-transparent text-hero-foreground hover:bg-white/10"
                asChild
              >
                <Link to="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  );
}
