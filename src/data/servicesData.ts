import {
  Layers,
  HeartPulse,
  Smile,
  Sparkles,
  Crown,
  ShieldCheck,
  Activity,
  Scissors,
  SmilePlus,
  Stethoscope,
  Baby,
  Microscope,
  type LucideIcon,
} from "lucide-react";

import serviceImplants from "@/assets/service-implants.jpg";
import serviceRestorative from "@/assets/service-restorative.jpg";
import serviceOrtho from "@/assets/service-ortho.jpg";
import serviceWhitening from "@/assets/service-whitening.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";
import servicePreventive from "@/assets/service-preventive.jpg";
import servicePeriodontal from "@/assets/service-periodontal.jpg";
import serviceMaxillofacial from "@/assets/service-maxillofacial.jpg";
import serviceDentures from "@/assets/service-dentures.jpg";
import serviceTmj from "@/assets/service-tmj.jpg";
import servicePediatric from "@/assets/service-pediatric.jpg";
import servicePathology from "@/assets/service-pathology.jpg";

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
  // ==========================================
  // MAIN SCREEN SERVICES (1 - 6)
  // ==========================================
  {
    slug: "dental-implants",
    dbServiceId: "30491376-451b-4968-ba30-eeef50bf09ac",
    dbServiceName: "Dental Implants",
    title: "Dental Implants",
    shortCopy:
      "Our computer-guided implantology ensures sub-millimeter precision, minimal discomfort, and rapid healing for seamless single, multiple, or full-arch restorations.",
    tag: "Implants & Surgery",
    icon: Layers,
    image: serviceImplants,
    heroBadge: "Permanent Tooth Replacement",
    headline: "Restore Missing Teeth With Lifelike Strength, Stability, and Confidence",
    fullDescription:
      "Dental implants represent the pinnacle of modern restorative dentistry. Functioning as artificial titanium tooth roots, they integrate directly into your jawbone to provide an unshakeable foundation for single crowns, multi-unit bridges, or full-arch prosthetics. At Dr. Divya's Dental Clinic, our oral surgeons and implantologists use high-resolution 3D CBCT guided imaging to position implants with sub-millimeter precision, restoring full chewing power, facial structure, and a radiant natural smile.",
    keyHighlights: [
      "3D CBCT digital computer-guided implant planning",
      "Premium grade-4 titanium & biocompatible zirconia roots",
      "Bone preservation preventing jawbone shrinkage & facial sagging",
      "Permanent lifetime solution with 98%+ clinical success rate",
    ],
    whyImportant:
      "When a tooth is lost, the surrounding alveolar jawbone begins to resorb rapidly, causing adjacent teeth to drift, destabilizing bite alignment, and aging your facial profile prematurely. Implants stimulate natural bone growth, halt resorption, and restore 100% natural chewing capacity.",
    symptoms: [
      "One or more missing teeth causing chewing difficulty or speech changes",
      "Loose, uncomfortable, or clicking removable dentures",
      "Adjacent teeth tilting into empty spaces left by missing teeth",
      "Sunken cheek appearance or jawbone loss following extractions",
      "Cracked, non-restorable tooth requiring extraction and immediate replacement",
    ],
    procedures: [
      {
        name: "Single Tooth Dental Implant",
        description:
          "Replacement of an individual missing tooth with an independent root and custom porcelain crown without modifying adjacent healthy teeth.",
      },
      {
        name: "Multiple Teeth & Bridge Implants",
        description:
          "Implant-supported bridges replacing consecutive missing teeth with maximum stability and minimal surgical intervention.",
      },
      {
        name: "Full Arch All-on-4 / All-on-6",
        description:
          "Fixed, non-removable full arch restoration restoring a complete upper or lower dental arch on just 4 to 6 strategically angled implants.",
      },
      {
        name: "Bone Grafting & Sinus Lift",
        description:
          "Advanced bone augmentation procedures creating adequate bone volume and density for secure implant anchorage.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "3D CBCT & Digital Surgical Mapping",
        description:
          "High-definition 3D imaging evaluates bone density, nerve paths, and generates a personalized virtual surgical guide.",
      },
      {
        step: "02",
        title: "Minimally Invasive Placement",
        description:
          "The sterile titanium implant post is gently embedded into the jawbone under painless local anesthesia.",
      },
      {
        step: "03",
        title: "Osseointegration & Tissue Healing",
        description:
          "Over a period of 8–12 weeks, your jawbone fuses naturally with the biocompatible implant surface.",
      },
      {
        step: "04",
        title: "Custom Crown Design & Permanent Reveal",
        description:
          "A custom milled zirconia or porcelain crown matched to your natural tooth shade is securely fastened to the abutment.",
      },
    ],
    benefits: [
      "Permanent, lifelong replacement that looks, feels, and acts like a natural tooth",
      "Restores full chewing power without dietary restrictions",
      "Protects adjacent healthy teeth from being ground down",
      "Stimulates bone retention to prevent facial aging and hollow cheeks",
    ],
    idealFor:
      "Adults with one or more missing teeth, failing root canals, or loose dentures seeking a permanent fixed solution.",
    estimatedDuration: "45 – 60 minutes per surgical placement",
    recommendedSpecialists: [
      {
        id: "4b8a2431-7e8c-4f11-9a3b-9e8c3384f931",
        name: "Dr. Mohammed Aslif",
        role: "Oral & Maxillofacial Surgeon | Implantologist",
      },
      {
        id: "d9b7366c-5e93-4a67-b50a-f0ca30e55041",
        name: "Dr. Ratheesh TK",
        role: "Oral & Maxillofacial Surgeon",
      },
    ],
    faqs: [
      {
        question: "Is the dental implant procedure painful?",
        answer:
          "The placement is performed under profound local anesthesia and is virtually painless. Most patients report feeling much less discomfort than during a routine extraction, and resume normal daily activities within 24–48 hours.",
      },
      {
        question: "How long do dental implants last?",
        answer:
          "With proper daily oral hygiene, flossing, and regular routine checkups, dental implants can last a lifetime. Clinical studies demonstrate success rates exceeding 98%.",
      },
      {
        question: "Am I a candidate if I have bone loss?",
        answer:
          "Yes. With modern bone grafting techniques, ridge expansions, and sinus lift procedures, we can rebuild adequate bone density and volume to support secure implant placement.",
      },
    ],
  },
  {
    slug: "root-canal-treatment",
    dbServiceId: "57c0a8b8-4d2d-453e-8917-6ddb66f7598d",
    dbServiceName: "Root Canal Treatment",
    title: "Root Canal Treatment",
    shortCopy:
      "Utilizing rotary endodontic instruments and apex locators to eliminate infection painlessly, preserving your natural tooth structure.",
    tag: "Endodontics",
    icon: HeartPulse,
    image: serviceRestorative,
    heroBadge: "Painless Tooth Preservation",
    headline: "Save Your Natural Tooth With Precision Single-Sitting Endodontics",
    fullDescription:
      "Severe toothaches and deep decay do not have to end in tooth extraction. Root canal treatment is a specialized procedure that removes diseased, infected pulp tissue from inside the tooth, sterilizes microscopic root canals, and seals them hermetically. At Dr. Divya's Dental Clinic, our consultant endodontists use modern rotary apex locators, dental operating loupes, and gentle local anesthesia to make root canal treatments fast, painless, and highly predictable—often completed in a single comfortable visit.",
    keyHighlights: [
      "Single-sitting painless rotary endodontics",
      "Microscopic canal visualization & digital apex locators",
      "Hermetic 3D gutta-percha canal sealing",
      "Save your natural tooth and eliminate severe throbbing pain",
    ],
    whyImportant:
      "Untreated pulp infections spread into the surrounding jawbone, forming painful abscesses, swelling, and systemic inflammation. A timely root canal stops infection in its tracks, permanently relieves excruciating nerve pain, and preserves your natural tooth root for decades.",
    symptoms: [
      "Severe, throbbing toothache that worsens when lying down or biting",
      "Prolonged lingering sensitivity to hot or cold foods and liquids",
      "Tender, swollen gum or pimple-like bump (fistula) near the tooth root",
      "Darkening or discoloration of a single tooth following trauma or deep decay",
      "Deep cavity where food consistently gets trapped and causes severe ache",
    ],
    procedures: [
      {
        name: "Single-Sitting Rotary Root Canal",
        description:
          "Efficient, modern endodontic therapy utilizing nickel-titanium rotary files to clean and seal canals in one visit.",
      },
      {
        name: "Endodontic Retreatment",
        description:
          "Specialized revision therapy resolving complex previously treated teeth with persistent apical infections.",
      },
      {
        name: "Apicoectomy & Root-End Resection",
        description:
          "Micro-surgical endodontic procedure removing persistent infection from the very tip of the tooth root.",
      },
      {
        name: "Post & Core Build-Up",
        description:
          "Reinforcing extensively damaged tooth crowns with fiber posts to provide a solid base for a protective ceramic crown.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Digital Diagnosis & Profound Anesthesia",
        description:
          "Digital X-rays map canal anatomy, and modern targeted anesthesia ensures you feel zero pain.",
      },
      {
        step: "02",
        title: "Pulp Removal & Canal Disinfection",
        description:
          "Infected nerve tissue is gently removed and canals are cleansed with antibacterial sonic irrigation.",
      },
      {
        step: "03",
        title: "Rotary Shaping & Hermetic Sealing",
        description:
          "Canals are shaped with high-precision flexible rotary files and sealed three-dimensionally with warm gutta-percha.",
      },
      {
        step: "04",
        title: "Core Restoration & Crown Protection",
        description:
          "The tooth is rebuilt with composite resin and prepared for a custom zirconia crown to prevent fracture.",
      },
    ],
    benefits: [
      "Immediately resolves severe dental pain and inflammation",
      "Saves your natural tooth and maintains normal chewing mechanics",
      "Prevents the spread of bone infection to surrounding facial tissues",
      "High long-term success rate exceeding 95% with crown protection",
    ],
    idealFor:
      "Patients with deep cavities, trauma, acute toothaches, or dental abscesses wanting to avoid tooth extraction.",
    estimatedDuration: "40 – 60 minutes",
    recommendedSpecialists: [
      {
        id: "a8c79247-fcf8-4ddc-897b-914b433cf58e",
        name: "Dr. Nidhash Saddik",
        role: "Consultant Endodontist",
      },
      {
        id: "fc1cdaee-0e99-4faa-9f6a-0359c9d713d8",
        name: "Dr. Lijeesh Kadambil",
        role: "Chief Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "Does a root canal hurt?",
        answer:
          "No! With contemporary dental anesthetics and motorized rotary technology, root canal treatment feels no different than getting a routine dental filling. In fact, the procedure relieves the excruciating pain caused by the infected nerve.",
      },
      {
        question: "Why do I need a crown after a root canal?",
        answer:
          "Once the pulp and blood supply are removed, a devitalized tooth becomes more brittle over time. A custom porcelain or zirconia crown protects the tooth from cracking under normal chewing pressures.",
      },
      {
        question: "Can a root canal be completed in a single appointment?",
        answer:
          "Yes. Most uncomplicated cases at our clinic are completed in a single efficient 45 to 60 minute appointment using advanced rotary instrumentation.",
      },
    ],
  },
  {
    slug: "braces-aligners",
    dbServiceId: "c15ac0dd-9fe4-4dba-8ff8-153ce7312411",
    dbServiceName: "Braces & Aligners",
    title: "Braces & Aligners",
    shortCopy:
      "Custom 3D scanned treatment paths provide predictable tooth movement with nearly invisible aligners or precision ceramic brackets.",
    tag: "Orthodontics",
    icon: Smile,
    image: serviceOrtho,
    heroBadge: "Straight Teeth & Balanced Smiles",
    headline: "Harmonize Your Smile With Advanced Aligners and Discreet Braces",
    fullDescription:
      "A harmonious smile not only looks radiant, but it also creates balanced bite function and prevents premature tooth wear. At Dr. Divya's Dental Clinic, our consultant orthodontists provide comprehensive teeth-straightening solutions for teenagers and adults alike. We specialize in virtually invisible custom clear aligners, aesthetic ceramic braces, and low-friction self-ligating brackets. With 3D digital smile simulation, you can preview your future smile before your treatment even begins.",
    keyHighlights: [
      "Virtually invisible removable clear aligners",
      "Tooth-colored aesthetic ceramic & self-ligating braces",
      "3D digital intraoral scanning with zero messy putty impressions",
      "Correction of crowding, gaps, overbites, crossbites, and deep bites",
    ],
    whyImportant:
      "Crooked, crowded, or overlapping teeth are notoriously difficult to clean, leading to accelerated plaque accumulation, gum disease, and tooth decay. Misaligned bites also cause uneven enamel wear, jaw joint (TMJ) strain, and chronic tension headaches.",
    symptoms: [
      "Crowded, overlapping, or rotated front teeth",
      "Visible gaps or spaces between teeth when smiling",
      "Overbite, underbite, crossbite, or open bite where teeth do not meet properly",
      "Jaw clicking, strain, or muscle fatigue during chewing",
      "Difficulty flossing between tightly cramped teeth",
    ],
    procedures: [
      {
        name: "Clear Aligners (Invisible Braces)",
        description:
          "Custom-molded transparent polyurethane trays that gradually glide teeth into perfect alignment without metal wires or brackets.",
      },
      {
        name: "Aesthetic Ceramic Braces",
        description:
          "Translucent ceramic brackets that blend naturally with your tooth enamel for an ultra-subtle appearance.",
      },
      {
        name: "Self-Ligating Metal Braces",
        description:
          "Modern low-friction orthodontic brackets that deliver faster tooth movement with fewer clinic adjustment visits.",
      },
      {
        name: "Interceptive Pediatric Orthodontics",
        description:
          "Early orthopedic guidance for developing jaws in growing children to prevent severe misalignment later in life.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "3D Digital Scan & Analysis",
        description:
          "High-resolution optical scanners capture every contour of your teeth to formulate an exact digital blueprint.",
      },
      {
        step: "02",
        title: "Digital Treatment Simulation",
        description:
          "Our orthodontist maps each tooth movement step-by-step, allowing you to preview your final smile.",
      },
      {
        step: "03",
        title: "Appliance Delivery & Instructions",
        description:
          "Your custom aligners or precision brackets are fitted with expert care, and wear instructions are provided.",
      },
      {
        step: "04",
        title: "Periodic Progress Checks & Retainers",
        description:
          "Routine checkups verify progress until completion, followed by custom retainers to maintain your flawless smile.",
      },
    ],
    benefits: [
      "Straightens teeth discreetly without interfering with your lifestyle or photos",
      "Aligners are removable for easy eating, brushing, and flossing",
      "Significantly improves oral hygiene access and lowers gum disease risks",
      "Balances bite forces to protect teeth from chipping and excessive wear",
    ],
    idealFor:
      "Teens and adults looking to straighten teeth, eliminate gaps, or correct bite alignment with comfortable modern methods.",
    estimatedDuration: "6 – 18 months depending on case complexity",
    recommendedSpecialists: [
      {
        id: "21b9ec44-c71d-4074-b5a8-d9d15024b89e",
        name: "Dr. Roshan",
        role: "Consultant Orthodontist",
      },
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Resident Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "How many hours a day do I need to wear clear aligners?",
        answer:
          "Clear aligners should be worn for 20 to 22 hours per day. You only remove them when eating meals and brushing or flossing your teeth.",
      },
      {
        question: "Am I too old for orthodontic treatment or braces?",
        answer:
          "Never! Healthy teeth can be moved at any age. A substantial portion of our orthodontic and aligner patients are adults achieving the smile they always dreamed of.",
      },
      {
        question: "Are clear aligners painful to wear?",
        answer:
          "Most patients experience a gentle feeling of snug pressure for the first day or two of switching to a new tray, which signifies that the teeth are moving gently into their ideal positions.",
      },
    ],
  },
  {
    slug: "teeth-whitening",
    dbServiceId: "8edb492c-2b80-4361-bdeb-016f91ae90c6",
    dbServiceName: "Teeth Whitening",
    title: "Teeth Whitening",
    shortCopy:
      "Clinic-grade light-activated whitening therapies that lift stubborn stains safely, brightening your enamel by up to 6–8 shades.",
    tag: "Aesthetics & Hygiene",
    icon: Sparkles,
    image: serviceWhitening,
    heroBadge: "Immediate Luminous Brightness",
    headline: "Reveal a Radiant, Dazzling White Smile in Just 45 Minutes",
    fullDescription:
      "Everyday lifestyle factors such as coffee, tea, spices, and natural aging cause gradual yellowing and discoloration of tooth enamel. Professional teeth whitening at Dr. Divya's Dental Clinic delivers safe, dramatic, and immediate results. Unlike abrasive over-the-counter kits that can damage enamel and trigger painful sensitivity, our clinic-administered whitening utilizes medical-grade hydrogen peroxide formulas activated by specialized cool-light acceleration, lifting stubborn deep stains while protecting your gums and enamel integrity.",
    keyHighlights: [
      "6 to 8 shades lighter in a single 45-minute clinic session",
      "Advanced gum-barrier isolation for zero tissue irritation",
      "Enamel-safe desensitizing formulation with remineralizing minerals",
      "Custom home maintenance trays for lasting year-round radiance",
    ],
    whyImportant:
      "A bright, unstained smile communicates health, youthful vitality, and vibrant self-confidence. Professional whitening removes chromogenic pigments safely without scratching or thinning your protective enamel layer.",
    symptoms: [
      "Yellow, brown, or dull tooth discoloration from tea, coffee, or smoking",
      "Age-related enamel thinning revealing darker underlying dentin",
      "Uneven staining across visible smiling teeth",
      "Preparing for a wedding, graduation, public appearance, or career milestone",
      "Dissatisfaction with commercial drugstore whitening strips or toothpastes",
    ],
    procedures: [
      {
        name: "In-Clinic Laser & Light-Activated Whitening",
        description:
          "High-potency clinical whitening gel activated by cool LED light to produce remarkable brightness in 45 minutes.",
      },
      {
        name: "Custom Take-Home Whitening Kits",
        description:
          "Tailor-made clear dental trays and professional-strength whitening gels for gradual, controlled home brightening.",
      },
      {
        name: "Enamel Micro-Abrasion",
        description:
          "Microscopic polishing technique that removes superficial fluorosis flecks and stubborn surface enamel imperfections.",
      },
      {
        name: "Post-Whitening Mineral Desensitization",
        description:
          "Application of bioactive calcium-phosphate paste to reinforce enamel and eliminate sensitivity.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Shade Analysis & Dental Cleaning",
        description:
          "We record your baseline shade and clean off any superficial plaque for even, flawless gel penetration.",
      },
      {
        step: "02",
        title: "Gingival Protective Barrier",
        description:
          "A medical-grade protective resin barrier is applied to seal gums and protect soft tissues completely.",
      },
      {
        step: "03",
        title: "Light-Activated Gel Application",
        description:
          "The whitening formula is applied to teeth and activated with our specialized LED light in 15-minute cycles.",
      },
      {
        step: "04",
        title: "Rinse, Desensitize & Shade Reveal",
        description:
          "The barrier is gently removed, desensitizing serum is applied, and your stunning new bright smile is revealed.",
      },
    ],
    benefits: [
      "Instant dramatic improvement visible before you leave the clinic chair",
      "Formulated with desensitizers to prevent post-treatment discomfort",
      "Significantly safer and more effective than abrasive drugstore products",
      "Boosts confidence for personal, professional, and social interactions",
    ],
    idealFor:
      "Individuals seeking a fast, dramatic, and safe aesthetic boost for discolored, stained, or aged teeth.",
    estimatedDuration: "45 – 60 minutes",
    recommendedSpecialists: [
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Chief Aesthetic & General Dental Surgeon",
      },
      {
        id: "fc1cdaee-0e99-4faa-9f6a-0359c9d713d8",
        name: "Dr. Lijeesh Kadambil",
        role: "Chief Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "Does professional whitening damage tooth enamel?",
        answer:
          "No. Professional whitening formulas safely oxygenate and dissolve chromogen molecules trapped inside microscopic enamel pores without altering the structural crystal lattice of your enamel.",
      },
      {
        question: "Will my teeth feel sensitive after whitening?",
        answer:
          "Our advanced formulas incorporate potassium nitrate and fluoride desensitizers to minimize sensitivity. Any mild transient tingling usually disappears completely within 12 to 24 hours.",
      },
      {
        question: "How long will my whitening results last?",
        answer:
          "Whitening results typically last 1 to 3 years. By maintaining good oral hygiene, moderating dark beverages, and using our touch-up trays occasionally, your brightness can be maintained indefinitely.",
      },
    ],
  },
  {
    slug: "veneers-crowns",
    dbServiceId: "358efacb-7eb5-44c7-b28f-bf488b11dd2f",
    dbServiceName: "Veneers & Crowns",
    title: "Veneers & Crowns",
    shortCopy:
      "Ultra-thin porcelain veneers and lifelike zirconia crowns crafted to restore tooth symmetry, fix chips, and create a radiant smile.",
    tag: "Prosthodontics",
    icon: Crown,
    image: serviceCosmetic,
    heroBadge: "Custom Smile Artistry",
    headline: "Transform Damaged or Discolored Teeth With Handcrafted Porcelain Artistry",
    fullDescription:
      "When teeth are severely chipped, cracked, heavily restored, or permanently discolored, custom veneers and crowns offer the ultimate combination of structural strength and breathtaking aesthetics. Ultra-thin porcelain veneers adhere to the front surface of teeth to correct spacing, shape, and shade. High-translucency zirconia and E-max ceramic crowns encase weakened teeth completely, shielding them from fracture while mimicking the light reflection of natural tooth enamel. At Dr. Divya's Dental Clinic, every restoration is custom-crafted to harmonize with your facial features and lip line.",
    keyHighlights: [
      "Ultra-thin porcelain & composite veneers",
      "Metal-free E-max & multi-layered zirconia ceramic crowns",
      "Precision digital smile design & shade matching",
      "Minimal preparation philosophy preserving maximum healthy tooth structure",
    ],
    whyImportant:
      "Heavily broken or cracked teeth are vulnerable to catastrophic fracture that could necessitate extraction. Crowns provide 360-degree structural reinforcement, while veneers address cosmetic irregularities permanently with stain-resistant porcelain.",
    symptoms: [
      "Chipped, worn-down, or fractured front or back teeth",
      "Severe internal tooth discoloration that does not respond to bleaching",
      "Gaps, uneven tooth lengths, or irregularly shaped teeth",
      "Old unsightly metal-fused crowns with dark black lines at the gumline",
      "Weakened tooth following a large filling or root canal therapy",
    ],
    procedures: [
      {
        name: "Custom Porcelain Veneers",
        description:
          "Ultra-thin, handcrafted ceramic laminates permanently bonded to the facial surface of front teeth for a flawless Hollywood smile.",
      },
      {
        name: "E-Max & Monolithic Zirconia Crowns",
        description:
          "Ultra-durable, all-ceramic full crowns that restore heavily broken teeth with unmatched lifelike translucency.",
      },
      {
        name: "Aesthetic Composite Veneers",
        description:
          "Direct chairside bonding utilizing multi-layered composite resin for single-visit cosmetic corrections.",
      },
      {
        name: "Precision Crown Replacement",
        description:
          "Upgrading dated metal-ceramic crowns with metal-free biocompatible ceramic restorations for natural gum aesthetics.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Smile Consultation & Shade Mapping",
        description:
          "We discuss your aesthetic goals, take digital intraoral scans, and map the ideal tooth proportion and color.",
      },
      {
        step: "02",
        title: "Conservative Tooth Preparation",
        description:
          "A sub-millimeter layer of enamel is delicately contoured under loupes magnification to create an exact fit.",
      },
      {
        step: "03",
        title: "Digital Scan & Temporary Placement",
        description:
          "A digital scan is transmitted to master ceramic technicians while comfortable temporary restorations protect your teeth.",
      },
      {
        step: "04",
        title: "Adhesive Bonding & Reveal",
        description:
          "Your finished custom veneers or crowns are carefully bonded with light-cured resin cement and polished to perfection.",
      },
    ],
    benefits: [
      "Completely stain-resistant porcelain surfaces maintain their luster indefinitely",
      "Restores proper biting strength to weakened or brittle teeth",
      "Corrects multiple cosmetic concerns (chips, gaps, discoloration) simultaneously",
      "Blends seamlessly with your natural teeth without dark edges",
    ],
    idealFor:
      "Individuals seeking to repair broken teeth, replace aging restorations, or achieve a symmetrical, bright, picture-perfect smile.",
    estimatedDuration: "2 visits (approx. 45 – 60 minutes each)",
    recommendedSpecialists: [
      {
        id: "fc1cdaee-0e99-4faa-9f6a-0359c9d713d8",
        name: "Dr. Lijeesh Kadambil",
        role: "Chief Dental Surgeon",
      },
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Chief Aesthetic & General Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a veneer and a crown?",
        answer:
          "A veneer covers only the visible front and biting edge of a tooth and requires very minimal preparation. A crown encases the entire tooth 360 degrees to restore structural strength when a tooth is severely decayed, cracked, or root-canal treated.",
      },
      {
        question: "Do veneers stain from coffee or tea?",
        answer:
          "High-grade dental porcelain is completely non-porous and highly resistant to stains from coffee, red wine, tea, and tobacco.",
      },
      {
        question: "How long do porcelain veneers and crowns last?",
        answer:
          "With good oral hygiene, daily flossing, and regular routine cleanings, porcelain veneers and zirconia crowns routinely last 15 to 20+ years.",
      },
    ],
  },
  {
    slug: "preventive-family-care",
    dbServiceId: "8e0f9e04-6ce5-4a9f-8577-6e63078da205",
    dbServiceName: "Preventive & Family Care",
    title: "Preventive & Family Care",
    shortCopy:
      "Comprehensive dental checkups, gentle ultrasonic cleaning, fluorides, and routine dental wellness for every member of your family.",
    tag: "Preventive Care",
    icon: ShieldCheck,
    image: servicePreventive,
    heroBadge: "Foundational Oral Health",
    headline: "Preserving Healthy Smiles for Every Generation of Your Family",
    fullDescription:
      "Preventive dentistry is the foundation of lifelong oral wellness. At Dr. Divya's Dental Clinic, we focus on identifying and treating potential dental issues before they develop into painful or costly emergencies. Our family care protocols include comprehensive oral cancer screenings, digital low-radiation radiography, periodontal tissue assessments, gentle ultrasonic scaling, and mineralizing treatments that strengthen tooth enamel for children, adults, and seniors alike.",
    keyHighlights: [
      "Ultra-low radiation HD digital diagnostics & oral cancer screening",
      "Gentle ultrasonic plaque & tartar scaling",
      "Comprehensive periodontal pocket and gum health review",
      "Enamel remineralization & protective fissure sealants",
    ],
    whyImportant:
      "Dental decay and gum inflammation develop silently without noticeable pain in their early stages. Regular preventive checkups stop plaque calcification, arrest gum bleeding, and safeguard both your teeth and overall systemic cardiovascular health.",
    symptoms: [
      "Bleeding or tender gums while brushing or flossing",
      "Persistent bad breath (halitosis) despite daily brushing",
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
      "Maintains natural tooth vitality and structural integrity across all age groups",
    ],
    idealFor:
      "Patients of all ages who want to keep their natural teeth healthy, clean, and decay-free.",
    estimatedDuration: "30 – 45 minutes",
    recommendedSpecialists: [
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Lead Resident Dental Surgeon",
      },
      {
        id: "5a396bc6-1c4b-4ca4-b378-3543b4a5cb99",
        name: "Dr. Mohamed Haris P.M",
        role: "Consultant Periodontist",
      },
    ],
    faqs: [
      {
        question: "How often should my family visit for dental checkups?",
        answer:
          "The Indian Dental Association and global standards recommend a comprehensive dental examination and professional cleaning every 6 months.",
      },
      {
        question: "Does dental cleaning cause enamel thinning or loosen teeth?",
        answer:
          "Not at all. Ultrasonic cleaning uses gentle high-frequency sound vibrations with water to remove hardened tartar. It does not scrape away enamel. Tartar removal actually prevents gum recession and bone loss that would otherwise loosen teeth.",
      },
      {
        question: "Why do my gums bleed when I brush?",
        answer:
          "Bleeding gums are a hallmark sign of gingivitis—gum inflammation triggered by bacterial plaque accumulation along the gumline. A thorough professional cleaning resolves gingivitis quickly.",
      },
    ],
  },

  // ==========================================
  // SEE ALL SERVICES (7 - 12)
  // ==========================================
  {
    slug: "periodontal-therapy-gum-surgery",
    dbServiceId: "7a1f5923-d8c9-4b68-8742-1e96d11a7001",
    dbServiceName: "Periodontal Therapy & Gum Surgery",
    title: "Periodontal Therapy & Gum Surgery",
    shortCopy:
      "Specialized care for bleeding gums, deep pocket reduction, ultrasonic root planing, and regenerative gum therapies.",
    tag: "Periodontics",
    icon: Activity,
    image: servicePeriodontal,
    heroBadge: "Advanced Gum Health",
    headline: "Arrest Periodontitis and Safeguard the Living Foundation of Your Teeth",
    fullDescription:
      "Gums and jawbones form the crucial living foundation that anchors your teeth in place. When gingivitis is left untreated, bacterial infection penetrates beneath the gumline, destroying periodontal ligaments and causing bone loss—a condition called periodontitis. At Dr. Divya's Dental Clinic, our consultant periodontist provides specialized surgical and non-surgical periodontal care. From deep ultrasonic scaling and root planing to laser debridement, regenerative bone grafting, and cosmetic gum reshaping, we restore firm, healthy, pink gums and prevent premature tooth loss.",
    keyHighlights: [
      "Advanced non-surgical deep scaling & root planing (SRP)",
      "Periodontal pocket reduction & regenerative flap surgery",
      "Bone grafting & guided tissue regeneration (GTR)",
      "Treatment of gum recession, loose teeth, and persistent halitosis",
    ],
    whyImportant:
      "Periodontal disease is the number one cause of adult tooth loss worldwide. Beyond oral health, chronic gum inflammation allows pathogenic bacteria to enter the bloodstream, elevating risks of diabetes complications, coronary heart disease, and adverse pregnancy outcomes.",
    symptoms: [
      "Gums that bleed easily when brushing, flossing, or eating firm fruits",
      "Swollen, tender, dusky red or purplish gums",
      "Receding gumline making teeth look abnormally long",
      "Loosening, shifting teeth or new gaps appearing between teeth",
      "Chronic bad breath or bad taste in the mouth that will not go away",
    ],
    procedures: [
      {
        name: "Deep Ultrasonic Scaling & Root Planing",
        description:
          "Non-surgical therapeutic deep cleaning removing stubborn subgingival calculus and smoothing rough root surfaces.",
      },
      {
        name: "Periodontal Flap Surgery",
        description:
          "Surgical access under local anesthesia to eradicate deep-seated bacterial pockets and clean inaccessible root bifurcations.",
      },
      {
        name: "Bone & Tissue Regeneration (GTR)",
        description:
          "Placement of biocompatible bone grafts and collagen barrier membranes to regrow lost jawbone support.",
      },
      {
        name: "Gingival Depigmentation & Gum Contouring",
        description:
          "Cosmetic aesthetic laser and surgical reshaping to treat dark melanin pigmentation and gummy smiles.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Periodontal Probing & Bone Mapping",
        description:
          "Comprehensive computerized probing measures pocket depths and digital X-rays assess bone levels.",
      },
      {
        step: "02",
        title: "Targeted Ultrasonic Deep Debridement",
        description:
          "Local anesthesia ensures complete comfort while ultrasonic instruments clear subgingival calculus and toxins.",
      },
      {
        step: "03",
        title: "Surgical / Laser Pocket Reduction",
        description:
          "For deep pockets, gentle flap access or laser therapy eliminates bacterial niches and stimulates tissue healing.",
      },
      {
        step: "04",
        title: "Periodontal Maintenance & Monitoring",
        description:
          "Scheduled maintenance recall appointments monitor gum reattachment and prevent recurrence of disease.",
      },
    ],
    benefits: [
      "Halts irreversible jawbone loss and saves loose teeth from extraction",
      "Eliminates chronic gum bleeding, swelling, and bad breath",
      "Protects systemic cardiovascular health by lowering vascular inflammation",
      "Restores aesthetic, tight pink gums around your teeth",
    ],
    idealFor:
      "Patients with bleeding gums, deep periodontal pockets, gum recession, or mobility in their teeth.",
    estimatedDuration: "45 – 60 minutes per quadrant",
    recommendedSpecialists: [
      {
        id: "5a396bc6-1c4b-4ca4-b378-3543b4a5cb99",
        name: "Dr. Mohamed Haris P.M",
        role: "Consultant Periodontist",
      },
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Resident Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "Can receding gums grow back naturally?",
        answer:
          "Receded gum tissue does not regenerate on its own once lost. However, periodontal therapy stops further recession immediately, and specialized gum grafting procedures can reconstruct lost tissue over exposed roots.",
      },
      {
        question: "Is deep cleaning (root planing) painful?",
        answer:
          "No. Deep root planing is performed with targeted local anesthesia so you remain completely comfortable and pain-free throughout the entire procedure.",
      },
      {
        question: "How often do I need maintenance after gum treatment?",
        answer:
          "Patients treated for periodontitis typically require periodontal maintenance cleanings every 3 to 4 months to prevent dormant bacteria from repopulating deep pockets.",
      },
    ],
  },
  {
    slug: "minor-maxillofacial-surgeries",
    dbServiceId: "7a1f5923-d8c9-4b68-8742-1e96d11a7002",
    dbServiceName: "Minor Maxillofacial Surgeries",
    title: "Minor Maxillofacial Surgeries",
    shortCopy:
      "Precision surgical extractions, impacted wisdom tooth management, frenectomies, and cyst enucleations performed with minimal discomfort.",
    tag: "Oral Surgery",
    icon: Scissors,
    image: serviceMaxillofacial,
    heroBadge: "Surgical Precision & Safety",
    headline: "Expert Oral Surgical Procedures Delivered With Gentle, Reassuring Precision",
    fullDescription:
      "Minor oral and maxillofacial surgeries encompass a spectrum of delicate procedures performed within the dental operatory to resolve complex dental impactions, soft tissue anomalies, and bone conditions. At Dr. Divya's Dental Clinic, our board-certified oral and maxillofacial surgeons perform wisdom tooth disimpactions, surgical extractions of broken roots, tongue-tie frenectomies, alveoloplasties, and cyst removals under strict sterile protocols with profound local anesthesia to ensure minimal trauma and rapid post-operative recovery.",
    keyHighlights: [
      "Painless surgical extraction of impacted third molars (wisdom teeth)",
      "Minimally invasive piezosurgical bone-cutting & atraumatic root removal",
      "Laser & scalpel labial/lingual frenectomies (tongue-tie releases)",
      "Platelet-rich fibrin (PRF) therapy accelerating socket healing",
    ],
    whyImportant:
      "Impacted wisdom teeth often push against adjacent healthy molars, triggering severe cysts, decay, crowding, and agonizing pericoronitis infections. Expert surgical removal prevents permanent damage to adjacent teeth and preserves jawbone integrity.",
    symptoms: [
      "Pain, swelling, or stiffness in the jaw near the back wisdom teeth",
      "Recurrent swelling of the gum flap behind the lower last molar (pericoronitis)",
      "Severely broken tooth fractured below the gumline that cannot be grasped with forceps",
      "Tongue-tie or tight lip frenum restricting speech or causing gum pull",
      "Asymptomatic radiolucent cyst or pathology detected on routine dental X-rays",
    ],
    procedures: [
      {
        name: "Impacted Wisdom Tooth Surgery",
        description:
          "Careful surgical sectioning and removal of deeply impacted horizontal or angular third molars with nerve safety protocols.",
      },
      {
        name: "Atraumatic Surgical Root Extraction",
        description:
          "Gentle elevation of fractured roots preserving surrounding alveolar socket bone for future implants.",
      },
      {
        name: "Frenectomy (Tongue-Tie & Lip-Tie)",
        description:
          "Quick release of restrictive fibrous tissue bands improving infant feeding, speech, or orthodontic spacing.",
      },
      {
        name: "Alveoloplasty & Ridge Contouring",
        description:
          "Surgical smoothing of jagged alveolar bone ridges to prepare comfortable foundations for dentures.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "3D Imaging & Nerve Tracing",
        description:
          "Digital radiography maps the exact position of the tooth roots relative to the inferior alveolar nerve canal.",
      },
      {
        step: "02",
        title: "Profound Local Anesthesia",
        description:
          "High-potency modern anesthetics guarantee that you will feel no sharp sensations or pain during surgery.",
      },
      {
        step: "03",
        title: "Minimally Invasive Removal",
        description:
          "The tooth is sectioned into smaller segments to allow gentle extraction with zero forceful bone expansion.",
      },
      {
        step: "04",
        title: "PRF Placement & Resorbable Sutures",
        description:
          "Healing matrices (PRF) are placed inside the socket and soft resorbable sutures promote rapid tissue closure.",
      },
    ],
    benefits: [
      "Permanently resolves recurring wisdom tooth pain, jaw swelling, and bad breath",
      "Preserves adjacent molar roots from resorption and decay",
      "Advanced surgical techniques result in significantly reduced swelling and faster recovery",
      "Socket preservation protocols keep options open for future dental implants",
    ],
    idealFor:
      "Patients with impacted wisdom teeth, severely decayed non-restorable roots, oral cysts, or anatomical soft tissue restrictions.",
    estimatedDuration: "30 – 45 minutes per surgical site",
    recommendedSpecialists: [
      {
        id: "d9b7366c-5e93-4a67-b50a-f0ca30e55041",
        name: "Dr. Ratheesh TK",
        role: "Oral & Maxillofacial Surgeon",
      },
      {
        id: "4b8a2431-7e8c-4f11-9a3b-9e8c3384f931",
        name: "Dr. Mohammed Aslif",
        role: "Oral & Maxillofacial Surgeon | Implantologist",
      },
    ],
    faqs: [
      {
        question: "Will my face swell up after wisdom tooth extraction?",
        answer:
          "Some mild cheek swelling is a normal natural inflammatory response that peaks around 48 hours and subsides over 3 to 4 days. We provide medications and cold pack protocols to keep swelling minimal.",
      },
      {
        question: "How long is the recovery time after minor oral surgery?",
        answer:
          "Most patients return to school or light desk work within 24 to 48 hours. Complete soft tissue gum healing occurs in about 7 to 10 days.",
      },
      {
        question: "What food should I eat after surgery?",
        answer:
          "We recommend soft, cool, or room-temperature foods such as yogurt, smoothies (without straws), mashed potatoes, and soups for the first 48 hours.",
      },
    ],
  },
  {
    slug: "full-partial-dentures",
    dbServiceId: "7a1f5923-d8c9-4b68-8742-1e96d11a7003",
    dbServiceName: "Full & Partial Dentures",
    title: "Full Dentures & Partial Dentures",
    shortCopy:
      "Precision-molded flexible, acrylic, and implant-supported dentures designed for optimal chew comfort, speech clarity, and natural facial support.",
    tag: "Prosthetics",
    icon: SmilePlus,
    image: serviceDentures,
    heroBadge: "Custom Prosthetic Restorations",
    headline: "Regain Chewing Confidence, Youthful Facial Tone, and a Natural Smile",
    fullDescription:
      "Losing multiple teeth affects more than just your chewing ability—it alters your facial appearance, causes lips to sink inward, and impairs speech clarity. Modern prosthodontic dentures at Dr. Divya's Dental Clinic are vastly superior to traditional, clunky false teeth. Crafted from lightweight, high-impact polymers and lifelike composite teeth, our full and partial dentures are custom-molded to fit the exact contours of your mouth. We offer conventional acrylic dentures, flexible clasp-free partials, cast partial metal frameworks, and implant-retained overdentures that snap securely into place.",
    keyHighlights: [
      "High-impact biocompatible acrylics with lifelike gingival shading",
      "Ultra-flexible, lightweight, clasp-free partial dentures",
      "Cast metal partial frameworks for exceptional chewing stability",
      "Implant-retained overdentures eliminating slipping and adhesives",
    ],
    whyImportant:
      "Multiple missing teeth collapse the vertical dimension of your face, causing deep wrinkles around the mouth and premature facial aging. Dentures restore the proper height of your bite, support lips and cheeks, and enable you to enjoy a nutritious, varied diet.",
    symptoms: [
      "Loss of all or several teeth in the upper or lower dental arch",
      "Inability to chew healthy solid foods like apples, nuts, or meats",
      "Sunken mouth profile with collapsed lips and deeper nasolabial wrinkles",
      "Speech changes or whistling sounds when pronouncing words",
      "Existing dentures that wobble, rub painful sores, or require messy glues",
    ],
    procedures: [
      {
        name: "Complete Full Dentures",
        description:
          "Custom-crafted prosthetic arches replacing all upper or lower teeth with optimal suction and natural tooth positioning.",
      },
      {
        name: "Flexible Partial Dentures (Valplast)",
        description:
          "Lightweight, unbreakable flexible nylon partial dentures with gum-colored clasps for invisible aesthetics.",
      },
      {
        name: "Cast Partial Dentures (CPD)",
        description:
          "Thin, rigid medical-grade cobalt-chromium frameworks that distribute bite pressure safely across remaining teeth.",
      },
      {
        name: "Implant-Supported Overdentures",
        description:
          "Dentures that snap firmly onto two to four dental implants via locator attachments for zero slipping.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Diagnostic Impressions & Ridge Assessment",
        description:
          "High-precision impressions capture every curve and muscle attachment of your dental ridges.",
      },
      {
        step: "02",
        title: "Bite Registration & Vertical Height",
        description:
          "We measure your optimal facial vertical height and jaw relationship to ensure comfortable chewing.",
      },
      {
        step: "03",
        title: "Wax Try-In & Aesthetic Approval",
        description:
          "Teeth are set in wax for you to test in a mirror—evaluating tooth color, size, lip fullness, and smile line before finishing.",
      },
      {
        step: "04",
        title: "Final Delivery & Acclimatization",
        description:
          "Your custom dentures are fitted, balanced for smooth chewing contact, and fine-tuned for lasting comfort.",
      },
    ],
    benefits: [
      "Restores comfortable chewing ability across a complete diet",
      "Supports facial muscles, smoothing out wrinkles and restoring youthful fullness",
      "Improves speech pronunciation and phonetics",
      "Custom color-matched to look completely organic and natural",
    ],
    idealFor:
      "Adults and seniors missing several or all natural teeth seeking a cost-effective, dependable restorative solution.",
    estimatedDuration: "3 – 4 appointments over 2 weeks",
    recommendedSpecialists: [
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Chief Aesthetic & General Dental Surgeon",
      },
      {
        id: "fc1cdaee-0e99-4faa-9f6a-0359c9d713d8",
        name: "Dr. Lijeesh Kadambil",
        role: "Chief Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "Will my dentures look like fake teeth?",
        answer:
          "Not at all. Modern prosthetics use multi-layered acrylic teeth that mimic the natural translucency, subtle striations, and contours of natural teeth. We also replicate natural gum pigments.",
      },
      {
        question: "How do I care for my dentures at home?",
        answer:
          "Remove and rinse them after meals, brush them gently with a non-abrasive denture cleanser and soft brush daily, and soak them in room-temperature water or denture solution overnight.",
      },
      {
        question: "Can implants be added to stop my loose bottom denture from wobbling?",
        answer:
          "Yes! Placing just 2 small implants in the lower jaw allows your denture to snap securely onto locator abutments, completely eliminating slippage and adhesives.",
      },
    ],
  },
  {
    slug: "tmj-treatment-splints",
    dbServiceId: "7a1f5923-d8c9-4b68-8742-1e96d11a7004",
    dbServiceName: "TMJ Treatment & Splints",
    title: "TMJ Treatment & Splints",
    shortCopy:
      "Targeted therapeutic relief for jaw joint pain, clicking sounds, tension headaches, and nighttime bruxism with custom diagnostic splints.",
    tag: "TMD & Occlusion",
    icon: Stethoscope,
    image: serviceTmj,
    heroBadge: "Jaw Joint & Muscle Comfort",
    headline: "Relieve Chronic Jaw Pain, Clicking, and Teeth Grinding With Targeted Therapy",
    fullDescription:
      "The temporomandibular joint (TMJ) connects your lower jaw to your skull, facilitating speaking, chewing, and yawning. When this intricate joint experiences disc displacement, arthritis, or muscle hyper-contraction from nighttime clenching (bruxism), it can lead to excruciating headaches, facial soreness, and jaw locking. At Dr. Divya's Dental Clinic, we offer non-invasive, evidence-based TMJ and occlusion therapies. Utilizing digital bite analysis, custom-milled hard stabilization splints, trigger-point muscle deprogramming, and occlusion adjustments, we relieve pain and protect your teeth from grinding damage.",
    keyHighlights: [
      "Digital joint evaluation & range-of-motion diagnostic mapping",
      "Custom precision-milled nocturnal stabilization splints (nightguards)",
      "Relief from chronic tension headaches, ear fullness, and facial pain",
      "Protection against nighttime bruxism, enamel chipping, and muscle fatigue",
    ],
    whyImportant:
      "Chronic nocturnal clenching generates forces exceeding 250 pounds of pressure on your teeth, fracturing enamel restorations, destroying jawbone around implants, and causing irreversible joint disc wear. Timely TMJ intervention breaks the pain cycle and preserves dentition.",
    symptoms: [
      "Clicking, popping, or grating sounds in the jaw joint when chewing or yawning",
      "Dull, aching facial pain or waking up with sore, tired jaw muscles",
      "Unexplained frequent morning headaches or migraine-like temple pain",
      "Sensation of ear fullness, ringing (tinnitus), or neck and shoulder stiffness",
      "Jaw catching, locking open, or inability to open mouth comfortably wide",
    ],
    procedures: [
      {
        name: "Hard Acrylic Stabilization Splints (Michigan Splints)",
        description:
          "Precision-crafted occlusal splints worn at night to deprogram hyperactivity in jaw muscles and guide joints into harmony.",
      },
      {
        name: "Digital Occlusal Bite Balancing",
        description:
          "Micro-adjustments to problematic tooth contact points that force the lower jaw into an unnatural posture.",
      },
      {
        name: "Trigger Point Therapy & Muscle Rehabilitation",
        description:
          "Gentle clinical physical therapy exercises, therapeutic heat modalities, and jaw posture training.",
      },
      {
        name: "Protective Athletic Sports Guards",
        description:
          "Custom impact-absorbing mouthguards shielding teeth and jaw joints during contact sports.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Comprehensive TMJ & Occlusal Exam",
        description:
          "We palpate masticatory muscles, evaluate joint noises, measure range of motion, and analyze bite forces.",
      },
      {
        step: "02",
        title: "Digital Scan & Joint Positioning",
        description:
          "High-accuracy optical scans capture upper and lower arches in their physiological relaxed joint position.",
      },
      {
        step: "03",
        title: "CAD/CAM Custom Splint Fabrication",
        description:
          "Your custom stabilization splint is precision-milled from medical-grade durable hard-soft biocompatible polymer.",
      },
      {
        step: "04",
        title: "Precision Bite Fit & Follow-Up Adjustment",
        description:
          "The splint is fitted and adjusted in our clinic to ensure even, balanced contacts across all teeth during clenching.",
      },
    ],
    benefits: [
      "Substantially reduces or eliminates morning headaches and facial tension",
      "Protects teeth and expensive dental restorations from destructive grinding",
      "Stops painful jaw clicking and prevents progressive joint disc displacement",
      "Enhances sleep quality and promotes deep muscle relaxation",
    ],
    idealFor:
      "Patients suffering from jaw clicking, facial muscle soreness, bruxism, tension headaches, or limited mouth opening.",
    estimatedDuration: "30 – 45 minutes initial consultation",
    recommendedSpecialists: [
      {
        id: "d9b7366c-5e93-4a67-b50a-f0ca30e55041",
        name: "Dr. Ratheesh TK",
        role: "Oral & Maxillofacial Surgeon",
      },
      {
        id: "4b8a2431-7e8c-4f11-9a3b-9e8c3384f931",
        name: "Dr. Mohammed Aslif",
        role: "Oral & Maxillofacial Surgeon | Implantologist",
      },
    ],
    faqs: [
      {
        question: "Can a nightguard cure my TMJ disorder?",
        answer:
          "A custom stabilization splint is the gold standard conservative therapy. It relieves joint strain, stops muscle spasm, prevents tooth damage, and allows inflamed joint tissues to heal naturally.",
      },
      {
        question: "Why is a custom dental splint better than a store-bought boil-and-bite guard?",
        answer:
          "Store-bought guards are made of soft rubber that actually stimulates your brain to chew and clench more at night, aggravating TMJ pain. Our custom hard splints provide calibrated flat occlusion that relaxes muscles.",
      },
      {
        question: "Will I need surgery for my TMJ pain?",
        answer:
          "Over 90% of TMJ and facial pain cases are successfully resolved with conservative non-surgical treatments like splints, muscle deprogramming, and lifestyle modifications.",
      },
    ],
  },
  {
    slug: "pediatric-dental-care",
    dbServiceId: "7a1f5923-d8c9-4b68-8742-1e96d11a7005",
    dbServiceName: "Pediatric Dental Care",
    title: "Pediatric Dental Care",
    shortCopy:
      "Fun, fear-free dentistry for infants, toddlers, and young teens, including cavity prevention, milk tooth pulpectomies, and space maintainers.",
    tag: "Pedodontics",
    icon: Baby,
    image: servicePediatric,
    heroBadge: "Child-Friendly Dentistry",
    headline: "Fostering Healthy Smiles and Fear-Free Dental Visits for Happy Children",
    fullDescription:
      "Children require a specialized, compassionate approach to dentistry designed to build trust and eliminate fear from their very first visit. At Dr. Divya's Dental Clinic, our pedodontist and team create a welcoming, colorful, and fun atmosphere where young patients feel secure and celebrated. We provide comprehensive pediatric dental treatments ranging from cavity-preventing fluoride varnishes and tooth sealants to gentle primary tooth restorations, pediatric pulpectomies (baby tooth root canals), space maintainers, and oral habit counseling for thumb sucking.",
    keyHighlights: [
      "Child-friendly, anxiety-free 'Tell-Show-Do' communication technique",
      "Protective dental sealants & high-potency fluoride varnishes",
      "Painless pediatric restorations & milk tooth pulpectomies",
      "Custom space maintainers guiding permanent teeth into proper alignment",
    ],
    whyImportant:
      "Primary (milk) teeth are not temporary throwaways—they are essential for speech development, proper childhood nutrition, and holding crucial space for permanent adult teeth. Early dental decay causes severe infection and can damage the developing adult teeth underneath.",
    symptoms: [
      "Child complaining of pain while chewing food or drinking cold beverages",
      "White, brown, or black chalky spots developing on primary teeth",
      "Habitual thumb sucking, tongue thrusting, or prolonged bottle feeding past age one",
      "Premature loss of a baby tooth from decay or playground injury",
      "Visible fear or anxiety regarding dental visits",
    ],
    procedures: [
      {
        name: "Painless Pediatric Fillings",
        description:
          "Gentle removal of tooth decay restored with durable, tooth-colored fluoride-releasing glass ionomer or composite.",
      },
      {
        name: "Dental Sealants & Fluoride Varnish",
        description:
          "Painless coating applied to deep chewing grooves of molars to seal out cavity-causing bacteria.",
      },
      {
        name: "Pulpectomy & Stainless Steel / Zirconia Crowns",
        description:
          "Saving infected baby teeth with gentle pulp treatment and protective pediatric crowns.",
      },
      {
        name: "Space Maintainers & Habit Appliances",
        description:
          "Custom orthodontic appliances that prevent space loss after early tooth loss and curb thumb sucking.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Friendly Welcome & Chair Familiarization",
        description:
          "We introduce the child to the dental environment with child-friendly language, toys, and positive reinforcement.",
      },
      {
        step: "02",
        title: "Gentle Visual Exam & Low-Dose Imaging",
        description:
          "A quick, fun check of dental growth, cavity risk, and jaw development with zero intimidation.",
      },
      {
        step: "03",
        title: "Preventive Treatment (Plaque & Fluoride)",
        description:
          "Teeth are gently tickled clean with flavored pastes and coated with sweet bubblegum fluoride varnish.",
      },
      {
        step: "04",
        title: "Parent Guidance & Reward Gift",
        description:
          "We guide parents on brushing techniques, diet tips, and reward the little champion with a smile badge!",
      },
    ],
    benefits: [
      "Builds positive, lifelong dental attitudes and eliminates dental phobia",
      "Prevents painful toothaches and emergency childhood dental procedures",
      "Preserves primary teeth to guide straight permanent tooth eruption",
      "Teaches children correct daily oral hygiene habits early in life",
    ],
    idealFor:
      "Infants, toddlers, children, and teenagers needing preventative wellness, cavity care, or habit correction.",
    estimatedDuration: "20 – 35 minutes",
    recommendedSpecialists: [
      {
        id: "7f053965-dbd0-4355-89f4-b2586b4bb554",
        name: "Dr. Ayisha",
        role: "Consultant Pedodontist",
      },
      {
        id: "631e3a56-84f3-4658-a269-d1e4566fa8e7",
        name: "Dr. Divya Lijeesh",
        role: "Resident Dental Surgeon",
      },
    ],
    faqs: [
      {
        question: "When should my child have their first dental visit?",
        answer:
          "The Indian Dental Association and pediatric academies recommend a child's first dental checkup by their first birthday or within 6 months of their first milk tooth erupting.",
      },
      {
        question: "Why treat a baby tooth cavity if it will fall out anyway?",
        answer:
          "Baby teeth remain in a child's mouth until age 10 to 12. Infected baby teeth cause severe pain, abscesses, difficulty eating, and can permanently damage the developing enamel of the permanent tooth underneath.",
      },
      {
        question: "What are pit and fissure sealants?",
        answer:
          "Sealants are clear or white protective coatings painted onto the deep grooves of permanent back molars. They act as a physical shield against food particles and plaque, reducing cavity risk by up to 80%.",
      },
    ],
  },
  {
    slug: "mucosal-pathology-biopsy",
    dbServiceId: "7a1f5923-d8c9-4b68-8742-1e96d11a7006",
    dbServiceName: "Mucosal Pathology & Biopsy Procedures",
    title: "Mucosal Pathology & Biopsy Procedures",
    shortCopy:
      "Expert clinical screening, diagnostic biopsies, and therapeutic management of persistent oral ulcers, lesions, and mucosal changes.",
    tag: "Oral Medicine & Diagnostics",
    icon: Microscope,
    image: servicePathology,
    heroBadge: "Diagnostic Tissue Excellence",
    headline: "Early Detection, Precision Biopsy, and Expert Management of Oral Lesions",
    fullDescription:
      "The soft mucosal lining of your mouth—including the tongue, cheeks, palate, and floor of the mouth—can develop a variety of lesions, ranging from benign aphthous ulcers and lichen planus to precancerous leukoplakia and mucosal cysts. Early diagnostic detection is paramount. At Dr. Divya's Dental Clinic, our oral and maxillofacial surgical team provides comprehensive mucosal evaluations and minimally invasive biopsy procedures. Tissue samples are collected under local anesthesia and analyzed by premier histopathology laboratories to ensure accurate diagnosis and targeted treatment plans.",
    keyHighlights: [
      "Comprehensive oral mucosal cancer & precancer screening",
      "Minimally invasive incisional and excisional biopsy techniques",
      "Therapeutic management of oral lichen planus, leukoplakia, and submucous fibrosis",
      "Rapid histopathological turnaround with dedicated clinical follow-up",
    ],
    whyImportant:
      "Many oral mucosal precancerous lesions develop painlessly in early stages. Catching abnormal tissue changes early through clinical biopsy dramatically improves treatment outcomes, preserves healthy oral tissue, and saves lives.",
    symptoms: [
      "Persistent mouth sore, ulcer, or blister that has not healed after 14 days",
      "White patches (leukoplakia) or red patches (erythroplakia) on gums, tongue, or cheek",
      "Unexplained lump, thickening, or hard mass within soft oral tissues",
      "Burning sensation or restriction in mouth opening when consuming spicy foods",
      "Difficulty swallowing, unexplained bleeding, or persistent numbness in the tongue",
    ],
    procedures: [
      {
        name: "Comprehensive Mucosal Screening Exam",
        description:
          "Systematic tactile and visual intraoral inspection of all soft tissues with high-intensity diagnostic lighting.",
      },
      {
        name: "Punch & Incisional Biopsy",
        description:
          "Minimally invasive removal of a small representative section of a lesion for histopathological examination.",
      },
      {
        name: "Excisional Biopsy of Benign Lesions",
        description:
          "Complete, curative surgical removal of localized benign fibromas, mucoceles, and papillomas in a single sitting.",
      },
      {
        name: "Medical Management of Chronic Conditions",
        description:
          "Targeted topical and systemic therapies for oral lichen planus, recurrent aphthae, and oral submucous fibrosis.",
      },
    ],
    procedureSteps: [
      {
        step: "01",
        title: "Clinical Evaluation & Documentation",
        description:
          "We measure, photograph, and document the clinical characteristics, size, and duration of the lesion.",
      },
      {
        step: "02",
        title: "Profound Localized Anesthesia",
        description:
          "A small targeted amount of local anesthetic numbs the specific site completely so you feel zero discomfort.",
      },
      {
        step: "03",
        title: "Atraumatic Biopsy Sample Collection",
        description:
          "A tiny, precise tissue specimen is harvested with micro-surgical instruments and placed in preservative media.",
      },
      {
        step: "04",
        title: "Lab Histopathology & Care Protocol",
        description:
          "The specimen is analyzed by specialized oral pathologists, and we review the findings together to initiate your treatment.",
      },
    ],
    benefits: [
      "Provides definitive, accurate histopathological diagnosis of suspicious oral lesions",
      "Ensures early intervention for precancerous conditions when they are most treatable",
      "Minimally invasive in-clinic procedure with quick recovery and minimal discomfort",
      "Delivers immense peace of mind and clarity for patients and families",
    ],
    idealFor:
      "Patients with non-healing mouth ulcers, white or red mucosal patches, persistent lumps, or individuals with a history of tobacco use.",
    estimatedDuration: "20 – 30 minutes in clinic",
    recommendedSpecialists: [
      {
        id: "d9b7366c-5e93-4a67-b50a-f0ca30e55041",
        name: "Dr. Ratheesh TK",
        role: "Oral & Maxillofacial Surgeon",
      },
      {
        id: "4b8a2431-7e8c-4f11-9a3b-9e8c3384f931",
        name: "Dr. Mohammed Aslif",
        role: "Oral & Maxillofacial Surgeon | Implantologist",
      },
    ],
    faqs: [
      {
        question: "Does an oral biopsy mean I have cancer?",
        answer:
          "Not at all. The vast majority of oral biopsies reveal benign, harmless conditions such as irritation fibromas, chronic aphthous ulcers, or inflammatory lichen planus. A biopsy provides scientific certainty so the right treatment can begin.",
      },
      {
        question: "Will having a biopsy in my mouth hurt?",
        answer:
          "The biopsy area is thoroughly numbed with local anesthesia, so you will feel no pain during the procedure. Afterwards, any mild tenderness feels like a small cheek bite and heals within a few days.",
      },
      {
        question: "How quickly do biopsy results come back?",
        answer:
          "Histopathology reports are typically completed and returned to our clinic within 3 to 5 business days, at which point our surgeon discusses the findings and next steps with you in detail.",
      },
    ],
  },
];

const legacySlugMap: Record<string, string> = {
  "general-preventive-care": "preventive-family-care",
  "cosmetic-smile-design": "veneers-crowns",
  "orthodontics-aligners": "braces-aligners",
  "restorative-dentistry": "root-canal-treatment",
};

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const resolvedSlug = legacySlugMap[slug] || slug;
  return servicesData.find((s) => s.slug === resolvedSlug || s.slug === slug);
}
