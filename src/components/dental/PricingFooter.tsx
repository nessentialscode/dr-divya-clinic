import { Instagram, Linkedin, Send, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppointmentTrigger } from "./AppointmentTrigger";
import { Brand } from "./Header";

const footerGroups = [
  {
    title: "Navigation",
    links: ["Home", "About", "Contact", "Cases", "Blog"],
  },
  {
    title: "Services",
    links: ["General Dentistry", "Dental Implants", "Teeth Whitening", "Orthodontics"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Book Appointment", "Insurance Information", "Terms & Conditions"],
  },
];

export function NewsletterFooter() {
  return (
    <footer id="newsletter" className="bg-footer text-footer-foreground">
      <div className="site-container border-b border-footer-foreground/15 py-16 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
        <h2 className="text-4xl leading-none sm:text-6xl">
          Subscribe to Our
          <br />
          <em className="font-serif">Newsletter</em>
        </h2>

        <form
          className="mt-10 flex rounded-full border border-footer-foreground/35 p-1.5 lg:mt-0"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>

          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email address"
            className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-footer-foreground/45"
          />

          <Button type="submit" className="min-h-9 px-6">
            Subscribe
          </Button>
        </form>
      </div>

      <div className="site-container grid gap-14 py-14 lg:grid-cols-[1.25fr_1.75fr]">
        <div>
          <Brand inverse />

          <p className="mt-6 max-w-sm text-sm leading-6 text-footer-foreground/60">
            Advanced technology, a compassionate team, and personalized treatments designed to keep
            your smile healthy for life.
          </p>

          <div className="mt-7 flex gap-2">
            {[Instagram, Linkedin, Youtube, Send].map((Icon, index) => (
              <a
                key={index}
                href="#home"
                aria-label="Social profile"
                className="grid size-8 place-items-center rounded-full border border-footer-foreground/25 transition hover:border-primary hover:text-primary"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold">{group.title}</h3>

              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    {group.title === "Support" && link === "Book Appointment" ? (
                      <AppointmentTrigger
                        variant="link"
                        className="h-auto p-0 text-xs font-normal text-footer-foreground/55 transition hover:text-primary"
                      >
                        {link}
                      </AppointmentTrigger>
                    ) : (
                      <a
                        href="#home"
                        className="text-xs text-footer-foreground/55 transition hover:text-primary"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="site-container border-t border-footer-foreground/15 py-5 text-center sm:text-right text-[11px] text-footer-foreground/45">
        © 2026 Dr. Divya&apos;s Family Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
}
