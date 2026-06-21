"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { submitToGHL } from "@/lib/ghl";

interface FormData {
  name: string;
  email: string;
  phone: string;
  revenue: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const revenueRanges = [
  "$50K–$100K",
  "$100K–$250K",
  "$250K–$500K",
  "$500K–$1M",
  "$1M+",
];

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    revenue: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const turnstileToken = useRef<string | null>(null);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.revenue) newErrors.revenue = "Revenue range is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!turnstileToken.current) {
      setErrors((prev) => ({ ...prev, turnstile: "Please complete the verification." }));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await submitToGHL(formData, turnstileToken.current);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", revenue: "", message: "" });
      turnstileToken.current = null;
      turnstileRef.current?.reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitStatus("error");
      turnstileToken.current = null;
      turnstileRef.current?.reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <section id="lead-form" className="section-padding bg-vault-gold/5 border-y border-hairline">
        <div className="container-vault">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20 items-start">
            <div className="scroll-reveal">
              <p className="kicker text-vault-gold mb-4">LET'S GO</p>
              <h2 className="heading-md text-vault-cream mb-8">
                Ready to Fund?
              </h2>
              <div className="space-y-6">
                {[
                  "No equity loss",
                  "5–23 day close",
                  "500+ lenders competing for your deal",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="text-vault-gold font-bold mt-1">✓</span>
                    <span className="text-vault-muted">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-vault-black border-2 border-vault-gold rounded-2xl p-8 md:p-12 text-center">
                <div className="text-4xl md:text-5xl mb-4">✓</div>
                <h3 className="heading-md text-vault-cream mb-3">
                  Thanks!
                </h3>
                <p className="text-vault-muted mb-6">
                  Your application has been submitted. We'll review and reach out
                  within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="btn-gold text-sm"
                >
                  Submit Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="section-padding bg-vault-gold/5 border-y border-hairline">
      <div className="container-vault">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 items-start">
          <div className="scroll-reveal">
            <p className="kicker text-vault-gold mb-4">LET'S GO</p>
            <h2 className="heading-md text-vault-cream mb-8">Ready to Fund?</h2>
            <div className="space-y-6">
              {[
                "No equity loss",
                "5–23 day close",
                "500+ lenders competing for your deal",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="text-vault-gold font-bold mt-1">✓</span>
                  <span className="text-vault-muted">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 scroll-reveal delay-1">
            <form
              onSubmit={handleSubmit}
              className="bg-vault-black border border-hairline rounded-2xl p-8 md:p-10 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-vault-cream mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-vault-cream mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-vault-cream mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-vault-cream mb-2">
                  Annual Revenue *
                </label>
                <select
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream focus:outline-none focus:border-vault-gold transition-colors"
                >
                  <option value="">Select a range</option>
                  {revenueRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {errors.revenue && (
                  <p className="text-red-400 text-sm mt-1">{errors.revenue}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-vault-cream mb-2">
                  What's Your Need? *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Equipment financing, working capital, expansion, etc."
                  rows={4}
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                onSuccess={(token) => {
                  turnstileToken.current = token;
                  setErrors((prev) => ({ ...prev, turnstile: "" }));
                }}
                onExpire={() => { turnstileToken.current = null; }}
                onError={() => { turnstileToken.current = null; }}
                options={{ theme: "dark" }}
              />
              {errors.turnstile && (
                <p className="text-red-400 text-sm">{errors.turnstile}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Get Started"}
              </button>

              {submitStatus === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Submission failed. Please try again.
                </p>
              )}

              <p className="text-xs text-vault-muted text-center">
                We'll reach out within 24 hours to discuss your options.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
