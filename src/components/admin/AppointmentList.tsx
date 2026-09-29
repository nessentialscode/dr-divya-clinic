import {
  CalendarDays,
  Clock,
  Eye,
  Inbox,
  Loader2,
  Phone,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon, buildWhatsAppConfirmationUrl } from "@/lib/whatsapp";
import {
  AppointmentDetailDialog,
  type AppointmentRecord,
} from "./AppointmentDetailDialog";

interface AppointmentListProps {
  appointments: AppointmentRecord[];
  loading?: boolean | undefined;
  onStatusChange: (id: string, newStatus: AppointmentRecord["status"]) => Promise<void>;
  onClearDateFilter: () => void;
  isDateFiltered: boolean;
}

export function AppointmentList({
  appointments,
  loading = false,
  onStatusChange,
  onClearDateFilter,
  isDateFiltered,
}: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleOpenDetail = (appt: AppointmentRecord) => {
    setSelectedAppointment(appt);
    setDetailOpen(true);
  };

  const handleStatusSelect = async (
    id: string,
    newStatus: AppointmentRecord["status"],
  ) => {
    const target = appointments.find((a) => a.id === id);
    if (target?.status === "confirmed" && newStatus === "cancelled") {
      toast.error("Confirmed appointments cannot be changed to Cancelled.");
      return;
    }

    try {
      setUpdatingId(id);
      await onStatusChange(id, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: AppointmentRecord["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="size-1.5 rounded-full bg-blue-500" />
            Contacted
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/80">
            <span className="size-1.5 rounded-full bg-sky-500" />
            Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <span className="size-1.5 rounded-full bg-slate-400" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] overflow-hidden w-full min-w-0">
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 size={24} className="animate-spin text-sky-600" />
          <span className="text-xs font-medium">Loading appointments...</span>
        </div>
      ) : appointments.length === 0 ? (
        /* Empty State Matching Screenshot 3 */
        <div className="py-12 sm:py-20 px-4 flex flex-col items-center justify-center text-center">
          <div className="size-12 sm:size-14 rounded-2xl bg-slate-100/90 border border-slate-200/60 flex items-center justify-center text-slate-400 mb-3 sm:mb-4 shadow-2xs">
            <Inbox size={24} className="text-slate-400 stroke-[1.5]" />
          </div>

          <h3 className="text-sm sm:text-lg font-bold text-slate-800">
            {isDateFiltered
              ? "No appointments scheduled for today"
              : "No appointments match your search"}
          </h3>

          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
            {isDateFiltered
              ? "There are no appointment bookings scheduled for today. You can select another date or view all appointments."
              : "Try adjusting your search criteria or resetting filters to see more appointment inquiries."}
          </p>

          {isDateFiltered && (
            <div className="mt-4 sm:mt-5">
              <Button
                type="button"
                variant="outline"
                onClick={onClearDateFilter}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                <CalendarDays size={14} className="text-slate-500" />
                <span>View All Dates</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Mobile Card View (block md:hidden) - fits mobile screen with zero horizontal scroll */}
          <div className="block md:hidden divide-y divide-slate-100">
            {appointments.map((appt) => {
              const isUpdating = updatingId === appt.id;

              return (
                <div
                  key={appt.id}
                  onClick={() => handleOpenDetail(appt)}
                  className="p-3.5 space-y-2.5 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900 text-xs truncate flex-1">
                      {appt.patient_name}
                    </div>
                    <div className="shrink-0">{getStatusBadge(appt.status)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-slate-500">
                        <Phone size={11} className="shrink-0 text-slate-400" />
                        <a
                          href={`tel:${appt.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline text-slate-700 truncate"
                        >
                          {appt.phone}
                        </a>
                      </div>
                      <div className="truncate text-slate-500">
                        <span className="font-medium text-slate-700">Slot:</span>{" "}
                        {appt.preferred_date}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="truncate text-slate-500">
                        <span className="font-medium text-slate-700">Dr:</span>{" "}
                        {appt.doctor_name || "Specialist"}
                      </div>
                      <div className="truncate text-slate-500">
                        <span className="font-medium text-slate-700">Time:</span>{" "}
                        {appt.preferred_time}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between pt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-medium">Status:</span>
                      <select
                        value={appt.status}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusSelect(
                            appt.id,
                            e.target.value as AppointmentRecord["status"],
                          )
                        }
                        aria-label="Change appointment status"
                        className="text-[11px] py-1 px-2 bg-white border border-slate-200 rounded-lg text-slate-700 outline-none cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        {appt.status !== "confirmed" && (
                          <option value="cancelled">Cancelled</option>
                        )}
                      </select>

                      {appt.status === "confirmed" && (
                        <a
                          href={buildWhatsAppConfirmationUrl({
                            patientName: appt.patient_name,
                            phone: appt.phone,
                            clinicName: appt.clinic_name,
                            doctorName: appt.doctor_name,
                            preferredDate: appt.preferred_date,
                            preferredTime: appt.preferred_time,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open WhatsApp confirmation"
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-xs"
                        >
                          <WhatsAppIcon className="size-3 fill-white" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDetail(appt)}
                      className="h-7 text-[11px] px-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50 gap-1 rounded-lg"
                    >
                      <Eye size={12} />
                      <span>Details</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View (hidden md:block) */}
          <div className="hidden md:block overflow-x-auto w-full max-w-full">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/70">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Patient</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Assigned Doctor</th>
                  <th className="py-3 px-4">Treatment</th>
                  <th className="py-3 px-4">Preferred Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right sm:pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {appointments.map((appt) => {
                  const isUpdating = updatingId === appt.id;

                  return (
                    <tr
                      key={appt.id}
                      onClick={() => handleOpenDetail(appt)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Patient Name */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {appt.patient_name}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4">
                        <a
                          href={`tel:${appt.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-600 hover:text-sky-600 hover:underline"
                        >
                          {appt.phone}
                        </a>
                      </td>

                      {/* Doctor */}
                      <td className="py-3.5 px-4">
                        <span className="truncate block max-w-[180px]">
                          {appt.doctor_name || "Any Specialist"}
                        </span>
                      </td>

                      {/* Treatment */}
                      <td className="py-3.5 px-4">
                        <span className="truncate block max-w-[160px] text-slate-600">
                          {appt.service_name || "General Care"}
                        </span>
                      </td>

                      {/* Slot */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-slate-800">{appt.preferred_date}</div>
                        <div className="text-[11px] text-slate-400">{appt.preferred_time}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(appt.status)}
                          <select
                            value={appt.status}
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleStatusSelect(
                                appt.id,
                                e.target.value as AppointmentRecord["status"],
                              )
                            }
                            aria-label="Change appointment status"
                            className="opacity-0 group-hover:opacity-100 text-[10px] py-0.5 px-1 bg-white border border-slate-200 rounded text-slate-700 outline-none transition-opacity focus:opacity-100 cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            {appt.status !== "confirmed" && (
                              <option value="cancelled">Cancelled</option>
                            )}
                          </select>

                          {/* WhatsApp Badge/Button appearing when confirmed */}
                          {appt.status === "confirmed" && (
                            <a
                              href={buildWhatsAppConfirmationUrl({
                                patientName: appt.patient_name,
                                phone: appt.phone,
                                clinicName: appt.clinic_name,
                                doctorName: appt.doctor_name,
                                preferredDate: appt.preferred_date,
                                preferredTime: appt.preferred_time,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Send confirmation to ${appt.patient_name} on WhatsApp`}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xs transition-transform hover:scale-105 cursor-pointer shrink-0"
                            >
                              <WhatsAppIcon className="size-3 fill-white" />
                              <span>WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right sm:pr-6 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {appt.status === "confirmed" && (
                            <a
                              href={buildWhatsAppConfirmationUrl({
                                patientName: appt.patient_name,
                                phone: appt.phone,
                                clinicName: appt.clinic_name,
                                doctorName: appt.doctor_name,
                                preferredDate: appt.preferred_date,
                                preferredTime: appt.preferred_time,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Send WhatsApp confirmation to ${appt.patient_name}`}
                              className="size-7 inline-flex items-center justify-center text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg shadow-2xs transition-transform hover:scale-105 cursor-pointer"
                            >
                              <WhatsAppIcon className="size-3.5 fill-white" />
                            </a>
                          )}

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDetail(appt)}
                            className="size-7 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer"
                            title="View Full Details"
                          >
                            <Eye size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Detail Dialog */}
      <AppointmentDetailDialog
        appointment={selectedAppointment}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
