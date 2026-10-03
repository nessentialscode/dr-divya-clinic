import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { getDoctorSortOrder, normalizeDoctorDisplayName } from "@/lib/utils";
import { AdminHeader } from "./AdminHeader";
import { ClinicAvailability, type ClinicBranch } from "./ClinicAvailability";
import { DoctorAvailability, type DoctorRecord } from "./DoctorAvailability";
import { AppointmentStats, type AppointmentStatsData } from "./AppointmentStats";
import {
  AppointmentFilters,
  type AppointmentFilterState,
  type ServiceRecord,
} from "./AppointmentFilters";
import { AppointmentList } from "./AppointmentList";
import type { AppointmentRecord } from "./AppointmentDetailDialog";
import { FeedbackModeration, type PatientFeedbackItem } from "./FeedbackModeration";

interface AdminPortalProps {
  userEmail?: string | null | undefined;
  onSignOut: () => void;
}

export function AdminPortal({ userEmail, onSignOut }: AdminPortalProps) {
  // Master database state
  const [clinics, setClinics] = useState<ClinicBranch[]>([]);
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [feedbackList, setFeedbackList] = useState<PatientFeedbackItem[]>([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Today's date in Indian timezone YYYY-MM-DD
  const getTodayIndiaString = () => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  };

  // Filter state (defaults to today's date matching Screenshot 3)
  const [filters, setFilters] = useState<AppointmentFilterState>({
    search: "",
    status: "",
    branchId: "",
    doctorId: "",
    serviceId: "",
    date: getTodayIndiaString(),
  });

  // Fetch all master data
  const fetchData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setIsRefreshing(true);

    try {
      const [clinicsRes, doctorsRes, servicesRes, apptsRes, feedbackRes] = await Promise.all([
        supabase.from("clinics").select("*").order("display_order", { ascending: true }),
        supabase
          .from("specialists")
          .select("id, name, specialty, active, is_available")
          .order("created_at"),
        supabase.from("services").select("id, name").order("name"),
        supabase.from("appointments").select("*").order("created_at", { ascending: false }),
        supabase.from("patient_feedback").select("*").order("created_at", { ascending: false }),
      ]);

      if (clinicsRes.data) {
        setClinics(clinicsRes.data as ClinicBranch[]);
      }

      if (doctorsRes.data) {
        const sortedDoctors = [...(doctorsRes.data as DoctorRecord[])].sort(
          (a, b) => getDoctorSortOrder(a.name) - getDoctorSortOrder(b.name)
        );
        setDoctors(sortedDoctors);
      }

      if (servicesRes.data) {
        setServices(servicesRes.data as ServiceRecord[]);
      }

      if (apptsRes.data) {
        setAppointments(apptsRes.data as AppointmentRecord[]);
      }

      if (feedbackRes.data) {
        setFeedbackList(feedbackRes.data as PatientFeedbackItem[]);
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data:", err);
      toast.error("Failed to load dashboard data. Please check connection.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle clinic toggle
  const handleToggleClinic = async (id: string, currentActive: boolean) => {
    const newActive = !currentActive;

    // Optimistic update
    setClinics((prev) => prev.map((c) => (c.id === id ? { ...c, active: newActive } : c)));

    const { error } = await supabase
      .from("clinics")
      .update({ active: newActive, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      // Revert on error
      setClinics((prev) => prev.map((c) => (c.id === id ? { ...c, active: currentActive } : c)));
      toast.error(`Failed to update clinic: ${error.message}`);
    } else {
      toast.success(
        newActive
          ? "Dr. Divya's Clinic is now OPEN for public booking"
          : "Dr. Divya's Clinic is now CLOSED",
      );
    }
  };

  // Handle doctor availability toggle (is_available, NOT active!)
  const handleToggleDoctorAvailability = async (id: string, currentAvailable: boolean) => {
    const newAvailable = !currentAvailable;
    const targetDoc = doctors.find((d) => d.id === id);
    const docName = targetDoc ? targetDoc.name : "Specialist";

    // Optimistic update
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, is_available: newAvailable } : d)));

    const { error } = await supabase
      .from("specialists")
      .update({ is_available: newAvailable, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      // Revert on error
      setDoctors((prev) =>
        prev.map((d) => (d.id === id ? { ...d, is_available: currentAvailable } : d)),
      );
      toast.error(`Failed to update doctor availability: ${error.message}`);
    } else {
      toast.success(newAvailable ? `${docName} marked PRESENT` : `${docName} marked ABSENT`);
    }
  };

  // Handle appointment status change
  const handleUpdateAppointmentStatus = async (
    id: string,
    newStatus: AppointmentRecord["status"],
  ) => {
    const currentAppt = appointments.find((a) => a.id === id);
    if (currentAppt?.status === "confirmed" && newStatus === "cancelled") {
      toast.error("Confirmed appointments cannot be changed to Cancelled.");
      return;
    }

    const prevStatus = currentAppt?.status;

    // Optimistic update
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));

    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      if (prevStatus) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: prevStatus } : a)),
        );
      }
      toast.error(`Failed to update status: ${error.message}`);
    } else {
      toast.success(`Appointment status updated to ${newStatus}`);
    }
  };

  // Handle feedback moderation status
  const handleUpdateFeedbackStatus = async (
    id: string,
    newStatus: PatientFeedbackItem["status"],
  ) => {
    const prevStatus = feedbackList.find((f) => f.id === id)?.status;

    // Optimistic update
    setFeedbackList((prev) => prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f)));

    const { error } = await supabase
      .from("patient_feedback")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      if (prevStatus) {
        setFeedbackList((prev) =>
          prev.map((f) => (f.id === id ? { ...f, status: prevStatus } : f)),
        );
      }
      toast.error(`Failed to update feedback: ${error.message}`);
    } else {
      toast.success(`Feedback status changed to ${newStatus}`);
    }
  };

  // Handle feedback deletion
  const handleDeleteFeedback = async (id: string) => {
    const prev = feedbackList;
    setFeedbackList((current) => current.filter((f) => f.id !== id));

    const { error } = await supabase.from("patient_feedback").delete().eq("id", id);

    if (error) {
      setFeedbackList(prev);
      toast.error(`Failed to delete feedback: ${error.message}`);
    } else {
      toast.success("Feedback deleted successfully");
    }
  };

  // Calculate stats from actual appointments
  const stats: AppointmentStatsData = useMemo(() => {
    const todayStr = getTodayIndiaString();

    let pending = 0;
    let confirmed = 0;
    let today = 0;
    let completed = 0;
    let cancelled = 0;

    for (const a of appointments) {
      if (a.status === "pending") pending++;
      if (a.status === "confirmed") confirmed++;
      if (a.preferred_date === todayStr) today++;
      if (a.status === "completed") completed++;
      if (a.status === "cancelled") cancelled++;
    }

    return {
      total: appointments.length,
      pending,
      confirmed,
      today,
      completed,
      cancelled,
    };
  }, [appointments]);

  // Lookup maps for doctor and service names
  const doctorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const d of doctors) {
      map.set(d.id, normalizeDoctorDisplayName(d.name));
    }
    return map;
  }, [doctors]);

  const serviceMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of services) {
      map.set(s.id, s.name);
    }
    return map;
  }, [services]);

  // Filter appointments according to criteria
  const filteredAppointments: AppointmentRecord[] = useMemo(() => {
    const defaultClinicName = clinics[0]?.name || "Dr. Divya's Family Dental Clinic";
    return appointments
      .map((a) => ({
        ...a,
        doctor_name: a.specialist_id ? doctorMap.get(a.specialist_id) : "Any Specialist",
        service_name: serviceMap.get(a.service_id) || "General Care",
        clinic_name: defaultClinicName,
      }))
      .filter((a) => {
        // Search filter (patient name or phone)
        if (filters.search) {
          const q = filters.search.toLowerCase().trim();
          const matchName = (a.patient_name || "").toLowerCase().includes(q);
          const matchPhone = (a.phone || "").includes(q);
          if (!matchName && !matchPhone) return false;
        }

        // Status filter
        if (filters.status && a.status !== filters.status) {
          return false;
        }

        // Doctor filter
        if (filters.doctorId && a.specialist_id !== filters.doctorId) {
          return false;
        }

        // Service filter
        if (filters.serviceId && a.service_id !== filters.serviceId) {
          return false;
        }

        // Date filter
        if (filters.date && a.preferred_date !== filters.date) {
          return false;
        }

        return true;
      });
  }, [appointments, filters, doctorMap, serviceMap, clinics]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f4f8f6] text-slate-800 font-sans p-2.5 sm:p-5 lg:p-7 selection:bg-teal-100">
      <div className="max-w-7xl w-full mx-auto space-y-4 sm:space-y-6 min-w-0">
        {/* Header (Screenshot 2) */}
        <AdminHeader
          adminEmail={userEmail}
          onRefresh={() => fetchData(true)}
          onSignOut={onSignOut}
          isRefreshing={isRefreshing}
        />

        {/* Clinic Availability (Screenshot 2) */}
        <ClinicAvailability
          clinics={clinics}
          onToggleActive={handleToggleClinic}
          loading={loading}
        />

        {/* Doctor Availability (Screenshot 2) */}
        <DoctorAvailability
          doctors={doctors}
          onToggleAvailability={handleToggleDoctorAvailability}
          loading={loading}
        />

        {/* Statistics Cards (Screenshot 3) */}
        <AppointmentStats stats={stats} />

        {/* Search & Filters Bar (Screenshot 3) */}
        <AppointmentFilters
          filters={filters}
          onChange={setFilters}
          clinics={clinics}
          doctors={doctors}
          services={services}
        />

        {/* Appointments List & Detail View (Screenshot 3) */}
        <AppointmentList
          appointments={filteredAppointments}
          loading={loading}
          onStatusChange={handleUpdateAppointmentStatus}
          onClearDateFilter={() => setFilters((prev) => ({ ...prev, date: "" }))}
          isDateFiltered={filters.date !== ""}
        />

        {/* Patient Feedback Moderation (Screenshot 3) */}
        <FeedbackModeration
          feedbackList={feedbackList}
          loading={loading}
          onUpdateStatus={handleUpdateFeedbackStatus}
          onDeleteFeedback={handleDeleteFeedback}
        />
      </div>
    </div>
  );
}
