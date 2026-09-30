import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

type Service = {
    id: string;
    name: string;
};

type Specialist = {
    id: string;
    name: string;
    specialty: string;
};

const appointmentSchema = z.object({
    patient_name: z
        .string()
        .trim()
        .min(2, "Please enter your full name")
        .max(100, "Name is too long"),

    phone: z
        .string()
        .trim()
        .regex(
            /^(?:\+91[\s-]?)?[6-9]\d{9}$/,
            "Enter a valid Indian mobile number",
        ),

    specialist_id: z.string().optional(),

    service_id: z.string().min(1, "Please select a service"),

    preferred_date: z
        .string()
        .min(1, "Please select a preferred date"),

    preferred_time: z
        .string()
        .min(1, "Please select a preferred time"),

    message: z
        .string()
        .max(1000, "Message is too long")
        .optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

type AppointmentDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    specialistId?: string;
    serviceId?: string;
    isClinicOpen?: boolean;
};

export function AppointmentDialog({
    open,
    onOpenChange,
    specialistId,
    serviceId,
    isClinicOpen: isClinicOpenProp,
}: AppointmentDialogProps) {
    const [clinicOpenState, setClinicOpenState] = useState<boolean>(
        isClinicOpenProp !== undefined ? isClinicOpenProp : true
    );
    const [services, setServices] = useState<Service[]>([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState<string | null>(null);

    const [specialists, setSpecialists] = useState<Specialist[]>([]);
    const [specialistsLoading, setSpecialistsLoading] = useState(true);
    const [specialistsError, setSpecialistsError] = useState<string | null>(
        null,
    );

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (isClinicOpenProp !== undefined) {
            setClinicOpenState(isClinicOpenProp);
        }
    }, [isClinicOpenProp]);

    useEffect(() => {
        if (!open) return;
        let cancelled = false;

        async function fetchClinicAvailability() {
            try {
                const { data } = await supabase
                    .from("clinics")
                    .select("id, name, active")
                    .order("display_order", { ascending: true });

                if (cancelled) return;
                if (data) {
                    setClinicOpenState(data.length > 0 && data.some((c) => c.active === true));
                }
            } catch (err) {
                console.error("Failed to check clinic availability in dialog:", err);
            }
        }

        fetchClinicAvailability();

        const channel = supabase
            .channel("public:dialog_clinics_status_check")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "clinics" },
                () => {
                    fetchClinicAvailability();
                }
            )
            .subscribe();

        return () => {
            cancelled = true;
            supabase.removeChannel(channel);
        };
    }, [open]);

    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            patient_name: "",
            phone: "",
            specialist_id: specialistId ?? "",
            service_id: serviceId ?? "",
            preferred_date: "",
            preferred_time: "",
            message: "",
        },
    });

    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        async function loadServices() {
            setServicesLoading(true);
            setServicesError(null);

            const { data, error } = await supabase
                .from("services")
                .select("id, name")
                .eq("active", true)
                .order("name");

            if (cancelled) return;

            if (error) {
                console.error("Failed to load services:", error.message);
                setServicesError(
                    "Unable to load services right now. Please try again.",
                );
                setServices([]);
            } else {
                const loaded = data ?? [];
                setServices(loaded);
                if (serviceId) {
                    const match = loaded.find(
                        (s) =>
                            s.id === serviceId ||
                            s.name.toLowerCase() === serviceId.toLowerCase() ||
                            s.name.toLowerCase().includes(serviceId.toLowerCase())
                    );
                    if (match) {
                        form.setValue("service_id", match.id, { shouldValidate: true });
                    }
                }
            }

            setServicesLoading(false);
        }

        async function loadSpecialists() {
            setSpecialistsLoading(true);
            setSpecialistsError(null);

            const { data, error } = await supabase
                .from("specialists")
                .select("id, name, specialty")
                .eq("active", true)
                .eq("is_available", true)
                .order("created_at");

            if (cancelled) return;

            if (error) {
                console.error("Failed to load specialists:", error.message);
                setSpecialistsError(
                    "Unable to load specialists right now. Please try again.",
                );
                setSpecialists([]);
                const loaded = (data ?? []).map((s) => ({
                    ...s,
                    name: s.name.toLowerCase().includes("divya") ? "Dr. Divya Lijeesh" : s.name,
                }));
                setSpecialists(loaded);
                if (specialistId) {
                    const match = loaded.find(
                        (s) =>
                            s.id === specialistId ||
                            s.name.toLowerCase() === specialistId.toLowerCase() ||
                            s.name.toLowerCase().includes(specialistId.toLowerCase())
                    );
                    if (match) {
                        form.setValue("specialist_id", match.id, { shouldValidate: true });
                    }
                }
            }

            setSpecialistsLoading(false);
        }

        loadServices();
        loadSpecialists();

        form.reset({
            patient_name: "",
            phone: "",
            specialist_id: specialistId ?? "",
            service_id: serviceId ?? "",
            preferred_date: "",
            preferred_time: "",
            message: "",
        });

        return () => {
            cancelled = true;
        };
    }, [open, specialistId, serviceId, form]);

    useEffect(() => {
        if (!open) return;

        if (specialistId && specialists.length > 0) {
            const match = specialists.find(
                (s) =>
                    s.id === specialistId ||
                    s.name.toLowerCase() === specialistId.toLowerCase() ||
                    s.name.toLowerCase().includes(specialistId.toLowerCase())
            );
            if (match) {
                form.setValue("specialist_id", match.id, { shouldValidate: true });
            }
        }
    }, [open, specialistId, specialists, form]);

    useEffect(() => {
        if (!open) return;

        if (serviceId && services.length > 0) {
            const match = services.find(
                (s) =>
                    s.id === serviceId ||
                    s.name.toLowerCase() === serviceId.toLowerCase() ||
                    s.name.toLowerCase().includes(serviceId.toLowerCase())
            );
            if (match) {
                form.setValue("service_id", match.id, { shouldValidate: true });
            }
        }
    }, [open, serviceId, services, form]);

    useEffect(() => {
        if (!open) {
            setSubmitError(null);
            setSubmitted(false);
            form.reset({
                patient_name: "",
                phone: "",
                specialist_id: "",
                service_id: "",
                preferred_date: "",
                preferred_time: "",
                message: "",
            });
        }
    }, [open, form]);

    const todayIndia = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    const tomorrowObj = new Date();
    tomorrowObj.setDate(tomorrowObj.getDate() + 1);
    const tomorrowIndia = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(tomorrowObj);

    const minDateAllowed = clinicOpenState ? todayIndia : tomorrowIndia;

    async function onSubmit(values: AppointmentFormValues) {
        setSubmitError(null);

        if (!clinicOpenState && values.preferred_date <= todayIndia) {
            form.setError("preferred_date", {
                type: "manual",
                message: "The clinic is closed today. Please select tomorrow or a later date.",
            });
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-appointment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                    },
                    body: JSON.stringify({
                        patient_name: values.patient_name.trim(),
                        phone: values.phone.trim(),
                        specialist_id: values.specialist_id || null,
                        service_id: values.service_id,
                        preferred_date: values.preferred_date,
                        preferred_time: values.preferred_time,
                        message: values.message?.trim() || null,
                    }),
                },
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error || "Unable to submit your appointment request.",
                );
            }

            setSubmitted(true);
            form.reset();
        } catch (error) {
            console.error("Appointment submission failed:", error);

            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Unable to submit your appointment request. Please try again.",
            );
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                {submitted ? (
                    <div className="flex flex-col items-center px-4 py-10 text-center">
                        <CheckCircle2
                            className="size-14 text-primary"
                            strokeWidth={1.5}
                        />

                        <DialogHeader className="mt-5">
                            <DialogTitle className="text-2xl">
                                Appointment Request Received
                            </DialogTitle>

                            <DialogDescription className="mx-auto mt-2 max-w-md">
                                Thank you. Your appointment request has been received. Our
                                clinic team will contact you to confirm your appointment.
                            </DialogDescription>
                        </DialogHeader>

                        <Button
                            type="button"
                            className="mt-7"
                            onClick={() => onOpenChange(false)}
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                Book an Appointment
                            </DialogTitle>

                            <DialogDescription>
                                Send us your preferred appointment details. Our clinic team
                                will contact you to confirm the booking.
                            </DialogDescription>
                        </DialogHeader>

                        {!clinicOpenState && (
                            <div className="mt-3 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-rose-900">
                                <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-600" />
                                <div className="space-y-0.5 text-xs">
                                    <p className="font-semibold text-rose-800">
                                        Clinic is Closed Today ({todayIndia})
                                    </p>
                                    <p className="text-rose-700">
                                        Same-day bookings are currently unavailable. You can schedule appointments for tomorrow ({tomorrowIndia}) onwards.
                                    </p>
                                </div>
                            </div>
                        )}

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="mt-2 space-y-5"
                            >
                                <FormField
                                    control={form.control}
                                    name="patient_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your full name"
                                                    autoComplete="name"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    inputMode="tel"
                                                    placeholder="9876543210"
                                                    autoComplete="tel"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="specialist_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Doctor</FormLabel>

                                            <FormControl>
                                                <select
                                                    {...field}
                                                    disabled={
                                                        specialistsLoading || !!specialistsError
                                                    }
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="">
                                                        {specialistsLoading
                                                            ? "Loading specialists..."
                                                            : specialistsError
                                                                ? "Unable to load specialists"
                                                                : "Any Available Specialist"}
                                                    </option>

                                                    {specialists.map((specialist) => (
                                                        <option
                                                            key={specialist.id}
                                                            value={specialist.id}
                                                        >
                                                            {specialist.name} — {specialist.specialty}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>

                                            <FormMessage />

                                            {specialistsError && (
                                                <p className="text-[0.8rem] font-medium text-destructive">
                                                    {specialistsError}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="service_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service</FormLabel>

                                            <FormControl>
                                                <select
                                                    {...field}
                                                    disabled={servicesLoading || !!servicesError}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="">
                                                        {servicesLoading
                                                            ? "Loading services..."
                                                            : servicesError
                                                                ? "Unable to load services"
                                                                : "Select a service"}
                                                    </option>

                                                    {services.map((service) => (
                                                        <option key={service.id} value={service.id}>
                                                            {service.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>

                                            <FormMessage />

                                            {servicesError && (
                                                <p className="text-[0.8rem] font-medium text-destructive">
                                                    {servicesError}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="preferred_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preferred Date</FormLabel>

                                                <FormControl>
                                                    <div className="relative">
                                                        <CalendarDays
                                                            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                                                            aria-hidden="true"
                                                        />

                                                        <Input
                                                            type="date"
                                                            min={minDateAllowed}
                                                            className="pl-10"
                                                            {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                if (!clinicOpenState && e.target.value <= todayIndia) {
                                                                    form.setError("preferred_date", {
                                                                        type: "manual",
                                                                        message: "The clinic is closed today. Please select tomorrow or a future date.",
                                                                    });
                                                                } else {
                                                                    form.clearErrors("preferred_date");
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>

                                                {!clinicOpenState && (
                                                    <p className="text-[0.75rem] font-medium text-rose-600 mt-1">
                                                        Clinic closed today. Earliest available date is tomorrow ({tomorrowIndia}).
                                                    </p>
                                                )}

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="preferred_time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preferred Time</FormLabel>

                                                <FormControl>
                                                    <Input type="time" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Message{" "}
                                                <span className="text-muted-foreground">
                                                    (Optional)
                                                </span>
                                            </FormLabel>

                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us anything you'd like the clinic to know..."
                                                    className="min-h-24 resize-none"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {submitError && (
                                    <div
                                        role="alert"
                                        className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                                    >
                                        {submitError}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        form.formState.isSubmitting ||
                                        servicesLoading ||
                                        services.length === 0 ||
                                        specialistsLoading ||
                                        specialists.length === 0
                                    }
                                >
                                    {form.formState.isSubmitting ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Sending Request...
                                        </>
                                    ) : (
                                        "Request Appointment"
                                    )}
                                </Button>

                                <p className="text-center text-xs leading-5 text-muted-foreground">
                                    This is an appointment request. The clinic will contact you
                                    to confirm the final appointment time.
                                </p>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}