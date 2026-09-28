import {
  Calendar,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface AppointmentRecord {
  id: string;
  patient_name: string;
  phone: string;
  service_id: string;
  specialist_id: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: "pending" | "contacted" | "confirmed" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
  // Joined or resolved fields
  doctor_name?: string | undefined;
  service_name?: string | undefined;
}

interface AppointmentDetailDialogProps {
  appointment: AppointmentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, newStatus: AppointmentRecord["status"]) => Promise<void>;
}

export function AppointmentDetailDialog({
  appointment,
  open,
  onOpenChange,
  onStatusChange,
}: AppointmentDetailDialogProps) {
  if (!open || !appointment) return null;

  const [status, setStatus] = useState<AppointmentRecord["status"]>(appointment.status);
  const [updating, setUpdating] = useState(false);

  const handleSaveStatus = async () => {
    if (status === appointment.status) {
      onOpenChange(false);
      return;
    }

    try {
      setUpdating(true);
      await onStatusChange(appointment.id, status);
      onOpenChange(false);
    } finally {
      setUpdating(false);
    }
  };

  const formatTimestamp = (ts: string) => {
    try {
      return new Date(ts).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return ts;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
              Appointment Inquiry Details
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {appointment.patient_name}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Key Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Patient Contact
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <a href={`tel:${appointment.phone}`} className="hover:underline">
                  {appointment.phone}
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Scheduled Slot
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                <Calendar size={14} className="text-slate-400 shrink-0" />
                <span>{appointment.preferred_date}</span>
                <Clock size={14} className="text-slate-400 shrink-0 ml-1" />
                <span>{appointment.preferred_time}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Requested Treatment
              </span>
              <div className="text-sm font-semibold text-slate-800">
                {appointment.service_name || "General Dental Consultation"}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Assigned Specialist
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                <Stethoscope size={14} className="text-slate-400 shrink-0" />
                <span>{appointment.doctor_name || "Any Available Specialist"}</span>
              </div>
            </div>
          </div>

          {/* Patient Message */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Patient Message / Symptoms
            </span>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 leading-relaxed min-h-[60px]">
              {appointment.message ? (
                appointment.message
              ) : (
                <span className="text-slate-400 italic">No additional notes provided by patient.</span>
              )}
            </div>
          </div>

          {/* Status Change Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Appointment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AppointmentRecord["status"])}
              className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            >
              <option value="pending">Pending (New Inquiry)</option>
              <option value="contacted">Contacted (Staff in touch)</option>
              <option value="confirmed">Confirmed (Appointment scheduled)</option>
              <option value="completed">Completed (Treatment done)</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Timestamps */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span>Created: {formatTimestamp(appointment.created_at)}</span>
            <span>Updated: {formatTimestamp(appointment.updated_at)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updating}
            className="text-xs"
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={handleSaveStatus}
            disabled={updating}
            className="text-xs bg-[#0f172a] hover:bg-[#1e293b] text-white"
          >
            {updating ? <Loader2 size={13} className="animate-spin" /> : "Save Status"}
          </Button>
        </div>
      </div>
    </div>
  );
}
