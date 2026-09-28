import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminLoginPage } from "@/components/admin/AdminLoginPage";
import { useAdminAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Staff & Admin Login — Dr. Divya's Family Dental Clinic" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginRouteComponent,
});

function AdminLoginRouteComponent() {
  const { user, loading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/admin" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf6f2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="size-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium">Checking session...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <AdminLoginPage onSuccess={() => navigate({ to: "/admin" })} />;
}
