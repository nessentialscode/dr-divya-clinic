/**
 * WhatsApp Helper for Appointment Confirmation
 */

export interface WhatsAppMessageParams {
  patientName: string;
  phone: string;
  clinicName?: string | undefined;
  doctorName?: string | undefined;
  preferredDate?: string | undefined;
  preferredTime?: string | undefined;
}

export function buildWhatsAppConfirmationUrl({
  patientName,
  phone,
  clinicName,
  doctorName,
  preferredDate,
  preferredTime,
}: WhatsAppMessageParams): string {
  let cleanPhone = (phone || "").replace(/\D/g, "");
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }

  const clinic = clinicName || "Dr. Divya's Family Dental Clinic";
  const doctor =
    doctorName && doctorName !== "Any Specialist" ? doctorName : "Dr. Divya's Clinic Specialist";
  const timeStr =
    preferredDate && preferredTime
      ? `${preferredDate} at ${preferredTime}`
      : preferredDate || preferredTime || "your scheduled slot";

  // Format: "Hi Client Name, Your Appointment is confirmed in Specific Clinic for Specific Doctor in specific time"
  const message = `Hi ${patientName}, Your Appointment is confirmed in ${clinic} for ${doctor} in ${timeStr}.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
