"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { submitToGHL } from "@/lib/ghl";

const revenueRanges = [
  "$500K–$1M",
  "$1M–$2M",
  "$2M–$3M",
  "$3M+",
];

interface FunnelFormProps {
  source: string;
  campaign: string;
  redirectPath: string;
  ctaLabel?: string;
}

export default function FunnelForm({ source, campaign, redirectPath, ctaLabel = "See If I Qualify" }: FunnelFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", revenue: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const turnstileToken = useRef<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
    if (!formData.phone.trim()) e.phone = "Required";
    if (!formData.revenue) e.revenue = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!turnstileToken.current) {
      setErrors((prev) => ({ ...prev, turnstile: "Please complete the verification." }));
      return;
    }
    setIsSubmitting(true);
    try {
      await submitToGHL({ ...formData, source, campaign }, turnstileToken.current);
      // PostHog: tie this anonymous ad-click session to a named lead + tag the ad variant
      const ph = typeof window !== "undefined" ? (window as { posthog?: any }).posthog : undefined;
      if (ph) {
        const p = new URLSearchParams(window.location.search);
        ph.identify(formData.email, {
          name: formData.name,
          phone: formData.phone,
          revenue: formData.revenue,
        });
        ph.capture("lead_submitted", {
          source,
          campaign,
          variant: p.get("v"),
          revenue: formData.revenue,
          utm_source: p.get("utm_source"),
          utm_medium: p.get("utm_medium"),
          utm_campaign: p.get("utm_campaign"),
          utm_content: p.get("utm_content"),
          utm_term: p.get("utm_term"),
        });
      }
      router.push(redirectPath);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setErrors((prev) => ({ ...prev, form: msg.includes("Bot") ? "Verification failed — please refresh and try again." : "Submission failed. Please try again." }));
      turnstileToken.current = null;
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-vault-black border border-vault-gold\/40 rounded-2xl p-6 md:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="input-vault"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile Phone *"
            className="input-vault"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address *"
          className="input-vault"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <select
          name="revenue"
          value={formData.revenue}
          onChange={handleChange}
          className="input-vault"
        >
          <option value="">Annual Revenue *</option>
          {revenueRanges.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.revenue && <p className="text-red-400 text-xs mt-1">{errors.revenue}</p>}
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
      {errors.turnstile && <p className="text-red-400 text-sm font-medium py-2 px-3 bg-red-400/10 rounded-lg border border-red-400/30">{errors.turnstile}</p>}
      {errors.form && <p className="text-red-400 text-sm font-medium py-2 px-3 bg-red-400/10 rounded-lg border border-red-400/30 text-center">{errors.form}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
      >
        {isSubmitting ? "Submitting..." : ctaLabel}
      </button>

      <p className="text-xs text-vault-muted text-center">No credit pull. No fee until funded. Response within 24 hours.</p>
    </form>
  );
}
