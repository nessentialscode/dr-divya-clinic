import {
  ShieldCheck,
  Sparkles,
  Smile,
  Layers,
  HeartPulse,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

import servicePreventive from "@/assets/service-preventive.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";
import serviceOrtho from "@/assets/service-ortho.jpg";
import serviceRestorative from "@/assets/service-restorative.jpg";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceWhitening from "@/assets/service-whitening.jpg";

export interface ServiceDetail {
  slug: string;
  dbServiceId: string;
  dbServiceName: string;
  title: string;
  shortCopy: string;
  tag: string;
  icon: LucideIcon;
  image: string;
  heroBadge: string;
  headline: string;
  fullDescription: string;
  keyHighlights: string[];
  whyImportant: string;
  symptoms: string[];
  procedures: {
    name: string;
    description: string;
  }[];
  procedureSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  benefits: string[];
  idealFor: string;
  estimatedDuration: string;
  recommendedSpecialists: {
    id: string;
    name: string;
    role: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "general-preventive-care",
    dbServiceId: "8e0f9e04-6ce5-4a9f-8577-6e63078da205",
    dbServiceName: "Preventive Care",
    title: "General & Preventive Care",
    shortCopy:
      "Routine checkups, gentle cleanings, digital diagnostics, and fluoride treatments to preserve natural teeth.",
    tag: "Preventive",
    icon: ShieldCheck,
    image: servicePreventive,
    heroBadge: "Foundational Oral Health",
    headline: "Preserving Your Natural Teeth With Proactive, Gentle Care",
    fullDescription:
      "Preventive dentistry is the foundation of lifelong oral wellness. At Dr. Divya's Dental Clinic, we focus on identifying and treating potential dental issues before they become painful or costly emergencies. Our preventive protocols include comprehensive oral cancer screenings, digital low-radiation radiography, periodontal tissue assessments, ultrasonic scaling, and mineralizing treatments that strengthen tooth enamel.",
    keyHighlights: [
      "Ultra-low radiation HD digital diagnostics",
      "Gentle ultrasonic plaque & tartar scaling",
      "Comprehensive periodontal pocket screening",
      "Enamel remineralization & protective sealants",
    ],
    whyImportant:
      "Dental decay and gum inflammation develop silently without noticeable pain in their early stages. Regular preventive checkups stop plaque calcification, arrest gum bleeding, and safeguard both your teeth and overall systemic cardiovascular health.",
    symptoms: [
      "Bleeding or tender gums while brushing or flossing",
      "Persistent bad breath (halitosis) despite brushing",
      "Mild tooth sensitivity to cold liquids or sweets",
      "Rough yellowish tartar buildup behind front teeth",
      "More than 6 months since your last professional cleaning",
    ],
    procedures: [
      {
        name: "Comprehensive Diagnostic Checkup",
        description:
          "High-definition intraoral examination, bite analysis, and tissue inspection to spot decay and micro-fractures early.",
      },
      {
        name: "Ultrasonic Scaling & Plaque Removal",
        description:
          "Vibrational sound waves gently dislodge stubborn calculus above and beneath the gumline without scratching enamel.",
      },
      {
        name: "Enamel Polishing & Stain Removal",
        description:
          "Micro-fine polishing paste removes superficial coffee, tea, and food stains, restoring a smooth, glossy surface.",
      },
      {
        name: "Protective Fluoride & Sealant Therapy",
        description:
          "Medical-grade fluoride varnish reinforces weakened mineral structures and seals deep tooth crevices against bacteria.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Digital Consultation & Scan",
        description:
          "We take digital imaging and perform a thorough visual evaluation of teeth, gums, and tongue.",
      },
      {
        step: "02",
        title: "Gentle Ultrasonic Cleansing",
        description:
          "Plaque and calculus deposits are painlessly lifted using precision water-cooled ultrasonic instruments.",
      },
      {
        step: "03",
        title: "Micro-Polish & Remineralize",
        description:
          "Teeth are buffed smooth with gentle polishing paste and protected with high-potency fluoride varnish.",
      },
      {
        step: "04",
        title: "Custom Maintenance Plan",
        description:
          "We share personalized brushing tips, flossing techniques, and schedule your next proactive review.",
      },
    ],
    benefits: [
      "Prevents painful dental emergencies and costly root canals",
      "Reverses early gingivitis and stops gum recession",
      "Leaves teeth feeling ultra-smooth, clean, and fresh",
      "Maintains natural tooth vitality and structural integrity",
    ],
    idealFor:
      "Patients of all ages who want to keep their natural teeth healthy, clean, and decay-free.",
    estimatedDuration: "30 – 45 minutes",
    recommendedSpecialists: [
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Nath",
        role: "Resident Dental Surgeon",
      },
      {
        id: "fc1cdaee-0e99-4faa-9f6a-0359c9d713d8",
        name: "Dr. Ratheesh M.S",
        role: "Consultant Pedodontist",
      },
    ],
    faqs: [
      {
        question: "How often should I visit for a dental checkup and cleaning?",
        answer:
          "The Indian Dental Association and global standards recommend a professional dental cleaning and checkup every 6 months to maintain optimal gum health and catch cavities early.",
      },
      {
        question: "Does professional dental cleaning make teeth loose or thin?",
        answer:
          "No, that is a common myth. Scaling only removes harmful bacterial tartar and calcified plaque. It does not scrape away your natural tooth enamel or weaken tooth roots.",
      },
      {
        question: "Is ultrasonic scaling painful?",
        answer:
          "Not at all. Most patients feel only a cool water vibration. If you have sensitive gums or exposed roots, we apply a gentle topical numbing gel for complete comfort.",
      },
    ],
  },
  {
    slug: "cosmetic-smile-design",
    dbServiceId: "358efacb-7eb5-44c7-b28f-bf488b11dd2f",
    dbServiceName: "Cosmetic Dentistry",
    title: "Cosmetic Smile Design",
    shortCopy:
      "Custom porcelain veneers, aesthetic composite bonding, and full smile enhancements crafted for you.",
    tag: "Cosmetic",
    icon: Sparkles,
    image: serviceCosmetic,
    heroBadge: "Aesthetic Dentistry",
    headline: "Bespoke Smile Transformations Tailored to Your Natural Facial Harmony",
    fullDescription:
      "Cosmetic Smile Design combines cutting-edge dental science with artistic craftsmanship. At Dr. Divya's Clinic, we analyze facial symmetry, lip lines, gum contours, and skin tone to craft a harmonious, radiant smile. Whether you want to correct chipped edges, eliminate unsightly gaps, or completely redesign your smile with custom porcelain veneers, every detail is digitally mapped and custom fabricated for natural translucency.",
    keyHighlights: [
      "Custom handcrafted porcelain veneers & laminates",
      "Minimally invasive composite bonding in a single visit",
      "Digital Smile Design preview before treatment begins",
      "Natural shade matching tailored to your skin tone",
    ],
    whyImportant:
      "Your smile is the first feature people notice. Discolored, crooked, or worn-down teeth can make you self-conscious in social and professional settings. Modern cosmetic dentistry restores balanced proportion and youthful luminescence without looking artificial.",
    symptoms: [
      "Chipped, cracked, or uneven front tooth edges",
      "Noticeable gaps (diastema) between teeth",
      "Deep discoloration or enamel fluorosis that bleaching cannot fix",
      "Worn down, short, or aged-looking front teeth",
      "Hesitating to smile openly in photographs or conversations",
    ],
    procedures: [
      {
        name: "Porcelain Veneers & Laminates",
        description:
          "Ultra-thin ceramic shells bonded securely to the front of teeth to correct color, shape, and alignment permanently.",
      },
      {
        name: "Aesthetic Composite Bonding",
        description:
          "Sculpted tooth-colored composite resin that repairs chips, smooths uneven edges, and closes gaps in one visit.",
      },
      {
        name: "Gum Recontouring & Symmetrical Shaping",
        description:
          "Laser sculpting of uneven or excess gum lines to eliminate a 'gummy smile' and balance tooth exposure.",
      },
      {
        name: "Full Mouth Smile Makeover",
        description:
          "A comprehensive synergy of veneers, crowns, and whitening designed to rejuvenate your entire smile line.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Aesthetic Analysis & Photography",
        description:
          "We photograph your facial angles, record your speech patterns, and define your personal smile goals.",
      },
      {
        step: "02",
        title: "Digital Smile Mockup",
        description:
          "We create a realistic 3D preview so you can see and approve your future smile before any work begins.",
      },
      {
        step: "03",
        title: "Micro-Preparation & Impression",
        description:
          "Teeth receive conservative micro-shaping and high-accuracy digital impressions are sent to master ceramists.",
      },
      {
        step: "04",
        title: "Permanent Bonding & Reveal",
        description:
          "Your custom restorations are bonded with medical resin, hand-polished, and revealed to your delight.",
      },
    ],
    benefits: [
      "Stain-resistant porcelain retains its bright white luster for 15+ years",
      "Instantly fixes chips, gaps, and awkward angles",
      "Boosts self-confidence in business and personal life",
      "Preserves the maximum possible natural tooth structure",
    ],
    idealFor:
      "Individuals desiring a flawless, camera-ready smile tailored to their facial contours.",
    estimatedDuration: "1 – 3 appointments",
    recommendedSpecialists: [
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Nath",
        role: "Resident Dental Surgeon",
      },
      {
        id: "e8f6953e-3300-4082-91bd-603bbaf211f5",
        name: "Dr. Lijeesh Kadambil",
        role: "Chief Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "How long do porcelain veneers last?",
        answer:
          "With proper oral hygiene and regular dental checkups, high-quality porcelain veneers typically last 12 to 20 years without staining or losing their natural shine.",
      },
      {
        question: "Is the veneer placement procedure painful?",
        answer:
          "No, the procedure is minimally invasive and performed under gentle local anesthesia. Most patients experience zero pain during treatment and minimal sensitivity afterward.",
      },
      {
        question: "What is the difference between bonding and veneers?",
        answer:
          "Composite bonding is applied directly in a single visit and is ideal for small chips and minor gaps. Porcelain veneers are lab-crafted ceramic shells that offer superior strength, longevity, and stain resistance.",
      },
    ],
  },
  {
    slug: "orthodontics-aligners",
    dbServiceId: "c15ac0dd-9fe4-4dba-8ff8-153ce7312411",
    dbServiceName: "Orthodontics",
    title: "Orthodontics & Aligners",
    shortCopy:
      "Precision clear aligners and modern corrective solutions to straighten teeth seamlessly and comfortably.",
    tag: "Orthodontics",
    icon: Smile,
    image: serviceOrtho,
    heroBadge: "Orthodontic Excellence",
    headline: "Discreet Alignment & Modern Orthodontics for a Perfectly Balanced Bite",
    fullDescription:
      "Orthodontics is not just about straight teeth — it is about achieving functional balance, proper chewing alignment, and jaw harmony. At Dr. Divya's Dental Clinic, we offer both state-of-the-art virtually invisible clear aligners and low-profile ceramic braces. Our digital treatment planning accurately plots tooth movements stage-by-stage, giving you predictable results with maximum comfort.",
    keyHighlights: [
      "Custom 3D-scanned invisible clear aligners",
      "Tooth-colored ceramic & self-ligating fixed braces",
      "Correction of crowding, spacing, overbites & crossbites",
      "Digitally animated simulation of weekly progression",
    ],
    whyImportant:
      "Crooked or overlapping teeth create tight food traps that are difficult to clean, increasing the risk of tooth decay and gum disease. An improper bite can also lead to premature tooth wear, jaw clenching, and temporomandibular joint (TMJ) headaches.",
    symptoms: [
      "Crowded, twisted, or overlapping teeth",
      "Noticeable gaps or spacing between dental arches",
      "Difficulty chewing or biting into certain foods",
      "Jaw clicking, popping, or muscle tension when eating",
      "Teeth biting into the palate or lips (deep bite / overjet)",
    ],
    procedures: [
      {
        name: "Clear Invisible Aligners",
        description:
          "Removable, custom-molded medical polyurethane trays that gently guide teeth into alignment without metal wires.",
      },
      {
        name: "Aesthetic Ceramic Braces",
        description:
          "Clear ceramic brackets that blend in naturally with your enamel for efficient correction with minimal visibility.",
      },
      {
        name: "Early Interceptive Orthodontics",
        description:
          "Growth modification and arch development therapies for young children to prevent complex extractions later.",
      },
      {
        name: "Custom Retainers & Stability",
        description:
          "Comfortable post-orthodontic retainers ensuring your newly aligned smile remains permanently stable.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Intraoral 3D Scanning",
        description:
          "High-precision optical scans replace messy impression putties and capture every millimetric contour.",
      },
      {
        step: "02",
        title: "Digital Aligner Simulation",
        description:
          "Our orthodontist designs a 3D video simulation demonstrating how your teeth will shift step-by-step.",
      },
      {
        step: "03",
        title: "Delivery & Fit Check",
        description:
          "You receive your custom aligner sets with simple instructions on wearing them for 20-22 hours daily.",
      },
      {
        step: "04",
        title: "Progress Monitoring & Retainers",
        description:
          "Brief check-ins every 6-8 weeks track progress, concluding with snug, clear retainers for lifelong retention.",
      },
    ],
    benefits: [
      "Aligners can be taken out to eat whatever you want and brush normally",
      "Virtually unnoticeable — smile with confidence at work and school",
      "Gentler, continuous forces mean significantly less soreness than old-school metal braces",
      "Prevents uneven enamel wear and eases jaw joint tension",
    ],
    idealFor:
      "Adults, professionals, and teens looking for an effective, discreet way to straighten teeth without bulky metal.",
    estimatedDuration: "6 – 18 months depending on case complexity",
    recommendedSpecialists: [
      {
        id: "91ae660c-96d2-489f-9eb6-0da69bb1062f",
        name: "Dr. Roshan",
        role: "Consultant Orthodontist",
      },
    ],
    faqs: [
      {
        question: "Can adults get clear aligners or braces?",
        answer:
          "Absolutely! Over 45% of our orthodontic patients are adults. As long as your gums and bone are healthy, teeth can be safely and effectively moved at any age.",
      },
      {
        question: "How many hours a day do I need to wear clear aligners?",
        answer:
          "For best results, aligners should be worn 20 to 22 hours per day, removing them only when eating, drinking hot liquids, or brushing your teeth.",
      },
      {
        question: "Will clear aligners affect my speech?",
        answer:
          "You might experience a very mild lisp for the first 24 to 48 hours as your tongue adapts. Your speech returns completely to normal within a couple of days.",
      },
    ],
  },
  {
    slug: "restorative-dentistry",
    dbServiceId: "57c0a8b8-4d2d-453e-8917-6ddb66f7598d",
    dbServiceName: "Restorative Dentistry",
    title: "Restorative Dentistry",
    shortCopy:
      "Durable tooth-colored fillings, custom porcelain crowns, and long-lasting bridges restoring bite strength.",
    tag: "Restorative",
    icon: Layers,
    image: serviceRestorative,
    heroBadge: "Reconstructive Care",
    headline: "Restoring Strength, Function & Comfort to Damaged or Decayed Teeth",
    fullDescription:
      "When teeth suffer from deep decay, trauma, or structural breakdown, restorative dentistry rebuilds their integrity and brings back natural chewing power. At Dr. Divya's Dental Clinic, we utilize bio-compatible, tooth-colored composite resins, high-strength monolithic zirconia crowns, ceramic onlays, and gentle microscopic root canal therapies to save damaged teeth that might otherwise require extraction.",
    keyHighlights: [
      "Mercury-free, tooth-colored composite restorations",
      "High-strength monolithic Zirconia and E-max ceramic crowns",
      "Painless single-visit root canal treatments (Endodontics)",
      "Fixed dental bridges to bridge missing teeth gaps",
    ],
    whyImportant:
      "Untreated tooth decay quickly penetrates past the enamel into the inner dentin and dental pulp, causing severe throbbing pain, abscess formation, and bone loss. Timely restorative intervention eliminates infection, alleviates pain, and saves your natural tooth structure.",
    symptoms: [
      "Sharp pain when chewing or biting down",
      "Lingering sensitivity to hot and cold foods",
      "Dark holes, pits, or visible dark shadowing on teeth",
      "Cracked, fractured, or crumbling tooth cusps",
      "Old, leaking dark silver amalgam fillings causing discoloration",
    ],
    procedures: [
      {
        name: "Tooth-Colored Composite Fillings",
        description:
          "Direct composite resins bonded seamlessly into prepared cavities that match your exact tooth shade.",
      },
      {
        name: "Zirconia & E-max Ceramic Crowns",
        description:
          "Full-coverage protective caps engineered to shield brittle, root-canal-treated, or heavily broken teeth.",
      },
      {
        name: "Precision Root Canal Therapy",
        description:
          "Gentle removal of infected nerve tissue, followed by antimicrobial disinfection and hermetic sealing.",
      },
      {
        name: "Inlays, Onlays & Dental Bridges",
        description:
          "Custom lab-milled porcelain reinforcements that replace lost tooth bulk without needing a full crown.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Digital X-Ray & Pain Assessment",
        description:
          "We pinpoint the exact depth of decay or fracture with high-resolution digital radiographs.",
      },
      {
        step: "02",
        title: "Gentle Anesthesia & Decay Removal",
        description:
          "Fast-acting local anesthesia ensures complete comfort while all decayed tissue is gently cleared.",
      },
      {
        step: "03",
        title: "Structural Reconstruction",
        description:
          "The tooth is built up using high-tensile bonding agents and composite resins or prepared for a crown.",
      },
      {
        step: "04",
        title: "Precision Bite Balancing & Polish",
        description:
          "We calibrate your bite to eliminate high spots and polish the restoration to a silky, natural feel.",
      },
    ],
    benefits: [
      "Permanently eliminates toothache and sensitivity",
      "Restores 100% natural bite strength so you can enjoy your favorite foods",
      "Matches surrounding teeth seamlessly with zero visible metal",
      "Prevents extraction and preserves jawbone health",
    ],
    idealFor:
      "Anyone dealing with tooth decay, cracked teeth, failed old fillings, or chewing discomfort.",
    estimatedDuration: "45 – 90 minutes",
    recommendedSpecialists: [
      {
        id: "175cbdce-7ec3-4d82-a8ac-35e0dec66e31",
        name: "Dr. Anas",
        role: "Consultant Endodontist",
      },
      {
        id: "e8f6953e-3300-4082-91bd-603bbaf211f5",
        name: "Dr. Lijeesh Kadambil",
        role: "Chief Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "Is a root canal treatment painful?",
        answer:
          "Not at all. With modern local anesthetics and rotary endodontic equipment, getting a root canal feels very similar to receiving a standard filling. It is the procedure that relieves the toothache!",
      },
      {
        question: "Why do I need a crown after a root canal?",
        answer:
          "After a root canal, the tooth loses its internal blood supply and becomes more brittle over time. A ceramic crown wraps around the tooth to protect it from fracturing under chewing forces.",
      },
      {
        question: "How long do tooth-colored composite fillings last?",
        answer:
          "Composite fillings typically last 7 to 10+ years with good oral hygiene, regular cleanings, and avoiding chewing on non-food items.",
      },
    ],
  },
  {
    slug: "dental-implants-surgery",
    dbServiceId: "30491376-451b-4968-ba30-eeef50bf09ac",
    dbServiceName: "Dental Implants",
    title: "Dental Implants & Surgery",
    shortCopy:
      "Permanent titanium implant placements, gentle wisdom teeth extractions, and bone reconstruction.",
    tag: "Surgical",
    icon: HeartPulse,
    image: serviceImplants,
    heroBadge: "Advanced Oral Surgery",
    headline: "The Gold Standard in Permanent Tooth Replacement & Oral Surgery",
    fullDescription:
      "A missing tooth impacts more than your smile — it impairs chewing efficiency and causes progressive bone loss in your jaw. Dental implants are the closest medical science has come to replicating your natural teeth. At Dr. Divya's Dental Clinic, our Oral & Maxillofacial Surgeons perform computer-guided implant placements, socket bone grafting, and gentle surgical extractions of impacted wisdom teeth using modern minimally invasive techniques.",
    keyHighlights: [
      "Pure medical-grade Grade IV titanium & zirconia implants",
      "Computer-guided surgical precision with 3D CBCT planning",
      "Painless wisdom teeth extractions with swift recovery protocols",
      "Bone augmentation & sinus lift procedures for maximum stability",
    ],
    whyImportant:
      "When a tooth is lost, the surrounding jawbone naturally begins to resorb and shrink within months, causing adjacent teeth to tilt and leading to premature facial collapse. Dental implants stimulate the jawbone just like natural tooth roots, permanently halting bone resorption.",
    symptoms: [
      "One or more missing teeth causing difficulty chewing",
      "Loose, uncomfortable dentures that shift or cause mouth sores",
      "Pain or swelling around impacted third molars (wisdom teeth)",
      "Severely cracked or broken tooth beyond conservative repair",
      "Sunken facial appearance caused by missing back molars",
    ],
    procedures: [
      {
        name: "Single & Multiple Dental Implants",
        description:
          "Titanium artificial roots placed into the jawbone topped with custom porcelain crowns that never decay.",
      },
      {
        name: "Gentle Wisdom Tooth Extraction",
        description:
          "Surgical removal of deeply impacted or misaligned third molars to prevent infection, cysts, and crowding.",
      },
      {
        name: "Bone Grafting & Ridge Augmentation",
        description:
          "Regenerative bone mineral placement to rebuild lost bone volume before or during implant positioning.",
      },
      {
        name: "Full-Arch Fixed Implant Bridges",
        description:
          "All-on-4 / All-on-6 full mouth restorations that replace an entire arch of missing teeth with fixed bridges.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "3D CBCT Scan & Planning",
        description:
          "3D cone-beam computed tomography maps bone density, nerves, and sinuses with sub-millimeter precision.",
      },
      {
        step: "02",
        title: "Gentle Surgical Placement",
        description:
          "Under local anesthesia, the biocompatible implant fixture is smoothly placed into the designated position.",
      },
      {
        step: "03",
        title: "Osseointegration (Healing)",
        description:
          "Over 8-12 weeks, your natural bone cells fuse seamlessly around the implant surface (osseointegration).",
      },
      {
        step: "04",
        title: "Final Crown Attachment",
        description:
          "A custom-shaded ceramic crown is secured to the implant abutment, completing your permanent new tooth.",
      },
    ],
    benefits: [
      "Permanent solution with documented 98%+ clinical success rate",
      "Looks, feels, and bites with the same strength as a natural tooth",
      "Stops facial sagging and prevents progressive jawbone deterioration",
      "No need to grind down healthy neighboring teeth (unlike dental bridges)",
    ],
    idealFor:
      "Patients needing permanent tooth replacement or painless extraction of problematic wisdom teeth.",
    estimatedDuration: "Initial placement 45 – 60 mins; Complete healing 2 – 3 months",
    recommendedSpecialists: [
      {
        id: "9530af42-3be6-49f0-a97c-5ef5c25d9fbd",
        name: "Dr. Rathish T.K",
        role: "Consultant Oral & Maxillofacial Surgeon",
      },
      {
        id: "cc08fa4b-ddc5-4db9-a884-fa3fb486bb2f",
        name: "Dr. Mohamed Aslif",
        role: "Consultant Oral & Maxillofacial Surgeon",
      },
    ],
    faqs: [
      {
        question: "Are dental implants painful?",
        answer:
          "Most patients report that dental implant surgery is far more comfortable than a tooth extraction. The procedure is performed under local anesthesia, and postoperative discomfort is easily managed with mild pain relievers for a day or two.",
      },
      {
        question: "How long do dental implants last?",
        answer:
          "Dental implants are designed to be a permanent lifetime solution. With daily brushing, flossing, and biannual dental reviews, implants can last 25 years to a lifetime.",
      },
      {
        question: "What if I have low bone density?",
        answer:
          "If your jawbone has thinned after tooth loss, we perform simple bone grafting or sinus lifts to build strong foundational support before or alongside implant placement.",
      },
    ],
  },
  {
    slug: "teeth-whitening-hygiene",
    dbServiceId: "8edb492c-2b80-4361-bdeb-016f91ae90c6",
    dbServiceName: "Teeth Whitening",
    title: "Teeth Whitening & Hygiene",
    shortCopy:
      "Professional in-office laser whitening and custom home kits for a vibrant, stain-free radiant smile.",
    tag: "Whitening",
    icon: WandSparkles,
    image: serviceWhitening,
    heroBadge: "Luminescent Radiance",
    headline: "Safe, Clinically Proven Whitening to Instantly Brighten Your Smile",
    fullDescription:
      "Over the years, teeth naturally accumulate stains from coffee, tea, turmeric, smoking, and age-related enamel thinning. Over-the-counter whitening pastes and abrasive powders often scratch enamel without lifting deep stains. At Dr. Divya's Dental Clinic, we offer medical-grade, accelerated chairside whitening and custom home whitening kits that safely penetrate deep enamel pores to dissolve stains while protecting delicate gum tissue and enamel minerals.",
    keyHighlights: [
      "In-office laser whitening: up to 6–8 shades whiter in 45 minutes",
      "Enamel-safe desensitizing formulation prevents sensitivity",
      "Custom take-home maintenance trays with professional gel",
      "Immediate, luminous results ideal for weddings & events",
    ],
    whyImportant:
      "A bright, clean smile conveys vitality, health, and confidence. Professional whitening treats both surface stains and deep intrinsic discolorations under controlled supervision, preventing gum burns and enamel damage caused by DIY kits.",
    symptoms: [
      "Yellowish, grey, or darkened tooth enamel",
      "Stains caused by frequent coffee, tea, wine, or tobacco consumption",
      "Uneven discoloration across front teeth",
      "Upcoming wedding, graduation, interview, or special event",
      "Frustration with ineffective drugstore whitening products",
    ],
    procedures: [
      {
        name: "In-Clinic Laser Teeth Whitening",
        description:
          "Hydrogen peroxide gel activated with specialized cold-light therapy to break apart stubborn chromogens in 45 minutes.",
      },
      {
        name: "Custom Take-Home Whitening Kit",
        description:
          "Lab-fabricated silicone trays molded to your bite, accompanied by prescription-strength carbamide peroxide gel.",
      },
      {
        name: "Air-Flow Stain Removal Therapy",
        description:
          "A gentle jet of warm water, air, and superfine glycine powder removes superficial stains in minutes.",
      },
      {
        name: "Enamel Desensitization Therapy",
        description:
          "Post-whitening potassium nitrate and amorphous calcium phosphate application that prevents temperature sensitivity.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Baseline Shade Recording",
        description:
          "We match your current enamel against a standardized clinical shade guide to measure exact progress.",
      },
      {
        step: "02",
        title: "Gingival Barrier Protection",
        description:
          "A light-cured resin barrier is placed over your gums to shield delicate soft tissues from whitening agents.",
      },
      {
        step: "03",
        title: "Whitening Gel & Light Activation",
        description:
          "Medical-grade whitening gel is applied in three 15-minute cycles, accelerated with specialized LED light.",
      },
      {
        step: "04",
        title: "Rinse, Polish & Shade Comparison",
        description:
          "We rinse away the gel, apply desensitizer, and compare your new shade — typically 5 to 8 shades brighter!",
      },
    ],
    benefits: [
      "Immediate visible transformation in just a single 45-minute clinic visit",
      "Scientifically proven safe for enamel and dental restorations",
      "Customized sensitivity prevention ensures a comfortable experience",
      "Long-lasting brightness with easy home touch-up trays",
    ],
    idealFor:
      "Anyone desiring a dramatically brighter, cleaner, and more youthful smile in minimum time.",
    estimatedDuration: "45 – 60 minutes",
    recommendedSpecialists: [
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Nath",
        role: "Resident Dental Surgeon",
      },
      {
        id: "5a396bc6-1c4b-4ca4-b378-3543b4a5cb99",
        name: "Dr. Mohamed Haris P.M",
        role: "Consultant Periodontist",
      },
    ],
    faqs: [
      {
        question: "Does professional teeth whitening damage tooth enamel?",
        answer:
          "No. Clinical studies confirm that professional whitening supervised by a dental surgeon does not erode enamel or weaken tooth structure. The formulation safely dissolves stain particles embedded in microscopic pores.",
      },
      {
        question: "How long will my teeth stay white after treatment?",
        answer:
          "Results typically last between 1 to 3 years depending on dietary habits. Occasional touch-ups with our custom home trays help preserve your radiant results indefinitely.",
      },
      {
        question: "Will I have sensitive teeth after the procedure?",
        answer:
          "Some patients may experience transient sensitivity to cold liquids for 12 to 24 hours. We apply a protective desensitizing mineral varnish immediately following treatment to minimize any discomfort.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((s) => s.slug === slug);
}
