import { Check, Clock, Loader2, MessageSquare, Star, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface PatientFeedbackItem {
  id: string;
  patient_name: string;
  treatment: string | null;
  rating: number;
  message: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface FeedbackModerationProps {
  feedbackList: PatientFeedbackItem[];
  loading?: boolean | undefined;
  onUpdateStatus: (id: string, newStatus: PatientFeedbackItem["status"]) => Promise<void>;
  onDeleteFeedback: (id: string) => Promise<void>;
}

export function FeedbackModeration({
  feedbackList,
  loading = false,
  onUpdateStatus,
  onDeleteFeedback,
}: FeedbackModerationProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  const pendingCount = feedbackList.filter((f) => f.status === "pending").length;
  const approvedCount = feedbackList.filter((f) => f.status === "approved").length;
  const rejectedCount = feedbackList.filter((f) => f.status === "rejected").length;

  const filteredList = feedbackList.filter((f) => {
    if (activeTab === "all") return true;
    return f.status === activeTab;
  });

  const handleStatusChange = async (id: string, status: PatientFeedbackItem["status"]) => {
    try {
      setUpdatingId(id);
      await onUpdateStatus(id, status);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this testimonial?")) {
      return;
    }

    try {
      setUpdatingId(id);
      await onDeleteFeedback(id);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] p-3.5 sm:p-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-slate-500 shrink-0" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Patient Feedback Moderation
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Review submitted patient testimonials prior to public display
          </p>
        </div>

        {/* Counter Tab Buttons Matching Screenshot 2 */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 border border-slate-200/70 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Pending</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === "pending"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200/80 text-slate-700"
              }`}
            >
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("approved")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "approved"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Approved</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === "approved"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-200/80 text-slate-700"
              }`}
            >
              {approvedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rejected")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "rejected"
                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Rejected</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                activeTab === "rejected"
                  ? "bg-slate-200 text-slate-800"
                  : "bg-slate-200/80 text-slate-700"
              }`}
            >
              {rejectedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      {loading && feedbackList.length === 0 ? (
        <div className="py-8 flex items-center justify-center text-slate-400 gap-2">
          <Loader2 size={16} className="animate-spin text-sky-600" />
          <span className="text-xs">Loading feedback entries...</span>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">
          {activeTab === "pending"
            ? "No pending feedback submissions found."
            : activeTab === "approved"
              ? "No approved feedback submissions found."
              : activeTab === "rejected"
                ? "No rejected feedback submissions found."
                : "No feedback or testimonials submitted yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((item) => {
            const isUpdating = updatingId === item.id;

            return (
              <div
                key={item.id}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/70 bg-white hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 min-w-0"
              >
                <div className="min-w-0 space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900">
                      {item.patient_name}
                    </span>
                    {item.treatment && (
                      <span className="text-[11px] text-slate-500 font-medium px-2 py-0.5 rounded-md bg-slate-100">
                        {item.treatment}
                      </span>
                    )}
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({
                        length: Math.max(0, Math.min(5, Math.floor(Number(item.rating) || 0))),
                      }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {item.status === "approved" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Approved
                    </span>
                  ) : item.status === "pending" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                      Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      Rejected
                    </span>
                  )}

                  {item.status !== "approved" && (
                    <Button
                      type="button"
                      size="sm"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(item.id, "approved")}
                      className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2.5 gap-1"
                    >
                      <Check size={12} />
                      <span>Approve</span>
                    </Button>
                  )}

                  {item.status !== "rejected" && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(item.id, "rejected")}
                      className="h-7 text-xs border-amber-300 text-amber-700 hover:bg-amber-50 font-medium px-2.5 gap-1"
                    >
                      <X size={12} />
                      <span>Reject</span>
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isUpdating}
                    onClick={() => handleDelete(item.id)}
                    className="h-7 size-7 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete feedback"
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
