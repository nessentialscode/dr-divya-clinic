import { useState } from "react";
import { CheckCircle2, Loader2, MessageSquarePlus, ShieldCheck, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

interface AddFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted?: () => void;
}

const COMMON_TREATMENTS = [
  "General Dentistry & Checkup",
  "Orthodontics & Invisalign®️",
  "Teeth Whitening & Cleaning",
  "Root Canal Treatment",
  "Dental Implants & Restorations",
  "Cosmetic Smile Makeover",
  "Pediatric Dental Care",
  "Emergency Dental Care",
];

export function AddFeedbackDialog({
  open,
  onOpenChange,
  onSubmitted,
}: AddFeedbackDialogProps) {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setName("");
    setTreatment("");
    setRating(5);
    setHoverRating(null);
    setMessage("");
    setSubmitted(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTimeout(resetForm, 200);
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      toast.error("Please provide a short feedback message (at least 10 characters)");
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase.from("patient_feedback").insert([
        {
          patient_name: name.trim(),
          treatment: treatment.trim() || null,
          rating,
          message: message.trim(),
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Failed to submit feedback:", error);
        toast.error(`Could not submit feedback: ${error.message}`);
        return;
      }

      setSubmitted(true);
      toast.success(
        "Thank you! Your feedback has been submitted for admin approval and will appear on our website once reviewed.",
        { duration: 5000 },
      );

      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0 border-border/80 bg-background rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/30 to-secondary p-5 sm:p-6 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-background shadow-xs text-primary">
              <MessageSquarePlus className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                Share Your Feedback
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                We value your experience at Dr. Divya's Dental Clinic.
              </DialogDescription>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="size-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-foreground">Feedback Submitted!</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-foreground">{name}</span>! Your review
                has been sent to our administration team for moderation and will appear publicly on
                our website once approved.
              </p>
            </div>
            <div className="pt-2">
              <Button
                type="button"
                onClick={() => handleClose(false)}
                className="w-full sm:w-auto px-6 font-semibold"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Patient Name */}
            <div className="space-y-1.5">
              <Label htmlFor="feedback-patient-name" className="text-xs font-semibold text-foreground">
                Your Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="feedback-patient-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                disabled={isSubmitting}
                className="h-10 text-sm"
              />
            </div>

            {/* Treatment / Service */}
            <div className="space-y-1.5">
              <Label htmlFor="feedback-treatment" className="text-xs font-semibold text-foreground">
                Treatment / Service Received <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
              </Label>
              <div className="space-y-2">
                <Input
                  id="feedback-treatment"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  placeholder="e.g. Teeth Cleaning, Braces, Root Canal..."
                  disabled={isSubmitting}
                  className="h-10 text-sm"
                />
                {/* Quick suggestions pills */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {COMMON_TREATMENTS.slice(0, 4).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTreatment(t)}
                      className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                        treatment === t
                          ? "bg-primary text-primary-foreground border-primary font-semibold"
                          : "bg-secondary text-muted-foreground hover:text-foreground border-border/70"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-foreground">
                  Your Rating <span className="text-rose-500">*</span>
                </Label>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {(hoverRating ?? rating)} / 5 Stars
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 p-2 rounded-xl bg-secondary/50 border border-border/70 w-fit"
                role="radiogroup"
                aria-label="Star Rating"
              >
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isActive = (hoverRating ?? rating) >= starValue;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(null)}
                      aria-label={`${starValue} star`}
                      className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Star
                        className={`size-6 transition-colors ${
                          isActive
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30 hover:text-muted-foreground/60"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Message */}
            <div className="space-y-1.5">
              <Label htmlFor="feedback-message" className="text-xs font-semibold text-foreground">
                Your Feedback / Review <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your experience with our doctors, clinic cleanliness, treatment comfort, or results..."
                rows={4}
                required
                disabled={isSubmitting}
                className="text-sm resize-none"
              />
            </div>

            {/* Moderation note matching user requirement */}
            <div className="p-3 rounded-xl border border-sky-200/80 bg-sky-50/70 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200 text-xs flex items-start gap-2.5">
              <ShieldCheck className="size-4 shrink-0 text-sky-600 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold">Admin Moderation:</span> To protect genuine patient
                reviews, all submitted feedback is verified and approved by the clinic administration
                before being displayed on the website.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-border flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => handleClose(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-xs font-semibold bg-[#008953] text-white hover:bg-[#007345] shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin mr-1.5" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
