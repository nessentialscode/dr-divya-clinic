import { ArrowUpRight, Quote } from "lucide-react";
import specialist1 from "@/assets/specialist-1.jpg";
import specialist2 from "@/assets/specialist-2.jpg";
import specialist3 from "@/assets/specialist-3.jpg";
import specialist4 from "@/assets/specialist-4.jpg";
import patientImage from "@/assets/about-man.jpg";

const doctors = [
  { name: "Dr. Victoria", specialty: "Orthodontics", image: specialist1 },
  { name: "Dr. William", specialty: "Periodontics", image: specialist2 },
  { name: "Dr. Isabella", specialty: "Endodontics", image: specialist3 },
  { name: "Dr. Ethan", specialty: "Orthodontics", image: specialist4 },
];

const testimonials = [
  { name: "Marvin McKinney", quote: "I was nervous at first, but Dr. Thompson explained everything clearly and the treatment was completely pain-free.", feature: true },
  { name: "Michael H.", quote: "After struggling for years with missing teeth, I can finally eat and speak comfortably. The team were so professional." },
  { name: "Esther K.", quote: "Absolutely thrilled with my results! Dr. Emma made me feel at ease from the moment I walked in. I finally love my smile in photos!" },
];

export function Specialists() {
  return (
    <section id="specialists" className="bg-secondary py-20 sm:py-28 lg:py-32">
      <div className="site-container">
        <div className="mb-10 text-center">
          <span className="eyebrow bg-background">Our Specialist</span>
          <h2 className="section-title mx-auto mt-4 text-center">
            Meet Our <em>Specialists</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            A dedicated team of certified professionals with one goal — your healthiest, happiest smile.
          </p>
        </div>
        <div className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {doctors.map((doctor) => (
            <article key={doctor.name} className="min-w-[78vw] snap-center sm:min-w-[320px] lg:min-w-0">
              <div className="doctor-photo group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <img
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty} specialist`}
                  width={480}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 pt-3">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{doctor.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{doctor.specialty}</p>
                </div>
                <a
                  href="#newsletter"
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
                  aria-label={`Contact ${doctor.name}`}
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="site-container py-20 sm:py-28 lg:py-32">
      <span className="eyebrow">Testimonials</span>
      <h2 className="section-title mt-5">Happy Smiles, <em>Happy Patients</em></h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className={`relative flex min-h-72 flex-col overflow-hidden rounded-lg p-6 transition duration-300 hover:-translate-y-1 ${item.feature ? "bg-footer text-hero-foreground" : "bg-secondary"}`}>
            {item.feature && <><img src={patientImage} alt="Marvin smiling" width={816} height={816} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65" /><div className="absolute inset-0 bg-footer/35" /></>}
            <div className="relative z-10 flex items-center gap-2 text-sm font-medium"><span className="grid size-7 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{item.name.charAt(0)}</span>{item.name}</div>
            <div className="relative z-10 mt-auto"><Quote size={25} className={item.feature ? "text-primary" : "text-foreground"} fill="currentColor" /><p className="mt-4 text-sm font-medium leading-6">{item.quote}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}