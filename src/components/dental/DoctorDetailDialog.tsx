import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface DoctorDetailInfo {
  name: string;
  credentials?: string;
  designation: string;
  experience?: string;
  bio: string;
  highlights?: string[];
}

interface DoctorDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: {
    id: string;
    name: string;
    specialty: string;
    image: string;
    is_available: boolean;
  } | null;
  detailInfo?: DoctorDetailInfo | null;
  onBookAppointment: (doctorId: string, isAvailable: boolean, doctorName: string) => void;
}

export function DoctorDetailDialog({
  open,
  onOpenChange,
  doctor,
  detailInfo,
  onBookAppointment,
}: DoctorDetailDialogProps) {
  if (!doctor) return null;

  const isPresent = doctor.is_available;
  const displayName = detailInfo?.name || doctor.name;
  const designation = detailInfo?.designation || doctor.specialty;
  const credentials = detailInfo?.credentials;
  const experience = detailInfo?.experience;
  const bio = detailInfo?.bio;
  const highlights = detailInfo?.highlights || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-border/80 bg-background rounded-2xl sm:rounded-3xl shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{displayName}</DialogTitle>
          <DialogDescription>{designation}</DialogDescription>
        </DialogHeader>

        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-primary/10 via-accent/30 to-secondary p-5 sm:p-7 border-b border-border/60">
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
            {/* Photo Avatar */}
            <div
              className={`relative shrink-0 size-28 sm:size-32 rounded-2xl overflow-hidden border-2 border-background shadow-md ${
                doctor.image.includes("specialist-prof-mufeed") ? "bg-[#5fa0e6]" : "bg-muted"
              }`}
            >
              <img
                src={doctor.image}
                alt={displayName}
                className={`w-full h-full ${
                  doctor.image.includes("specialist-prof-mufeed")
                    ? "object-contain"
                    : "object-cover object-top"
                }`}
              />
              {/* Status badge on photo */}
              <div className="absolute top-2 left-2 pointer-events-none">
                {isPresent ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#ebfbf3]/95 text-[#008953] border border-[#b8f0d4] shadow-xs">
                    <span className="size-1.5 rounded-full bg-[#00b069]" />
                    Present
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-rose-50/95 text-rose-700 border border-rose-300 shadow-xs">
                    <span className="size-1.5 rounded-full bg-rose-500" />
                    Absent
                  </span>
                )}
              </div>
            </div>

            {/* Doctor Title & Meta */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/15 text-primary border border-primary/20">
                  <Stethoscope className="size-3" />
                  {designation}
                </span>

                {experience && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    <Award className="size-3" />
                    {experience}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {displayName}
              </h2>

              {credentials && (
                <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                  <GraduationCap className="size-3.5 shrink-0 text-primary" />
                  {credentials}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Detailed Biography */}
          {bio && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <UserCheck className="size-3.5 text-primary" />
                About Specialist
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 whitespace-pre-line font-normal">
                {bio}
              </p>
            </div>
          )}

          {/* Clinical Focus & Highlights */}
          {highlights.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-primary" />
                Clinical Expertise & Procedures
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border border-border/70 bg-secondary/40 text-xs sm:text-sm text-foreground/90"
                  >
                    <CheckCircle2 className="size-4 text-[#008953] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Notice if Absent */}
          {!isPresent && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 text-xs text-rose-800 flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-rose-600" />
              <span>
                {displayName} is currently marked absent today. You can still schedule an advance
                appointment for upcoming dates.
              </span>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground text-center sm:text-left">
              Direct consultation slot with verified doctor.
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-1/2 sm:w-auto text-xs"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>

              <Button
                className="w-1/2 sm:w-auto text-xs font-semibold bg-[#008953] text-white hover:bg-[#007345] shadow-sm flex items-center gap-1.5"
                onClick={() => {
                  onOpenChange(false);
                  onBookAppointment(doctor.id, doctor.is_available, displayName);
                }}
              >
                <CalendarCheck className="size-3.5" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
