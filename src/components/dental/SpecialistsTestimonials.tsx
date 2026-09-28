import { useEffect, useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";

import patientImage from "@/assets/about-man.jpg";
import specialist1 from "@/assets/specialist-1.jpg";
import specialist2 from "@/assets/specialist-2.jpg";
import specialist3 from "@/assets/specialist-3.jpg";
import specialist4 from "@/assets/specialist-4.jpg";

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
};

const doctorPhotos: Record<string, string> = {
  "Dr. Divya Nath": specialist3,
  "Dr. Rathish T.K": specialist4,
  "Dr. Lijeesh Kadambil": specialist2,
  "Dr. Anas": specialist1,
  "Dr. Roshan": specialist4,
  "Dr. Ratheesh M.S": specialist2,
  "Dr. Mohamed Aslif": specialist1,
  "Dr. Mohamed Haris P.M": specialist3,
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

  useEffect(() => {
    let cancelled = false;

    async function loadDoctors() {
      try {
        const { data, error } = await supabase
          .from("specialists")
          .select("id, name, specialty")
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
          const photoKey = Object.keys(doctorPhotos).find((k) =>
            item.name.toLowerCase().includes(k.toLowerCase())
          );
          const matchedPhoto = photoKey ? doctorPhotos[photoKey] : undefined;
          const fallbackPhoto =
            fallbackPhotos[index % fallbackPhotos.length] ?? defaultDoctorPhoto;

          return {
            id: item.id,
            name: item.name,
            specialty: item.specialty,
            image: matchedPhoto ?? fallbackPhoto,
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

    loadDoctors();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDoctorConsultation = (doctorId: string) => {
    setSelectedSpecialistId(doctorId);
    setDialogOpen(true);
  };

  return (
    <section
      id="specialists"
      className="bg-secondary py-20 sm:py-28 lg:py-32"
    >
      <div className="site-container">
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
                <div className="aspect-[4/5] w-full rounded-xl bg-muted animate-pulse" />
                <div className="pt-3.5 px-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))
          ) : (
            doctorsList.map((doctor) => (
              <article
                key={doctor.id}
                onClick={() => handleDoctorConsultation(doctor.id)}
                className="group relative cursor-pointer min-w-[78vw] snap-center rounded-2xl p-2.5 transition-all duration-300 hover:bg-background hover:shadow-xl sm:min-w-[280px] lg:min-w-0 border border-transparent hover:border-primary/20"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleDoctorConsultation(doctor.id);
                  }
                }}
              >
                <div className="doctor-photo relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.specialty} specialist`}
                    width={480}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                    <span className="text-[11px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      Book Consultation
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
                      handleDoctorConsultation(doctor.id);
                    }}
                    aria-label={`Book consultation with ${doctor.name}`}
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background p-0 text-foreground transition-all duration-200 group-hover:bg-foreground group-hover:text-background group-hover:scale-105 shadow-2xs"
                  >
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))
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