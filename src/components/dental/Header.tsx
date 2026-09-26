import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Services", "#services"],
  ["Specialists", "#specialists"],
] as const;

import clinicLogoMark from "@/assets/clinic-logo-mark.png";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href="#home"
      className="flex shrink-0 items-center gap-3.5 sm:gap-4 text-inherit transition-opacity hover:opacity-90"
      aria-label="Dr. Divya's Family Dental Clinic"
    >
      <img
        src={clinicLogoMark}
        alt="Dr. Divya's Logo"
        width={105}
        height={103}
        className="h-12 w-auto object-contain drop-shadow-sm sm:h-[60px]"
      />
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`text-xl font-extrabold uppercase tracking-[0.08em] sm:text-[25px] ${
            inverse ? "text-white" : "text-foreground"
          }`}
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.35)" }}
        >
          Dr. Divya's
        </span>
        <span className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#dbb335] sm:text-[14px]">
          Family Dental Clinic
        </span>
      </div>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30 text-hero-foreground">
      <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center sm:h-24 md:flex md:justify-between">
        <Brand inverse />
        <nav className="hidden items-center gap-8 text-xs font-medium md:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>
        <Button asChild className="hidden bg-background text-foreground hover:bg-background/90 md:inline-flex">
          <a href="#newsletter"><span className="grid size-6 place-items-center rounded-full bg-foreground text-background">↗</span>Contact Us</a>
        </Button>
        <Button
          variant="outline"
          className="size-11 p-0 text-hero-foreground md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </Button>
      </div>
      {open && (
        <nav className="mx-4 rounded-lg border border-hero-foreground/15 bg-footer p-3 shadow-2xl md:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-md px-4 py-3 text-sm hover:bg-background/10">{label}</a>
          ))}
          <Button asChild className="mt-2 w-full"><a href="#newsletter" onClick={() => setOpen(false)}>Contact Us</a></Button>
        </nav>
      )}
    </header>
  );
}