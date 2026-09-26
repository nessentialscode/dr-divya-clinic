import { HeartPulse, Layers, ShieldCheck, Smile, Sparkles, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutMan from "@/assets/about-man.jpg";
import aboutWoman from "@/assets/about-woman.jpg";
import servicePreventive from "@/assets/service-preventive.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";
import serviceOrtho from "@/assets/service-ortho.jpg";
import serviceRestorative from "@/assets/service-restorative.jpg";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceWhitening from "@/assets/service-whitening.jpg";

const services = [
  {
    title: "General & Preventive Care",
    copy: "Routine checkups, gentle cleanings, digital diagnostics, and fluoride treatments to preserve natural teeth.",
    icon: ShieldCheck,
    image: servicePreventive,
    tag: "Preventive",
  },
  {
    title: "Cosmetic Smile Design",
    copy: "Custom porcelain veneers, aesthetic composite bonding, and full smile enhancements crafted for you.",
    icon: Sparkles,
    image: serviceCosmetic,
    tag: "Cosmetic",
  },
  {
    title: "Orthodontics & Aligners",
    copy: "Precision clear aligners and modern corrective solutions to straighten teeth seamlessly and comfortably.",
    icon: Smile,
    image: serviceOrtho,
    tag: "Orthodontics",
  },
  {
    title: "Restorative Dentistry",
    copy: "Durable tooth-colored fillings, custom porcelain crowns, and long-lasting bridges restoring bite strength.",
    icon: Layers,
    image: serviceRestorative,
    tag: "Restorative",
  },
  {
    title: "Dental Implants & Surgery",
    copy: "Permanent titanium implant placements, gentle wisdom teeth extractions, and bone reconstruction.",
    icon: HeartPulse,
    image: serviceImplants,
    tag: "Surgical",
  },
  {
    title: "Teeth Whitening & Hygiene",
    copy: "Professional in-office laser whitening and custom home kits for a vibrant, stain-free radiant smile.",
    icon: WandSparkles,
    image: serviceWhitening,
    tag: "Whitening",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="site-container py-24 sm:py-32 lg:py-44">
      <div className="grid items-center gap-10 lg:grid-cols-[180px_minmax(0,1fr)_180px]">
        <img src={aboutMan} alt="Patient smiling in sunglasses" width={816} height={816} loading="lazy" className="hidden aspect-[4/3] rotate-[-6deg] rounded-lg object-cover lg:block" />
        <div className="text-center">
          <span className="eyebrow">About Us</span>
          <h2 className="mx-auto mt-6 max-w-4xl text-2xl font-light leading-relaxed text-muted-foreground sm:text-4xl">
            The guiding <em>principles behind every smile we create are rooted</em> in care, precision, trust, and a commitment to delivering <em>confidence through</em> every <em>experience</em> we design.
          </h2>
          <Button asChild className="mt-8"><a href="#services"><span className="grid size-7 place-items-center rounded-full bg-foreground text-background">→</span>Explore Our Services</a></Button>
        </div>
        <img src={aboutWoman} alt="Patient smiling in glasses" width={816} height={816} loading="lazy" className="hidden aspect-[4/3] rotate-[6deg] rounded-lg object-cover lg:block" />
      </div>
    </section>
  );
}

export function ServicesSection() {
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
              From routine preventive checkups to advanced cosmetic transformations and restorative procedures, our clinic offers personalized dental solutions tailored to your unique comfort, oral health, and lasting confidence.
            </p>
            <Button asChild className="mt-5">
              <a href="#newsletter">
                <span className="grid size-7 place-items-center rounded-full bg-foreground text-background">→</span>
                Book Consultation
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map(({ title, copy, icon: Icon, image, tag }) => (
            <article
              key={title}
              className="group flex flex-col overflow-hidden rounded-xl border border-primary/20 bg-secondary transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row"
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
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
                  <span>View Details</span>
                  <span className="transition duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const CoreValues = ServicesSection;