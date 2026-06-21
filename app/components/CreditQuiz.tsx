"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { submitToGHL } from "@/lib/ghl";

const steps = [
  {
    question: "What's your current credit score range?",
    subtitle: "This helps us create your personalized transformation plan",
    options: [
      { label: "300 – 549", sub: "Poor – Needs immediate attention" },
      { label: "550 – 619", sub: "Fair – Significant improvement needed" },
      { label: "620 – 679", sub: "Good – Room for optimization" },
      { label: "680+", sub: "Very Good – Ready for premium funding" },
      { label: "I don't know", sub: "We'll help you find out" },
    ],
  },
  {
    question: "How many negative items are on your credit report?",
    subtitle: "Collections, late payments, charge-offs, etc.",
    options: [
      { label: "1–3 items", sub: "Quick wins possible" },
      { label: "4–9 items", sub: "Moderate cleanup needed" },
      { label: "10+ items", sub: "Complex situation" },
      { label: "Bankruptcy/Judgments", sub: "Special strategies available" },
      { label: "Not sure", sub: "We'll analyze your report" },
    ],
  },
  {
    question: "What's your primary goal?",
    subtitle: "",
    options: [
      { label: "Business Funding", sub: "" },
      { label: "Buy a Home", sub: "" },
      { label: "Lower Interest Rates", sub: "" },
      { label: "Auto Loan", sub: "" },
      { label: "Overall Credit Health", sub: "" },
    ],
  },
  {
    question: "How quickly do you need results?",
    subtitle: "",
    options: [
      { label: "ASAP (0–30 days)", sub: "" },
      { label: "1–3 months", sub: "" },
      { label: "3–6 months", sub: "" },
      { label: "6+ months", sub: "" },
    ],
  },
];

export default function CreditQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const turnstileToken = useRef<string | null>(null);

  const handleOption = (label: string) => {
    const next = [...answers, label];
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowForm(true);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim()) e.lastName = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
    if (!formData.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
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
      await submitToGHL({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        source: "credit-quiz",
        message: answers.join(" | "),
      }, turnstileToken.current);
      setSubmitted(true);
    } catch {
      setErrors((prev) => ({ ...prev, form: "Submission failed. Please try again." }));
      turnstileToken.current = null;
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="section-padding bg-vault-gold/5 border-y border-hairline" id="quiz">
        <div className="container-vault text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="heading-md text-vault-cream mb-4">Your Personalized Credit Roadmap Is On Its Way</h2>
          <p className="text-vault-muted">We&apos;ll review your answers and reach out within 24 hours with your custom transformation plan.</p>
          <a href="#pricing" className="btn-gold mt-8 inline-block">View Programs →</a>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-vault-gold/5 border-y border-hairline" id="quiz">
      <div className="container-vault max-w-2xl mx-auto">
        <p className="kicker text-center mb-4">FREE CREDIT ASSESSMENT</p>
        <h2 className="heading-md text-vault-cream text-center mb-2">Get Your Personalized Credit Roadmap</h2>
        <p className="text-vault-muted text-center mb-10">Delivered within 24 hours</p>

        {!showForm ? (
          <div>
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-full"
                  style={{ backgroundColor: i <= step ? "#d4af37" : "rgba(212,175,55,0.2)" }}
                />
              ))}
            </div>

            <div className="bg-vault-black border border-hairline rounded-2xl p-8">
              <h3 className="text-vault-cream font-semibold text-lg mb-2">{steps[step].question}</h3>
              {steps[step].subtitle && <p className="text-vault-muted text-sm mb-6">{steps[step].subtitle}</p>}
              <div className="space-y-3">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleOption(opt.label)}
                    className="w-full text-left border border-hairline rounded-xl px-5 py-4 hover:border-vault-gold hover:bg-vault-gold/5 transition-all"
                  >
                    <span className="text-vault-cream font-medium">{opt.label}</span>
                    {opt.sub && <span className="block text-vault-muted text-sm mt-0.5">{opt.sub}</span>}
                  </button>
                ))}
              </div>
            </div>

            {step > 0 && (
              <button
                onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)); }}
                className="mt-4 text-vault-muted text-sm hover:text-vault-gold transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-vault-black border border-hairline rounded-2xl p-8 space-y-5">
            <h3 className="text-vault-cream font-semibold text-lg mb-2">Almost there — where should we send your roadmap?</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="text" placeholder="First Name *" value={formData.firstName}
                  onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors" />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input type="text" placeholder="Last Name *" value={formData.lastName}
                  onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                  className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors" />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input type="email" placeholder="Email Address *" value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <input type="tel" placeholder="Phone Number *" value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors" />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
              onSuccess={(token) => { turnstileToken.current = token; setErrors((p) => ({ ...p, turnstile: "" })); }}
              onExpire={() => { turnstileToken.current = null; }}
              onError={() => { turnstileToken.current = null; }}
              options={{ theme: "dark" }}
            />
            {errors.turnstile && <p className="text-red-400 text-sm">{errors.turnstile}</p>}
            {errors.form && <p className="text-red-400 text-sm text-center">{errors.form}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Sending..." : "Get My Credit Roadmap →"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setStep(steps.length - 1); }}
              className="w-full text-vault-muted text-sm hover:text-vault-gold transition-colors">
              ← Back
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
