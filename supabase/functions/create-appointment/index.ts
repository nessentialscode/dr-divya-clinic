import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 1000;

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    const indianNumber = digits.slice(2);

    if (/^[6-9]\d{9}$/.test(indianNumber)) {
      return `+91${indianNumber}`;
    }
  }

  return null;
}

function isValidUUID(value: unknown): value is string {
  if (typeof value !== "string") return false;

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function isFutureOrTodayIndiaDate(date: string): boolean {
  const indiaToday = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return date >= indiaToday;
}

function isValidTime(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (!/^\d{2}:\d{2}$/.test(value)) return false;

  const [hours, minutes] = value.split(":").map(Number);

  return (
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
}

export default {
  fetch: withSupabase(
    { auth: "publishable" },
    async (req, ctx) => {
      if (req.method !== "POST") {
        return jsonResponse(
          {
            success: false,
            error: "Method not allowed",
          },
          405,
        );
      }

      try {
        const contentType = req.headers.get("content-type") ?? "";

        if (!contentType.toLowerCase().includes("application/json")) {
          return jsonResponse(
            {
              success: false,
              error: "Request must use application/json",
            },
            415,
          );
        }

        const body = await req.json();

        if (!body || typeof body !== "object") {
          return jsonResponse(
            {
              success: false,
              error: "Invalid request body",
            },
            400,
          );
        }

        const {
          patient_name,
          phone,
          specialist_id,
          service_id,
          preferred_date,
          preferred_time,
          message,
        } = body;

        /*
         * Patient name validation
         */
        if (
          typeof patient_name !== "string" ||
          patient_name.trim().length < 2 ||
          patient_name.trim().length > MAX_NAME_LENGTH
        ) {
          return jsonResponse(
            {
              success: false,
              error: "Please provide a valid patient name",
            },
            400,
          );
        }

        const normalizedName = patient_name.trim();

        /*
         * Indian phone validation
         */
        if (typeof phone !== "string") {
          return jsonResponse(
            {
              success: false,
              error: "Please provide a valid phone number",
            },
            400,
          );
        }

        const normalizedPhone = normalizePhone(phone);

        if (!normalizedPhone) {
          return jsonResponse(
            {
              success: false,
              error: "Please provide a valid Indian phone number",
            },
            400,
          );
        }

        /*
         * Service validation
         */
        if (!isValidUUID(service_id)) {
          return jsonResponse(
            {
              success: false,
              error: "Invalid service",
            },
            400,
          );
        }

        const { data: service, error: serviceError } =
          await ctx.supabase
            .from("services")
            .select("id, name")
            .eq("id", service_id)
            .eq("active", true)
            .maybeSingle();

        if (serviceError) {
          console.error(
            "Service lookup failed:",
            serviceError.message,
          );

          return jsonResponse(
            {
              success: false,
              error: "Unable to verify the selected service",
            },
            500,
          );
        }

        if (!service) {
          return jsonResponse(
            {
              success: false,
              error: "Selected service is unavailable",
            },
            400,
          );
        }

        /*
         * Specialist validation
         *
         * specialist_id is optional.
         * null means "Any Available Specialist".
         */
        let validatedSpecialistId: string | null = null;

        if (
          specialist_id !== undefined &&
          specialist_id !== null &&
          specialist_id !== ""
        ) {
          if (!isValidUUID(specialist_id)) {
            return jsonResponse(
              {
                success: false,
                error: "Invalid specialist",
              },
              400,
            );
          }

          const { data: specialist, error: specialistError } =
            await ctx.supabase
              .from("specialists")
              .select("id, name, is_available")
              .eq("id", specialist_id)
              .eq("active", true)
              .eq("is_available", true)
              .maybeSingle();

          if (specialistError) {
            console.error(
              "Specialist lookup failed:",
              specialistError.message,
            );

            return jsonResponse(
              {
                success: false,
                error: "Unable to verify the selected specialist",
              },
              500,
            );
          }

          if (!specialist) {
            return jsonResponse(
              {
                success: false,
                error: "Selected specialist is unavailable",
              },
              400,
            );
          }

          validatedSpecialistId = specialist.id;
        }

        /*
         * Appointment date validation
         */
        if (!isValidDate(preferred_date)) {
          return jsonResponse(
            {
              success: false,
              error: "Please provide a valid appointment date",
            },
            400,
          );
        }

        if (!isFutureOrTodayIndiaDate(preferred_date)) {
          return jsonResponse(
            {
              success: false,
              error: "Appointment date cannot be in the past",
            },
            400,
          );
        }

        const indiaToday = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date());

        if (preferred_date === indiaToday) {
          const { data: activeClinics, error: clinicsError } = await ctx.supabase
            .from("clinics")
            .select("id")
            .eq("active", true)
            .limit(1);

          if (!clinicsError && (!activeClinics || activeClinics.length === 0)) {
            return jsonResponse(
              {
                success: false,
                error:
                  "The clinic is currently closed today. Online booking is open for tomorrow onwards.",
              },
              400,
            );
          }
        }

        /*
         * Appointment time validation
         */
        if (!isValidTime(preferred_time)) {
          return jsonResponse(
            {
              success: false,
              error: "Please provide a valid appointment time",
            },
            400,
          );
        }

        /*
         * Optional message validation
         */
        let normalizedMessage: string | null = null;

        if (message !== undefined && message !== null) {
          if (typeof message !== "string") {
            return jsonResponse(
              {
                success: false,
                error: "Invalid message",
              },
              400,
            );
          }

          normalizedMessage = message.trim();

          if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
            return jsonResponse(
              {
                success: false,
                error: "Message is too long",
              },
              400,
            );
          }

          if (normalizedMessage.length === 0) {
            normalizedMessage = null;
          }
        }

        /*
         * Create appointment
         *
         * The admin client is used only server-side.
         * The public client never receives access to appointment CRUD.
         */
        const { data: appointment, error: appointmentError } =
          await ctx.supabaseAdmin
            .from("appointments")
            .insert({
              patient_name: normalizedName,
              phone: normalizedPhone,
              specialist_id: validatedSpecialistId,
              service_id,
              preferred_date,
              preferred_time,
              message: normalizedMessage,
            })
            .select("id, created_at")
            .single();

        if (appointmentError) {
          console.error(
            "Appointment creation failed:",
            appointmentError.message,
          );

          return jsonResponse(
            {
              success: false,
              error: "Unable to create appointment request",
            },
            500,
          );
        }

        return jsonResponse({
          success: true,
          appointment_id: appointment.id,
          message: "Appointment request received successfully",
          created_at: appointment.created_at,
        });
      } catch (error) {
        console.error(
          "Unexpected appointment function error:",
          error instanceof Error
            ? error.message
            : "Unknown error",
        );

        return jsonResponse(
          {
            success: false,
            error: "An unexpected error occurred",
          },
          500,
        );
      }
    },
  ),
};