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
      className="flex shrink-0 items-center gap-2.5 sm:gap-4 text-inherit transition-opacity hover:opacity-90 min-w-0"
      aria-label="Dr. Divya's Ayankalam Dental Clinic"
    >
      <img
        src={clinicLogoMark}
        alt="Dr. Divya's Ayankalam Dental Clinic Logo"
        width={58}
        height={58}
        className="h-10 w-10 sm:h-[54px] sm:w-[54px] object-contain shrink-0 drop-shadow-sm rounded-full"
      />

      <div className="flex flex-col justify-center leading-none min-w-0">
        <span
          className={`text-lg font-extrabold uppercase tracking-[0.06em] sm:text-[25px] sm:tracking-[0.08em] whitespace-nowrap ${
            inverse
              ? "text-white"
              : "text-white sm:text-[#0c364e] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:drop-shadow-none"
          }`}
          style={inverse ? { textShadow: "1px 1px 1px rgba(0,0,0,0.35)" } : undefined}
        >
          Dr. Divya's
        </span>

        <span className="mt-1 sm:mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[14px] sm:tracking-[0.22em] whitespace-nowrap">
          {inverse ? (
            <span className="text-[#dbb335]">Ayankalam Dental Clinic</span>
          ) : (
            <>
              <span className="text-[#dbb335]">Ayankalam </span>
              <span className="text-[#0c364e] sm:text-[#dbb335]">Dental Clinic</span>
            </>
          )}
        </span>
      </div>
    </Link>
  );
}

export function Header({ mode = "absolute" }: { mode?: "absolute" | "sticky" }) {
  const [open, setOpen] = useState(false);

  const headerContainerClass =
    mode === "sticky"
      ? "sticky top-0 z-40 bg-white/95 text-[#0c364e] border-b border-black/5 backdrop-blur-md shadow-sm transition-all duration-300"
      : "absolute inset-x-0 top-0 z-30 text-[#0c364e] bg-gradient-to-b from-white/35 via-white/10 to-transparent";

  return (
    <header className={headerContainerClass}>
      <div className="site-container flex h-20 items-center justify-between sm:h-24">
        <Brand />

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
                  isHome ? "text-[#0c364e] font-semibold" : "text-[#0c364e]/80 hover:text-[#0c364e]"
                }`}
              >
                {label}
                {isHome && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#0c364e]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions: Desktop retains Contact Us pill; Mobile hides it beside logo & title */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <AppointmentTrigger
            variant="ghost"
            className="hidden md:inline-flex h-auto rounded-full bg-[#0c364e] hover:bg-[#08283b] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md active:scale-95 transition-all items-center gap-2 border-0 cursor-pointer"
          >
            <span className="flex size-5 sm:size-6 items-center justify-center rounded-full bg-white text-[#0c364e] shrink-0">
              <span className="text-xs sm:text-sm font-bold leading-none select-none">↗</span>
            </span>
            <span className="font-semibold tracking-tight text-white">Contact Us</span>
          </AppointmentTrigger>

          {/* Clean Hamburger for mobile */}
          <button
            type="button"
            className="flex items-center justify-center p-2 text-[#0c364e] hover:text-[#0c364e]/80 transition-colors md:hidden focus:outline-none cursor-pointer"
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
          className="mx-4 mt-2 rounded-xl border border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-3 duration-200"
          aria-label="Mobile navigation"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-[#0c364e] hover:bg-[#0c364e]/5 transition-colors"
            >
              {label}
            </a>
          ))}
          <div className="mt-2 border-t border-black/10 pt-3 px-1">
            <AppointmentTrigger
              variant="default"
              onClick={() => setOpen(false)}
              className="w-full justify-center rounded-xl bg-[#0c364e] py-3 text-sm font-bold text-white shadow-md hover:bg-[#08283b]"
            >
              Contact Us / Book Appointment
            </AppointmentTrigger>
          </div>
        </nav>
      )}
    </header>
  );
}
