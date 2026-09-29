import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, CalendarX2, CheckCircle2, DoorClosed, MapPin, Quote } from "lucide-react";
import { toast } from "sonner";

import patientImage from "@/assets/about-man.jpg";
import specialist1 from "@/assets/specialist-1.jpg";
import specialist2 from "@/assets/specialist-2.jpg";
import specialist3 from "@/assets/specialist-3.jpg";
import specialist4 from "@/assets/specialist-4.jpg";
import specialistDrRathish from "@/assets/specialist-dr-rathish.jpg";
import specialistDrLijeesh from "@/assets/specialist-dr-lijeesh.jpg";
import specialistDrAslif from "@/assets/specialist-dr-aslif.jpg";
import specialistDrHaris from "@/assets/specialist-dr-haris.jpg";

import { supabase } from "@/lib/supabase";
import { AppointmentDialog } from "./AppointmentDialog";

const orderedDoctorOrder = [
  "Dr. Divya Nath",
  "Dr. Rathish T.K",
  "Dr. Lijeesh Kadambil",
  "Dr. Anas",
  "Dr. Roshan",
  "Dr. Ratheesh M.S",
  "Dr. Mohamed Aslif",
  "Dr. Mohamed Haris P.M",
];

type ClinicDoctor = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  is_available: boolean;
};

type ClinicBranch = {
  id: string;
  name: string;
  location: string;
  active: boolean;
};

const doctorPhotos: Record<string, string> = {
  "Dr. Divya Nath": specialist3,
  "Dr. Rathish T.K": specialistDrRathish,       // Card 2: Image 1
  "Dr. Lijeesh Kadambil": specialistDrLijeesh,   // Card 3: Image 2
  "Dr. Anas": specialist1,
  "Dr. Roshan": specialist4,
  "Dr. Ratheesh M.S": specialist2,
  "Dr. Mohamed Aslif": specialistDrAslif,       // Card 7: Image 4
  "Dr. Mohamed Haris P.M": specialistDrHaris,   // Card 8: Image 5
};

const fallbackPhotos: readonly string[] = [
  specialist3,
  specialist4,
  specialist2,
  specialist1,
];
const defaultDoctorPhoto = specialist3;

const testimonials = [
  {
    name: "Marvin McKinney",
    quote:
      "I was nervous at first, but Dr. Thompson explained everything clearly and the treatment was completely pain-free.",
    feature: true,
  },
  {
    name: "Michael H.",
    quote:
      "After struggling for years with missing teeth, I can finally eat and speak comfortably. The team were so professional.",
  },
  {
    name: "Esther K.",
    quote:
      "Absolutely thrilled with my results! Dr. Emma made me feel at ease from the moment I walked in. I finally love my smile in photos!",
  },
];

export function Specialists() {
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [doctorsList, setDoctorsList] = useState<ClinicDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState<ClinicBranch[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadClinicStatus() {
      try {
        const { data, error } = await supabase
          .from("clinics")
          .select("id, name, location, active")
          .order("display_order", { ascending: true });

        if (cancelled) return;

        if (error) {
          console.warn("Could not load clinics status:", error.message);
          return;
        }

        if (data) {
          setClinics(data as ClinicBranch[]);
        }
      } catch (err) {
        console.error("Error loading clinic status:", err);
      }
    }

    async function loadDoctors() {
      try {
        const { data, error } = await supabase
          .from("specialists")
          .select("id, name, specialty, is_available")
          .eq("active", true);

        if (cancelled) return;

        if (error || !data || data.length === 0) {
          setLoading(false);
          return;
        }

        // Sort according to the requested 8-doctor order
        const sorted = [...data].sort((a, b) => {
          const indexA = orderedDoctorOrder.findIndex((name) =>
            a.name.toLowerCase().includes(name.toLowerCase())
          );
          const indexB = orderedDoctorOrder.findIndex((name) =>
            b.name.toLowerCase().includes(name.toLowerCase())
          );
          const orderA = indexA === -1 ? 999 : indexA;
          const orderB = indexB === -1 ? 999 : indexB;
          return orderA - orderB;
        });

        const merged: ClinicDoctor[] = sorted.map((item, index) => {
          const photoKey = Object.keys(doctorPhotos).find((k) => {
            const cleanK = k.toLowerCase().replace(/[\.\s]/g, "");
            const cleanName = item.name.toLowerCase().replace(/[\.\s]/g, "");
            return cleanName.includes(cleanK) || cleanK.includes(cleanName);
          });
          const matchedPhoto = photoKey ? doctorPhotos[photoKey] : undefined;
          const fallbackPhoto =
            fallbackPhotos[index % fallbackPhotos.length] ?? defaultDoctorPhoto;

          return {
            id: item.id,
            name: item.name,
            specialty: item.specialty,
            image: matchedPhoto ?? fallbackPhoto,
            is_available: item.is_available ?? true,
          };
        });

        setDoctorsList(merged);
      } catch (err) {
        console.error("Error loading specialists:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadClinicStatus();
    loadDoctors();

    // Subscribe to realtime updates on specialists so card attendance syncs immediately with Admin changes
    const specialistsChannel = supabase
      .channel("public:specialists_doctor_cards")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "specialists",
        },
        () => {
          loadDoctors();
        }
      )
      .subscribe();

    // Subscribe to realtime updates on clinics so clinic open/closed status syncs immediately with Admin changes
    const clinicsChannel = supabase
      .channel("public:clinics_realtime_status")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "clinics",
        },
        () => {
          loadClinicStatus();
        }
      )
      .subscribe();

    const handleFocus = () => {
      loadClinicStatus();
      loadDoctors();
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("visibilitychange", handleFocus);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("visibilitychange", handleFocus);
      supabase.removeChannel(specialistsChannel);
      supabase.removeChannel(clinicsChannel);
    };
  }, []);

  const isClinicOpen = clinics.length > 0 && clinics.some((c) => c.active === true);
  const primaryClinicName = clinics[0]?.name || "Dr. Divya's Family Dental Clinic";
  const primaryClinicLocation = clinics[0]?.location || "Ayankalam, Malappuram, Kerala";

  const todayFormatted = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  const handleDoctorConsultation = (doctorId: string, isAvailable: boolean, doctorName: string) => {
    if (!isClinicOpen) {
      toast.info(
        `The clinic is currently closed today. You can schedule an advance appointment with ${doctorName} for tomorrow onwards.`,
        { duration: 4500 }
      );
      setSelectedSpecialistId(doctorId);
      setDialogOpen(true);
      return;
    }

    if (!isAvailable) {
      toast.info(
        `${doctorName} is marked absent today. You can still schedule an appointment with our available specialists.`,
        { duration: 4000 }
      );
      setSelectedSpecialistId(undefined);
      setDialogOpen(true);
      return;
    }
    setSelectedSpecialistId(doctorId);
    setDialogOpen(true);
  };

  return (
    <section
      id="specialists"
      className="bg-secondary py-20 sm:py-28 lg:py-32"
    >
      <div className="site-container">
        {/* Upper part of Our Specialist section: Clinic Open / Closed Status Card */}
        <div className="mb-10 sm:mb-12">
          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 shadow-sm ${
              isClinicOpen
                ? "border-emerald-200/90 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40"
                : "border-rose-200/90 bg-gradient-to-r from-rose-50/80 via-white to-amber-50/40"
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5 sm:gap-4.5">
                <div
                  className={`flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl border shadow-xs ${
                    isClinicOpen
                      ? "border-emerald-200 bg-emerald-100/90 text-emerald-700"
                      : "border-rose-200 bg-rose-100 text-rose-700"
                  }`}
                >
                  {isClinicOpen ? (
                    <Building2 className="size-6 sm:size-7" />
                  ) : (
                    <DoorClosed className="size-6 sm:size-7" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase border ${
                        isClinicOpen
                          ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                          : "border-rose-300 bg-rose-100 text-rose-800"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          isClinicOpen ? "bg-emerald-600" : "bg-rose-600"
                        }`}
                      />
                      {isClinicOpen ? "CLINIC OPEN TODAY" : "CLINIC CLOSED TODAY"}
                    </span>

                    <span className="text-xs text-muted-foreground font-medium">
                      {todayFormatted}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {isClinicOpen
                      ? `${primaryClinicName} is Open`
                      : `${primaryClinicName} is Closed Today`}
                  </h3>

                  <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {isClinicOpen
                      ? "Consultations with present specialists and walk-ins are active today. Online same-day appointments can be booked below."
                      : "The clinic is closed today. Online booking for today is disabled, but advance appointments for tomorrow onwards remain open with our certified specialists."}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5 text-primary" />
                      {primaryClinicLocation}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {isClinicOpen ? (
                        <>
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                          <span className="font-medium text-emerald-700">Same-Day Bookings Active</span>
                        </>
                      ) : (
                        <>
                          <CalendarX2 className="size-3.5 text-rose-600" />
                          <span className="font-medium text-rose-700">No Appointments for Today • Advance Booking Open</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSpecialistId(undefined);
                    setDialogOpen(true);
                  }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                    isClinicOpen
                      ? "bg-[#008953] text-white hover:bg-[#007345]"
                      : "border border-rose-300 bg-white text-rose-900 hover:bg-rose-50"
                  }`}
                >
                  {isClinicOpen ? "Book Appointment" : "Book for Tomorrow onwards"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 text-center">
          <span className="eyebrow bg-background">Our Specialist</span>

          <h2 className="section-title mx-auto mt-4 text-center">
            Meet Our <em>Specialists</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            A dedicated team of certified professionals with one goal —
            your healthiest, happiest smile. Click any doctor to book a consultation.
          </p>
        </div>

        <div className="hide-scrollbar flex snap-x gap-5 overflow-x-auto pb-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {loading && doctorsList.length === 0 ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="min-w-[78vw] snap-center rounded-2xl p-2.5 sm:min-w-[280px] lg:min-w-0"
              >
                <div className="aspect-[853/1024] w-full rounded-xl bg-muted animate-pulse" />
                <div className="pt-3.5 px-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))
          ) : (
            doctorsList.map((doctor) => {
              const isPresent = doctor.is_available;

              return (
                <article
                  key={doctor.id}
                  onClick={() => handleDoctorConsultation(doctor.id, isPresent, doctor.name)}
                  className={`group relative cursor-pointer min-w-[78vw] snap-center rounded-2xl p-2.5 transition-all duration-300 hover:bg-background hover:shadow-xl sm:min-w-[280px] lg:min-w-0 border ${
                    isPresent
                      ? "border-[#b8f0d4] bg-[#ebfbf3]/25 hover:border-[#008953]/50"
                      : "border-rose-200/90 bg-rose-50/20 hover:border-rose-300"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleDoctorConsultation(doctor.id, isPresent, doctor.name);
                    }
                  }}
                >
                  <div className="doctor-photo relative aspect-[853/1024] overflow-hidden rounded-xl bg-muted">
                    <img
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.specialty} specialist`}
                      width={853}
                      height={1024}
                      loading="lazy"
                      className={`h-full w-full object-cover object-top transition duration-500 group-hover:scale-105 ${
                        isPresent ? "" : "opacity-95 saturate-[0.88]"
                      }`}
                    />

                    {/* Presence / Absence Status Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      {isPresent ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-[#ebfbf3]/95 text-[#008953] border border-[#b8f0d4] shadow-sm backdrop-blur-md">
                          <span className="size-2 rounded-full bg-[#00b069]"></span>
                          Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-rose-50/95 text-rose-700 border border-rose-300 shadow-sm backdrop-blur-md">
                          <span className="size-2 rounded-full bg-rose-500"></span>
                          Absent
                        </span>
                      )}
                    </div>

                    {/* Bottom Hover Action Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                      <span
                        className={`text-[11px] font-semibold text-white px-2.5 py-1 rounded-full backdrop-blur-sm ${
                          isPresent
                            ? "bg-black/50"
                            : "bg-rose-950/85 border border-rose-500/40 text-rose-100"
                        }`}
                      >
                        {isPresent ? "Book Consultation" : "Doctor Absent Today"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 pt-3.5 px-1">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                        {doctor.name}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground truncate">
                        {doctor.specialty}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDoctorConsultation(doctor.id, isPresent, doctor.name);
                      }}
                      aria-label={
                        isPresent
                          ? `Book consultation with ${doctor.name}`
                          : `${doctor.name} is currently absent`
                      }
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-200 group-hover:scale-105 shadow-2xs ${
                        isPresent
                          ? "border-[#b8f0d4] bg-[#ebfbf3]/80 text-[#008953] group-hover:bg-[#008953] group-hover:text-white"
                          : "border-rose-200 bg-rose-50/80 text-rose-700 group-hover:bg-rose-600 group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSelectedSpecialistId(undefined);
          }
        }}
        isClinicOpen={isClinicOpen}
        {...(selectedSpecialistId ? { specialistId: selectedSpecialistId } : {})}
      />
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="site-container py-20 sm:py-28 lg:py-32">
      <span className="eyebrow">Testimonials</span>

      <h2 className="section-title mt-5">
        Happy Smiles, <em>Happy Patients</em>
      </h2>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className={`relative flex min-h-72 flex-col overflow-hidden rounded-lg p-6 transition duration-300 hover:-translate-y-1 ${item.feature
                ? "bg-footer text-hero-foreground"
                : "bg-secondary"
              }`}
          >
            {item.feature && (
              <>
                <img
                  src={patientImage}
                  alt="Marvin smiling"
                  width={816}
                  height={816}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-65"
                />

                <div className="absolute inset-0 bg-footer/35" />
              </>
            )}

            <div className="relative z-10 flex items-center gap-2 text-sm font-medium">
              <span className="grid size-7 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                {item.name.charAt(0)}
              </span>

              {item.name}
            </div>

            <div className="relative z-10 mt-auto">
              <Quote
                size={25}
                className={
                  item.feature ? "text-primary" : "text-foreground"
                }
                fill="currentColor"
              />

              <p className="mt-4 text-sm font-medium leading-6">
                {item.quote}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}