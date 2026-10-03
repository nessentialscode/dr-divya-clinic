import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDoctorDisplayName(name: string): string {
  if (!name) return "";
  const lower = name.toLowerCase();
  const clean = lower.replace(/[^a-z]/g, "");

  if (clean.includes("divya")) {
    return "Dr. Divya Lijeesh";
  }
  if (clean.includes("lijeesh")) {
    return "Dr. Lijeesh Kadambil";
  }
  if (clean.includes("fathima") || clean.includes("roosa") || clean.includes("fidha")) {
    return "Dr. Fathima Roosa Fidha";
  }
  if (clean.includes("ayisha") || clean.includes("aisha") || (clean.includes("ratheesh") && !clean.includes("tk"))) {
    return "Dr. Ayisha";
  }
  if (clean.includes("rathish") || clean.includes("tk")) {
    return "Dr. Rathish TK";
  }
  if (clean.includes("anas") || clean.includes("nidhash") || clean.includes("siddik")) {
    return "Dr. Nidhash Siddik";
  }
  if (clean.includes("roshan")) {
    return "Dr. Roshan";
  }
  if (clean.includes("aslif")) {
    return "Dr. Mohammed Aslif";
  }
  if (clean.includes("haris")) {
    return "Dr. Mohammed Haris PM";
  }
  return name;
}

export function getDoctorSortOrder(name: string): number {
  if (!name) return 999;
  const lower = name.toLowerCase();
  const clean = lower.replace(/[^a-z]/g, "");

  if (clean.includes("divya")) return 0; // Card 1: Dr. Divya Lijeesh
  if (clean.includes("lijeesh")) return 1; // Card 2: Dr. Lijeesh Kadambil
  if (clean.includes("fathima") || clean.includes("roosa") || clean.includes("fidha")) return 2; // Card 3: Dr. Fathima Roosa Fidha
  if (clean.includes("ayisha") || clean.includes("aisha") || (clean.includes("ratheesh") && !clean.includes("tk"))) return 3; // Card 4: Dr. Ayisha
  if (clean.includes("rathish") || clean.includes("tk")) return 4; // Card 5: Dr. Rathish TK
  if (clean.includes("anas") || clean.includes("nidhash") || clean.includes("siddik")) return 5; // Card 6: Dr. Nidhash Siddik
  if (clean.includes("roshan")) return 6; // Card 7: Dr. Roshan
  if (clean.includes("aslif")) return 7; // Card 8: Dr. Mohammed Aslif
  if (clean.includes("haris")) return 8; // Card 9: Dr. Mohammed Haris PM
  return 999;
}
