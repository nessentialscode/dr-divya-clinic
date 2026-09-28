import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface AdminAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
}

export async function checkIsStaff(userId: string): Promise<boolean> {
  try {
    // 1. Direct query against staff_users for current authenticated user
    const { data, error } = await supabase
      .from("staff_users")
      .select("id, is_active")
      .eq("id", userId)
      .eq("is_active", true)
      .maybeSingle();

    if (!error && data?.is_active) {
      return true;
    }

    // 2. Direct verification via database is_staff() security definer RPC
    const { data: rpcIsStaff, error: rpcErr } = await supabase.rpc("is_staff");
    if (!rpcErr && rpcIsStaff === true) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("Staff authorization check failed:", err);
    return false;
  }
}

export async function signInAdmin(email: string, password: string): Promise<{ user: User; session: Session }> {
  const trimmedEmail = email.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password,
  });

  if (error) {
    throw new Error(error.message || "Invalid administrator credentials.");
  }

  if (!data.user || !data.session) {
    throw new Error("Unable to establish an authenticated session.");
  }

  // Enforce server-verified staff authorization
  const isAuthorized = await checkIsStaff(data.user.id);
  if (!isAuthorized) {
    await supabase.auth.signOut();
    throw new Error("Access denied: This account is not authorized for staff admin access.");
  }

  return { user: data.user, session: data.session };
}

export async function signOutAdmin(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
  }
}

export function useAdminAuth(): AdminAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function verifyUser(currentSession: Session | null) {
      if (!currentSession?.user) {
        if (mounted) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      const authorized = await checkIsStaff(currentSession.user.id);
      if (mounted) {
        if (authorized) {
          setSession(currentSession);
          setUser(currentSession.user);
          setIsAdmin(true);
        } else {
          // If not authorized staff, purge session
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    }

    async function initAuth() {
      try {
        const { data } = await supabase.auth.getSession();
        await verifyUser(data.session);
      } catch (err) {
        console.error("Failed to retrieve current auth session:", err);
        if (mounted) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      await verifyUser(currentSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    loading,
    isAdmin,
  };
}
