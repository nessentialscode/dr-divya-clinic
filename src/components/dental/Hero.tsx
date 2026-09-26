import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/dental-hero.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden bg-footer text-hero-foreground md:min-h-screen">
      <img
        src={heroImage}
        alt="A healthy natural smile"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[60%_25%] md:object-[58%_center]"
      />
      <div className="hero-shade absolute inset-0" />
      <div className="site-container relative z-10 flex min-h-[100dvh] items-end pb-8 pt-24 sm:pb-12 md:min-h-screen md:items-center md:pb-10 md:pt-20">
        <div className="max-w-2xl pb-2 pt-0 md:pb-10 md:pt-12">
          <h1 className="text-[clamp(3.15rem,13vw,7.75rem)] font-medium leading-[0.82] md:leading-[0.79]">
            Healthy<br />Smiles<br /><em className="font-serif font-normal">Start Here</em>
          </h1>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-hero-foreground/80 sm:mt-7 sm:text-base sm:leading-6">
            Modern dental care tailored to your needs, delivered by experienced professionals in a welcoming environment.
          </p>
          <Button asChild className="mt-5 sm:mt-9">
            <a href="#newsletter">
              <span className="grid size-7 place-items-center rounded-full bg-foreground text-background">
                <ArrowUpRight size={14} />
              </span>
              Book Appointment
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}