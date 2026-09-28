import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminPortal } from "@/components/admin/AdminPortal";
import { signOutAdmin, useAdminAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Staff & Admin Portal — Dr. Divya's Family Dental Clinic" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminIndexRouteComponent,
});

function AdminIndexRouteComponent() {
  const { user, loading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/admin/login" });
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOutAdmin();
    navigate({ to: "/admin/login" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f8f6] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="size-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Loading Admin Portal...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminPortal
      userEmail={user.email}
      onSignOut={handleSignOut}
    />
  );
}
