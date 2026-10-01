import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import clinicLogoMark from "@/assets/clinic-logo-mark.png";
import { Button } from "@/components/ui/button";

import { AppointmentTrigger } from "./AppointmentTrigger";

const links = [
  ["Home", "/#home"],
  ["About Us", "/#about"],
  ["Services", "/#services"],
  ["Specialists", "/#specialists"],
] as const;

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3.5 text-inherit transition-opacity hover:opacity-90 sm:gap-4"
      aria-label="Dr. Divya's Ayankalam Dental Clinic"
    >
      <img
        src={clinicLogoMark}
        alt="Dr. Divya's Ayankalam Dental Clinic Logo"
        width={58}
        height={58}
        className="h-11 w-11 sm:h-[54px] sm:w-[54px] object-contain shrink-0 drop-shadow-sm rounded-full"
      />

      <div className="flex flex-col justify-center leading-none">
        <span
          className={`text-xl font-extrabold uppercase tracking-[0.08em] sm:text-[25px] ${inverse ? "text-white" : "text-foreground"}`}
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.35)" }}
        >
          Dr. Divya's
        </span>

        <span className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#dbb335] sm:text-[14px]">
          Ayankalam Dental Clinic
        </span>
      </div>
    </Link>
  );
}

export function Header({ mode = "absolute" }: { mode?: "absolute" | "sticky" }) {
  const [open, setOpen] = useState(false);

  const headerContainerClass =
    mode === "sticky"
      ? "sticky top-0 z-40 bg-footer/90 text-hero-foreground border-b border-white/10 backdrop-blur-md shadow-md transition-all duration-300"
      : "absolute inset-x-0 top-0 z-30 text-hero-foreground";

  return (
    <header className={headerContainerClass}>
      <div className="site-container flex h-20 items-center justify-between sm:h-24">
        <Brand inverse />

        {/* Center Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 lg:gap-10 text-[15px] font-medium tracking-wide md:flex"
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => {
            const isHome = label === "Home";
            return (
              <a
                key={href}
                href={href}
                className={`relative py-1.5 transition-colors ${
                  isHome ? "text-white font-medium" : "text-white/80 hover:text-white"
                }`}
              >
                {label}
                {isHome && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#dbb335]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <AppointmentTrigger
            variant="ghost"
            className="h-auto rounded-full bg-white px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-neutral-900 shadow-md hover:bg-white/95 active:scale-95 transition-all inline-flex items-center gap-2 border-0"
          >
            <span className="flex size-5 sm:size-6 items-center justify-center rounded-full bg-black text-white shrink-0">
              <span className="text-xs sm:text-sm font-bold leading-none select-none">↗</span>
            </span>
            <span className="font-semibold tracking-tight text-neutral-900">Contact Us</span>
          </AppointmentTrigger>

          {/* Clean Hamburger for mobile (matching Image 2) */}
          <button
            type="button"
            className="flex items-center justify-center p-1.5 text-white hover:text-white/85 transition-colors md:hidden focus:outline-none"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={26} /> : <Menu size={26} className="stroke-[2.2]" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="mx-4 mt-2 rounded-xl border border-white/10 bg-footer/95 p-4 shadow-2xl backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-3 duration-200"
          aria-label="Mobile navigation"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
