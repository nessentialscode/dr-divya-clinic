import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDoctorDisplayName(name: string): string {
  if (!name) return "";
  const lower = name.toLowerCase();
  if (lower.includes("divya")) {
    return "Dr. Divya Lijeesh";
  }
  if (lower.includes("anas") || lower.includes("nidhash")) {
    return "Dr. Nidhash Saddik";
  }
  if (lower.includes("fathima") || lower.includes("roosa") || lower.includes("fidha")) {
    return "Dr. Fathima Roosa Fidha TP";
  }
  if (lower.includes("lijeesh")) {
    return "Dr. Lijeesh Kadambil";
  }
  if (lower.includes("rathish") || lower.includes("ratheesh tk")) {
    return "Dr. Rathish T.K";
  }
  return name;
}
