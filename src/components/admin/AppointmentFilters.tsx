import { Calendar, Search } from "lucide-react";
import { normalizeDoctorDisplayName } from "@/lib/utils";
import type { ClinicBranch } from "./ClinicAvailability";
import type { DoctorRecord } from "./DoctorAvailability";

export interface ServiceRecord {
  id: string;
  name: string;
}

export interface AppointmentFilterState {
  search: string;
  status: string;
  branchId: string;
  doctorId: string;
  serviceId: string;
  date: string; // "YYYY-MM-DD" or "" for all dates
}

interface AppointmentFiltersProps {
  filters: AppointmentFilterState;
  onChange: (filters: AppointmentFilterState) => void;
  clinics: ClinicBranch[];
  doctors: DoctorRecord[];
  services: ServiceRecord[];
}

export function AppointmentFilters({
  filters,
  onChange,
  clinics,
  doctors,
  services,
}: AppointmentFiltersProps) {
  const getTodayIndiaString = () => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  };

  const handleSearchChange = (val: string) => {
    onChange({ ...filters, search: val });
  };

  const handleStatusChange = (val: string) => {
    onChange({ ...filters, status: val });
  };

  const handleBranchChange = (val: string) => {
    onChange({ ...filters, branchId: val });
  };

  const handleDoctorChange = (val: string) => {
    onChange({ ...filters, doctorId: val });
  };

  const handleTreatmentChange = (val: string) => {
    onChange({ ...filters, serviceId: val });
  };

  const handleDateChange = (val: string) => {
    onChange({ ...filters, date: val });
  };

  const setTodayDate = () => {
    onChange({ ...filters, date: getTodayIndiaString() });
  };

  const setAllDates = () => {
    onChange({ ...filters, date: "" });
  };

  const hasBranches = clinics.length > 0;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 w-full min-w-0">
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by patient name or phone number..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Dropdown Filters Row */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          hasBranches ? "lg:grid-cols-5" : "lg:grid-cols-4"
        } gap-3`}
      >
        {/* Status */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Branch (only shown if multi-branch configured) */}
        {hasBranches && (
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Branch
            </label>
            <select
              value={filters.branchId}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 truncate"
            >
              <option value="">All Branches</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Doctor */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Doctor
          </label>
          <select
            value={filters.doctorId}
            onChange={(e) => handleDoctorChange(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 truncate"
          >
            <option value="">All Doctors</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {normalizeDoctorDisplayName(d.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Treatment */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Treatment
          </label>
          <select
            value={filters.serviceId}
            onChange={(e) => handleTreatmentChange(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 truncate"
          >
            <option value="">All Treatments</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Date{" "}
              <button
                type="button"
                onClick={setTodayDate}
                className="text-sky-600 hover:underline normal-case font-medium ml-1 cursor-pointer"
              >
                [today]
              </button>
            </label>
            <button
              type="button"
              onClick={setAllDates}
              className={`text-[10px] font-semibold hover:underline cursor-pointer ${
                filters.date === "" ? "text-sky-600 font-bold" : "text-slate-400"
              }`}
            >
              All Dates
            </button>
          </div>
          <div className="relative">
            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
