import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/dental/Header";
import { Hero } from "@/components/dental/Hero";
import { AboutSection, ServicesSection } from "@/components/dental/AboutValues";
import { Specialists, Testimonials } from "@/components/dental/SpecialistsTestimonials";
import { NewsletterFooter } from "@/components/dental/PricingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Divya's Family Dental Clinic — Healthy Smiles Start Here" },
      {
        name: "description",
        content:
          "Personalized modern dental care from trusted specialists, designed around your comfort and confidence.",
      },
      {
        property: "og:title",
        content: "Dr. Divya's Family Dental Clinic — Healthy Smiles Start Here",
      },
      {
        property: "og:description",
        content: "Premium, personalized dental care for a healthier and more confident smile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <Specialists />
      <Testimonials />
      <NewsletterFooter />
    </main>
  );
}
