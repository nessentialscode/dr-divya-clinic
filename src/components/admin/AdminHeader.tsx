import { ExternalLink, LogOut, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import clinicLogoMark from "@/assets/clinic-logo-mark.png";

interface AdminHeaderProps {
  adminEmail?: string | null | undefined;
  onRefresh?: (() => void) | undefined;
  onSignOut: () => void;
  isRefreshing?: boolean | undefined;
}

export function AdminHeader({
  adminEmail,
  onRefresh,
  onSignOut,
  isRefreshing = false,
}: AdminHeaderProps) {
  return (
    <header className="w-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] p-2.5 sm:p-4 px-3 sm:px-6">
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 min-w-0">
        {/* Left: Brand & Admin System Badge */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
          <div className="flex items-center justify-center size-8 sm:size-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 shadow-sm shrink-0 p-1.5 sm:p-2">
            <img
              src={clinicLogoMark}
              alt="Dr. Divya's Clinic"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-xs sm:text-base font-bold text-slate-900 tracking-tight leading-snug truncate">
                <span className="hidden sm:inline">Dr. Divya&apos;s Family Dental Clinic</span>
                <span className="sm:hidden inline">Dr. Divya&apos;s Clinic</span>
              </span>
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-sky-50 text-sky-700 border border-sky-200/80 shrink-0">
                Staff Admin
              </span>
            </div>
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              Appointment Management System
            </span>
          </div>
        </div>

        {/* Right: Actions (single-row matching mobile reference) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {adminEmail && (
            <div
              className="hidden lg:block px-3 py-1.5 rounded-lg bg-slate-100/90 text-slate-700 text-xs font-medium border border-slate-200/70 truncate max-w-[200px]"
              title={adminEmail}
            >
              {adminEmail}
            </div>
          )}

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh dashboard data"
              aria-label="Refresh dashboard data"
              className="inline-flex items-center justify-center size-8 sm:size-8.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RotateCcw
                size={14}
                className={isRefreshing ? "animate-spin" : ""}
              />
            </button>
          )}

          <Link
            to="/"
            target="_blank"
            title="Public Website"
            className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition-colors"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Public Website</span>
            <span className="sm:hidden inline text-[11px] font-semibold">Site</span>
          </Link>

          <button
            type="button"
            onClick={onSignOut}
            title="Sign Out"
            className="inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg border border-red-200/80 bg-red-50 hover:bg-red-100/80 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
