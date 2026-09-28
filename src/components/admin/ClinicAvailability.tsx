import { Building2, Loader2, MapPin } from "lucide-react";
import { useState } from "react";

export interface ClinicBranch {
  id: string;
  name: string;
  location: string;
  active: boolean;
}

interface ClinicAvailabilityProps {
  clinics: ClinicBranch[];
  onToggleActive: (id: string, currentActive: boolean) => Promise<void>;
  loading?: boolean | undefined;
}

export function ClinicAvailability({
  clinics,
  onToggleActive,
  loading = false,
}: ClinicAvailabilityProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggle = async (id: string, currentActive: boolean) => {
    try {
      setUpdatingId(id);
      await onToggleActive(id, currentActive);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] p-3.5 sm:p-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-slate-500 shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Clinic Availability
          </h2>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-500">
          Active clinics are available for public booking &bull; Inactive clinics are removed from booking
        </p>
      </div>

      {/* Grid or Primary Clinic Notice */}
      {loading && clinics.length === 0 ? (
        <div className="py-8 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 size={16} className="animate-spin text-sky-600" />
          <span className="text-xs">Loading clinics...</span>
        </div>
      ) : clinics.length === 0 ? (
        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white shadow-xs gap-2.5 sm:gap-3 min-w-0">
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug truncate">
              Dr. Divya&apos;s Family Dental Clinic
            </h3>
            <div className="flex items-center gap-1 mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 min-w-0">
              <MapPin size={12} className="shrink-0 text-slate-400" />
              <span className="truncate">Ayankalam, Malappuram, Kerala</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#ebfbf3] text-[#008953] border border-[#b8f0d4]">
              <span className="size-1.5 rounded-full bg-[#00b069]" />
              ACTIVE
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-center min-w-[80px] sm:min-w-[96px] inline-flex items-center justify-center">
              Primary Clinic
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {clinics.map((clinic) => {
            const isUpdating = updatingId === clinic.id;

            return (
              <div
                key={clinic.id}
                className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors gap-2.5 sm:gap-3 min-w-0"
              >
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug truncate">
                    {clinic.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 min-w-0">
                    <MapPin size={12} className="shrink-0 text-slate-400" />
                    <span className="truncate">{clinic.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2.5 shrink-0">
                  {clinic.active ? (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#ebfbf3] text-[#008953] border border-[#b8f0d4]">
                      <span className="size-1.5 rounded-full bg-[#00b069]" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      <span className="size-1.5 rounded-full bg-slate-400" />
                      INACTIVE
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggle(clinic.id, clinic.active)}
                    className={`text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer disabled:opacity-50 min-w-[80px] sm:min-w-[96px] text-center justify-center inline-flex items-center ${
                      clinic.active
                        ? "border-slate-200 bg-white text-[#b91c1c] hover:bg-red-50 hover:border-red-200"
                        : "border-transparent bg-[#008953] hover:bg-[#007345] text-white shadow-xs"
                    }`}
                  >
                    {isUpdating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : clinic.active ? (
                      "Deactivate"
                    ) : (
                      "Activate"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
