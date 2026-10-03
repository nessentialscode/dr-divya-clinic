import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarX2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  MapPin,
  Quote,
} from "lucide-react";
import { toast } from "sonner";

import patientImage from "@/assets/about-man.jpg";
import specialist1 from "@/assets/specialist-1.jpg";
import specialist2 from "@/assets/specialist-2.jpg";
import specialist3 from "@/assets/specialist-3.jpg";
import specialist4 from "@/assets/specialist-4.jpg";
import specialistDrDivya from "@/assets/specialist-dr-divya.jpg";
import specialistDrRathish from "@/assets/specialist-dr-rathish.jpg";
import specialistDrLijeesh from "@/assets/specialist-dr-lijeesh.jpg";
import specialistDrAslif from "@/assets/specialist-dr-aslif.jpg";
import specialistDrHaris from "@/assets/specialist-dr-haris.jpg";
import specialistDrNidhash from "@/assets/specialist-dr-nidhash.jpg";
import specialistDrFathima from "@/assets/specialist-dr-fathima.jpg";
import specialistDrAyisha from "@/assets/specialist-dr-ayisha.jpg";
import specialistDrRoshan from "@/assets/specialist-dr-roshan.jpg";

import { supabase } from "@/lib/supabase";
import { getDoctorSortOrder, normalizeDoctorDisplayName } from "@/lib/utils";
import { AppointmentDialog } from "./AppointmentDialog";
import { DoctorDetailDialog, DoctorDetailInfo } from "./DoctorDetailDialog";

const orderedDoctorOrder = [
  "Dr. Divya Lijeesh",
  "Dr. Lijeesh Kadambil",
  "Dr. Fathima Roosa Fidha",
  "Dr. Ayisha",
  "Dr. Rathish TK",
  "Dr. Nidhash Siddik",
  "Dr. Roshan",
  "Dr. Mohammed Aslif",
  "Dr. Mohammed Haris PM",
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

const doctorDetailsData: Record<string, DoctorDetailInfo> = {
  divya: {
    name: "Dr. Divya Lijeesh",
    designation: "Resident Dental Surgeon",
    credentials: "BDS • Chief Aesthetic & General Dental Surgeon",
    experience: "10+ Years Experience",
    bio: "Dr. Divya Lijeesh is our lead resident dental surgeon, known for her gentle, patient-centric approach and dedication to holistic family dentistry. Specialising in comprehensive preventive care, aesthetic smile transformations, pediatric dentistry, and patient wellness, she ensures every visit is comfortable, transparent, and rewarding for patients of all ages.",
    highlights: [
      "Preventive & Family Dentistry",
      "Aesthetic Restorations & Smile Designing",
      "Gentle Pediatric Dental Care",
      "Patient Comfort & Stress-Free Consultations",
    ],
  },
  lijeesh: {
    name: "Dr. Lijeesh Kadambil",
    designation: "Chief Dental Surgeon",
    credentials: "BDS • Chief Dental Surgeon",
    experience: "11 Years Clinical Experience",
    bio: "Dr. Lijeesh Kadambil is a highly experienced dental surgeon with expertise in aesthetic dentistry, smile correction, root canal treatment, and surgical extractions, along with a wide range of advanced and technology-driven dental treatments. His practice emphasises precision and clinical excellence, incorporating loupes-assisted dentistry and modern dental technologies to enhance treatment accuracy and outcomes. With 11 years of clinical experience and a commitment to continuous advancement, he provides comprehensive, personalised dental care while maintaining high standards of professionalism and patient satisfaction.",
    highlights: [
      "Aesthetic Dentistry & Smile Correction",
      "Loupes-Assisted Precision Dentistry",
      "Advanced Single-Sitting Root Canal Treatments",
      "Surgical & Complex Extractions",
    ],
  },
  rathish: {
    name: "Dr. Rathish TK",
    designation: "Oral & Maxillofacial Surgeon",
    credentials: "MDS • Oral & Maxillofacial Surgeon",
    experience: "Advanced Surgical Specialist",
    bio: "A dedicated Oral & Maxillofacial Surgeon (MDS) with advanced clinical training in oral and maxillofacial surgery, trauma management, oral implantology, surgical procedures, and emergency care. With extensive hands-on exposure across complex surgical disciplines, he provides precision-driven, evidence-based care with a strong focus on patient safety, comprehensive treatment planning, and optimal surgical outcomes.",
    highlights: [
      "Oral & Maxillofacial Surgery",
      "Trauma Management & Emergency Care",
      "Oral Implantology & Bone Grafting",
      "Complex Impactions & Surgical Extractions",
    ],
  },
  nidhash: {
    name: "Dr. Nidhash Siddik",
    designation: "Consultant Endodontist",
    credentials: "BDS, MDS • Consultant Endodontist",
    experience: "Precision Endodontic Specialist",
    bio: "Dr. Nidhash Siddik is an expert dental surgeon and consultant endodontist specialising in painless root canal treatments, rotary endodontics, dental restorations, and advanced conservative dentistry. With meticulous attention to detail and modern clinical techniques, he ensures precision care, patient comfort, and long-term tooth preservation.",
    highlights: [
      "Microscopic & Rotary Endodontics",
      "Painless Single-Sitting Root Canal",
      "Conservative Aesthetic Restorations",
      "Endodontic Retreatment & Tooth Preservation",
    ],
  },
  roshan: {
    name: "Dr. Roshan",
    designation: "Consultant Orthodontist",
    credentials: "MDS • Orthodontics & Dentofacial Orthopedics",
    experience: "Certified Orthodontic Specialist",
    bio: "Dr. Roshan is a certified orthodontist dedicated to crafting harmonious smiles and proper functional occlusion. Specialising in contemporary orthodontic treatments, clear aligners, ceramic braces, and interceptive orthodontics for children and adults, he combines digital precision planning with personalised care.",
    highlights: [
      "Clear Aligners & Invisible Braces",
      "Adult & Adolescent Orthodontics",
      "Dentofacial Orthopedics & Bite Correction",
      "Digital Treatment Simulation",
    ],
  },
  ayisha: {
    name: "Dr. Ayisha",
    designation: "Consultant Pedodontist",
    credentials: "MDS • Pediatric & Preventive Dentistry",
    experience: "Child Dental Care Specialist",
    bio: "Dr. Ayisha is a specialist pediatric dentist (pedodontist) focused on delivering compassionate, gentle, and child-friendly dental care. Her expertise covers preventative pediatric dentistry, early interceptive orthodontics, pulpectomies, and habit-breaking appliances, helping children build positive lifelong dental habits.",
    highlights: [
      "Child-Friendly Preventive Care",
      "Pediatric Pulpectomies & Crowns",
      "Space Maintainers & Habit Correctors",
      "Painless & Anxiety-Free Dentistry",
    ],
  },
  aslif: {
    name: "Dr. Mohammed Aslif",
    designation: "MDS • Oral & Maxillofacial Surgeon | Implantologist",
    credentials: "MDS • Oral & Maxillofacial Surgeon | Implantologist",
    experience: "Senior Surgical & Implant Specialist",
    bio: "Dr. Mohammed Aslif is a highly experienced Oral and Maxillofacial Surgeon and Implantologist with extensive expertise in surgical extractions, advanced oral surgery, and implant dentistry. With years of experience in the field, he is committed to delivering precise, evidence-based surgical and implant care through meticulous treatment planning and a patient-centred approach, ensuring high standards of safety and clinical excellence.",
    highlights: [
      "Advanced Oral & Implant Surgery",
      "Complex Extractions & Surgical Impactions",
      "Sinus Lift & Bone Reconstruction",
      "Precision Evidence-Based Surgical Care",
    ],
  },
  haris: {
    name: "Dr. Mohammed Haris PM",
    designation: "Consultant Periodontist",
    credentials: "MDS • Consultant Periodontist",
    experience: "Advanced Periodontal Specialist",
    bio: "Dr. Mohammed Haris PM is an experienced Periodontist specialising in the diagnosis, prevention, and management of gum and periodontal conditions. His clinical expertise includes flap surgery, root planing, and advanced periodontal surgical and preventive treatments, with a strong focus on preserving gum health and supporting long-term oral health. His meticulous, evidence-based approach ensures comprehensive and personalised periodontal care.",
    highlights: [
      "Periodontal Flap Surgery & Regeneration",
      "Ultrasonic Root Planing & Deep Scaling",
      "Gingival Aesthetics & Gum Grafting",
      "Preserving Long-Term Oral Health",
    ],
  },
  fathima: {
    name: "Dr. Fathima Roosa Fidha",
    designation: "Resident Dental Surgeon",
    credentials: "BDS • Resident Dental Surgeon",
    experience: "Clinical Dental Surgeon",
    bio: "Dr. Fathima Roosa Fidha is a dedicated and compassionate dental surgeon committed to providing comprehensive, patient-centred dental care. With expertise spanning preventive dentistry, restorative procedures, aesthetic smile enhancements, and gentle routine treatments, she ensures a comfortable and reassuring dental experience for all patients.",
    highlights: [
      "Preventive & Conservative Dentistry",
      "Aesthetic Dental Restorations",
      "Gentle & Reassuring Patient Consultations",
      "Comprehensive Oral Health Maintenance",
    ],
  },
};

function cleanDoctorKey(name: string): string {
  return name.toLowerCase().replace(/[.\s]/g, "");
}

function getDoctorDetail(doctorName: string): DoctorDetailInfo | null {
  const clean = cleanDoctorKey(doctorName);
  if (clean.includes("divya")) return doctorDetailsData["divya"] ?? null;
  if (clean.includes("lijeesh")) return doctorDetailsData["lijeesh"] ?? null;
  if (clean.includes("fathima") || clean.includes("roosa") || clean.includes("fidha"))
    return doctorDetailsData["fathima"] ?? null;
  if (
    clean.includes("ayisha") ||
    clean.includes("aisha") ||
    clean.includes("ratheeshms") ||
    (clean.includes("ratheesh") && !clean.includes("tk"))
  )
    return doctorDetailsData["ayisha"] ?? null;
  if (clean.includes("rathish") || clean.includes("ratheesh") || clean.includes("tk"))
    return doctorDetailsData["rathish"] ?? null;
  if (clean.includes("nidhash") || clean.includes("anas"))
    return doctorDetailsData["nidhash"] ?? null;
  if (clean.includes("roshan")) return doctorDetailsData["roshan"] ?? null;
  if (clean.includes("aslif")) return doctorDetailsData["aslif"] ?? null;
  if (clean.includes("haris")) return doctorDetailsData["haris"] ?? null;
  return null;
}

const doctorPhotos: Record<string, string> = {
  "Dr. Divya Lijeesh": specialistDrDivya, // Card 1: Dr. Divya Lijeesh
  "Dr. Divya Nath": specialistDrDivya,
  "Dr. Lijeesh Kadambil": specialistDrLijeesh, // Card 2: Dr. Lijeesh Kadambil
  "Dr. Lijeesh": specialistDrLijeesh,
  "Dr. Fathima Roosa Fidha": specialistDrFathima, // Card 3: Dr. Fathima Roosa Fidha
  "Dr. Fathima Roosa Fidha TP": specialistDrFathima,
  "Dr. Fathima": specialistDrFathima,
  "Dr. Ayisha": specialistDrAyisha, // Card 4: Dr. Ayisha
  "Dr. Aisha": specialistDrAyisha,
  "Dr. Ratheesh M.S": specialistDrAyisha,
  "Dr. Rathish TK": specialistDrRathish, // Card 5: Dr. Rathish TK
  "Dr. Rathish T.K": specialistDrRathish,
  "Dr. Rathish": specialistDrRathish,
  "Dr. Nidhash Siddik": specialistDrNidhash, // Card 6: Dr. Nidhash Siddik
  "Dr. Nidhash Saddik": specialistDrNidhash,
  "Dr. Nidhash": specialistDrNidhash,
  "Dr. Anas": specialistDrNidhash,
  "Dr. Roshan": specialistDrRoshan, // Card 7: Dr. Roshan
  "Dr. Mohammed Aslif": specialistDrAslif, // Card 8: Dr. Mohammed Aslif
  "Dr. Mohamed Aslif": specialistDrAslif,
  "Dr. Mohammed Haris PM": specialistDrHaris, // Card 9: Dr. Mohammed Haris PM
  "Dr. Mohamed Haris P.M": specialistDrHaris,
};

const fallbackPhotos: readonly string[] = [specialist3, specialist4, specialist2, specialist1];
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
  const [detailDoctor, setDetailDoctor] = useState<ClinicDoctor | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [doctorsList, setDoctorsList] = useState<ClinicDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState<ClinicBranch[]>([]);

  const handleOpenDoctorDetails = (doctor: ClinicDoctor) => {
    setDetailDoctor(doctor);
    setDetailDialogOpen(true);
  };

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

        const rawList = [...(data || [])].filter(
          (d) => !cleanDoctorKey(d.name).includes("mufeed"),
        );
        const hasFathima = rawList.some(
          (d) =>
            cleanDoctorKey(d.name).includes("fathima") ||
            cleanDoctorKey(d.name).includes("roosa") ||
            cleanDoctorKey(d.name).includes("fidha"),
        );
        if (!hasFathima) {
          rawList.push({
            id: "a3b89012-789a-4bc3-9de1-23456789abcd",
            name: "Dr. Fathima Roosa Fidha",
            specialty: "Resident Dental Surgeon",
            is_available: true,
          });
        }
        const hasAyisha = rawList.some(
          (d) =>
            cleanDoctorKey(d.name).includes("ayisha") ||
            cleanDoctorKey(d.name).includes("aisha") ||
            (cleanDoctorKey(d.name).includes("ratheesh") && cleanDoctorKey(d.name).includes("ms")),
        );
        if (!hasAyisha) {
          rawList.push({
            id: "b4c90123-890b-5cd4-aef2-34567890bcde",
            name: "Dr. Ayisha",
            specialty: "Consultant Pedodontist",
            is_available: true,
          });
        }

        // Sort strictly according to orderedDoctorOrder:
        // Card 1: Dr. Divya Lijeesh
        // Card 2: Dr. Lijeesh Kadambil
        // Card 3: Dr. Fathima Roosa Fidha
        // Card 4: Dr. Ayisha
        const sorted = rawList.sort((a, b) => {
          return getDoctorSortOrder(a.name) - getDoctorSortOrder(b.name);
        });

        const merged: ClinicDoctor[] = sorted.map((item, index) => {
          const displayName = normalizeDoctorDisplayName(item.name);

          const cleanName = cleanDoctorKey(displayName);
          const photoKey = Object.keys(doctorPhotos).find((k) => {
            const cleanK = cleanDoctorKey(k);
            return cleanName.includes(cleanK) || cleanK.includes(cleanName);
          });
          const matchedPhoto = photoKey ? doctorPhotos[photoKey] : undefined;
          const fallbackPhoto = fallbackPhotos[index % fallbackPhotos.length] ?? defaultDoctorPhoto;

          const specialty =
            cleanName.includes("lijeesh")
              ? "Chief Dental Surgeon"
              : cleanName.includes("ayisha") || cleanName.includes("aisha")
                ? "Consultant Pedodontist"
                : item.specialty;

          return {
            id: item.id,
            name: displayName,
            specialty,
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
        },
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
        },
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
  const primaryClinicName = clinics[0]?.name || "Dr. Divya's Ayankalam Dental Clinic";
  const primaryClinicLocation = clinics[0]?.location || "Ayankalam, Malappuram, Kerala";

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [doctorsList]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardDistance =
        container.clientWidth >= 1024
          ? (container.clientWidth - 48) / 3 + 24
          : container.clientWidth >= 640
          ? (container.clientWidth - 24) / 2 + 24
          : container.clientWidth * 0.85 + 24;

      container.scrollBy({
        left: direction === "right" ? cardDistance : -cardDistance,
        behavior: "smooth",
      });
    }
  };

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
        { duration: 4500 },
      );
      setSelectedSpecialistId(doctorId);
      setDialogOpen(true);
      return;
    }

    if (!isAvailable) {
      toast.info(
        `${doctorName} is marked absent today. You can still schedule an appointment with our available specialists.`,
        { duration: 4000 },
      );
      setSelectedSpecialistId(undefined);
      setDialogOpen(true);
      return;
    }
    setSelectedSpecialistId(doctorId);
    setDialogOpen(true);
  };

  return (
    <section id="specialists" className="bg-secondary py-20 sm:py-28 lg:py-32">
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
                          <span className="font-medium text-emerald-700">
                            Same-Day Bookings Active
                          </span>
                        </>
                      ) : (
                        <>
                          <CalendarX2 className="size-3.5 text-rose-600" />
                          <span className="font-medium text-rose-700">
                            No Appointments for Today • Advance Booking Open
                          </span>
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

        <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="max-w-2xl">
            <span className="eyebrow bg-background">Our Specialist</span>

            <h2 className="section-title mt-4">
              Meet Our <em>Specialists</em>
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              A dedicated team of certified professionals with one goal — your healthiest, happiest
              smile. Click any doctor to book a consultation.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-center sm:self-end">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous specialists"
              className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all duration-200 hover:bg-[#008953] hover:text-white hover:border-[#008953] disabled:opacity-30 disabled:pointer-events-none shadow-xs cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next specialists"
              className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all duration-200 hover:bg-[#008953] hover:text-white hover:border-[#008953] disabled:opacity-30 disabled:pointer-events-none shadow-xs cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 pt-1"
        >
          {loading && doctorsList.length === 0
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="snap-start shrink-0 rounded-2xl p-2.5 w-[85%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] max-w-[85%] sm:max-w-[calc((100%-24px)/2)] lg:max-w-[calc((100%-48px)/3)]"
                >
                  <div className="aspect-[853/1024] w-full rounded-xl bg-muted animate-pulse" />
                  <div className="pt-3.5 px-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))
            : doctorsList.map((doctor) => {
                const isPresent = doctor.is_available;

                return (
                  <article
                    key={doctor.id}
                    onClick={() => handleDoctorConsultation(doctor.id, isPresent, doctor.name)}
                    className="group relative cursor-pointer snap-start shrink-0 rounded-2xl p-2.5 transition-all duration-300 hover:shadow-xl border border-border/70 bg-muted/60 hover:border-border w-[85%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] max-w-[85%] sm:max-w-[calc((100%-24px)/2)] lg:max-w-[calc((100%-48px)/3)]"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleDoctorConsultation(doctor.id, isPresent, doctor.name);
                      }
                    }}
                  >
                    <div
                      className="doctor-photo relative aspect-[853/1024] overflow-hidden rounded-xl bg-[#9ea6af]"
                    >
                      <img
                        src={doctor.image}
                        alt={`${doctor.name}, ${doctor.specialty} specialist`}
                        width={853}
                        height={1024}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
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
                        <span className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-full backdrop-blur-sm bg-black/50">
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
                          handleOpenDoctorDetails(doctor);
                        }}
                        aria-label={`View detailed profile and credentials of ${doctor.name}`}
                        title="View Doctor Details"
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background p-0 text-foreground transition-all duration-200 hover:bg-[#008953] hover:text-white hover:border-[#008953] group-hover:scale-105 shadow-2xs cursor-pointer"
                      >
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </article>
                );
              })}
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

      <DoctorDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        doctor={detailDoctor}
        detailInfo={detailDoctor ? getDoctorDetail(detailDoctor.name) : null}
        onBookAppointment={(docId, isAvail, docName) => {
          handleDoctorConsultation(docId, isAvail, docName);
        }}
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
            className={`relative flex min-h-72 flex-col overflow-hidden rounded-lg p-6 transition duration-300 hover:-translate-y-1 ${
              item.feature ? "bg-footer text-hero-foreground" : "bg-secondary"
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
                className={item.feature ? "text-primary" : "text-foreground"}
                fill="currentColor"
              />

              <p className="mt-4 text-sm font-medium leading-6">{item.quote}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
