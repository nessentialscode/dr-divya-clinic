import { Loader2, Stethoscope } from "lucide-react";
import { useState } from "react";

export interface DoctorRecord {
  id: string;
  name: string;
  specialty: string;
  active: boolean;
  is_available: boolean;
}

interface DoctorAvailabilityProps {
  doctors: DoctorRecord[];
  onToggleAvailability: (id: string, currentAvailable: boolean) => Promise<void>;
  loading?: boolean | undefined;
}

export function DoctorAvailability({
  doctors,
  onToggleAvailability,
  loading = false,
}: DoctorAvailabilityProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggle = async (id: string, currentAvailable: boolean) => {
    try {
      setUpdatingId(id);
      await onToggleAvailability(id, currentAvailable);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Stethoscope size={16} className="text-slate-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Doctor Availability
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Present specialists are selectable in online booking &bull; Absent specialists are shown as unavailable
        </p>
      </div>

      {/* Grid */}
      {loading && doctors.length === 0 ? (
        <div className="py-8 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 size={16} className="animate-spin text-sky-600" />
          <span className="text-xs">Loading doctors...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {doctors.map((doctor) => {
            const isUpdating = updatingId === doctor.id;
            const isPresent = doctor.is_available;

            return (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors gap-3"
              >
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-[14px] sm:text-sm font-bold text-slate-900 leading-snug truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5 line-clamp-2">
                    {doctor.specialty}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2.5 shrink-0">
                  {isPresent ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#ebfbf3] text-[#008953] border border-[#b8f0d4]">
                      <span className="size-1.5 rounded-full bg-[#00b069]" />
                      PRESENT
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#fff8e7] text-[#c26d0a] border border-[#fde5b2]">
                      <span className="size-1.5 rounded-full bg-[#e58a13]" />
                      ABSENT
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => handleToggle(doctor.id, doctor.is_available)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl min-w-[96px] text-center justify-center inline-flex items-center transition-all cursor-pointer disabled:opacity-50 ${
                      isPresent
                        ? "border border-slate-200 bg-white hover:bg-amber-50/50 text-[#a84d16]"
                        : "border border-transparent bg-[#008953] hover:bg-[#007345] text-white shadow-xs"
                    }`}
                  >
                    {isUpdating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : isPresent ? (
                      "Mark Absent"
                    ) : (
                      "Mark Present"
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
