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

      {/* Clinic Cards */}
      {loading && clinics.length === 0 ? (
        <div className="py-8 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 size={16} className="animate-spin text-sky-600" />
          <span className="text-xs">Loading clinics...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {(clinics.length > 0
            ? clinics
            : [
                {
                  id: "2981ae0d-9018-4d9a-bda0-60a3d0dfaf88",
                  name: "Dr. Divya's Family Dental Clinic",
                  location: "Ayankalam, Malappuram, Kerala",
                  active: true,
                },
              ]
          ).map((clinic) => {
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
                    <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#ebfbf3] text-[#008953] border border-[#b8f0d4]">
                      <span className="size-1.5 rounded-full bg-[#00b069] animate-pulse" />
                      OPEN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-rose-50 text-rose-700 border border-rose-200">
                      <span className="size-1.5 rounded-full bg-rose-500" />
                      CLOSED
                    </span>
                  )}

                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 sm:px-2.5 py-0.5 rounded-lg text-center hidden sm:inline-flex items-center justify-center">
                    Primary Clinic
                  </span>

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggle(clinic.id, clinic.active)}
                    className={`text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer disabled:opacity-50 min-w-[96px] sm:min-w-[108px] text-center justify-center inline-flex items-center gap-1.5 ${
                      clinic.active
                        ? "border-slate-200 bg-white text-[#b91c1c] hover:bg-red-50 hover:border-red-200"
                        : "border-transparent bg-[#008953] hover:bg-[#007345] text-white shadow-xs"
                    }`}
                  >
                    {isUpdating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : clinic.active ? (
                      "Close Clinic"
                    ) : (
                      "Open Clinic"
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
