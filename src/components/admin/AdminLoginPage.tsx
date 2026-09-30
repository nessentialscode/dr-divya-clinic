import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import clinicLogoMark from "@/assets/clinic-logo-mark.png";
import { signInAdmin } from "@/lib/auth";

interface AdminLoginPageProps {
  onSuccess?: () => void;
}

export function AdminLoginPage({ onSuccess }: AdminLoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please provide both your administrator email and password.");
      return;
    }

    setLoading(true);

    try {
      await signInAdmin(trimmedEmail, password);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate({ to: "/admin" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      setError(msg || "Invalid email or password. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf6f2] text-slate-800 flex flex-col justify-between selection:bg-teal-100 font-sans">
      {/* Top back navigation */}
      <header className="w-full px-6 py-5 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Clinic Website</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[450px] bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] border border-slate-200/90 relative overflow-hidden p-6 sm:p-10">
          {/* Top Brand Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#dbb335] via-amber-400 to-[#d4a017]" />

          {/* Logo & Header — matching public site branding */}
          <div className="text-center mb-7 pt-2">
            <Link
              to="/"
              className="inline-flex flex-col items-center justify-center hover:opacity-90 transition-opacity group"
            >
              <img
                src={clinicLogoMark}
                alt="Dr. Divya's Family Dental Clinic"
                width={88}
                height={88}
                className="size-20 sm:size-24 object-contain drop-shadow-md mb-3 transition-transform group-hover:scale-105 rounded-full"
              />
              <div className="flex flex-col items-center leading-none">
                <span className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-slate-900">
                  Dr. Divya&apos;s
                </span>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#dbb335]">
                  Family Dental Clinic
                </span>
              </div>
            </Link>

            <div className="mt-4 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200/80">
                <span className="size-1.5 rounded-full bg-amber-500" />
                Staff &amp; Admin Portal
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700 leading-relaxed"
            >
              <ShieldAlert size={16} className="shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative flex items-center">
                <Mail
                  size={16}
                  className="absolute left-3.5 text-slate-400 pointer-events-none"
                />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@drdivyadental.com"
                  disabled={loading}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  size={16}
                  className="absolute left-3.5 text-slate-400 pointer-events-none"
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-[#0f172a] hover:bg-[#1e293b] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-md shadow-slate-950/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Sign In to Admin Portal</span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <p className="mt-6 text-[11px] text-center text-slate-400 leading-relaxed max-w-xs mx-auto">
            Authorized clinical personnel only. All access attempts and administrative modifications are logged securely.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-5 text-center text-xs text-slate-500">
        &copy; 2026 Dr. Divya's Family Dental Clinic
      </footer>
    </div>
  );
}
