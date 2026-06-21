"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { submitToGHL } from "@/lib/ghl";

export default function VideoUnlockHero() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const turnstileToken = useRef<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim()) e.lastName = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Valid email required";
    if (!formData.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await submitToGHL(
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          source: "video-unlock",
        },
        turnstileToken.current
      );
      setUnlocked(true);
    } catch {
      setErrors((prev) => ({ ...prev, form: "Submission failed. Please try again." }));
      turnstileToken.current = null;
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const vslUrl = process.env.NEXT_PUBLIC_VSL_URL;

  return (
    <section className="bg-vault-black section-padding">
      <div className="container-vault">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 scroll-reveal">
            <h1 className="heading-lg text-vault-cream">
              How I Went From a{" "}
              <span className="text-vault-gold">510 Credit Score</span> to
              Starting My Dream Business in Just{" "}
              <span className="text-vault-gold">62 Days</span>
            </h1>
            <p className="text-vault-muted text-lg leading-relaxed">
              The 6-Month Credit Transformation System That&apos;s Helped 247+
              Business Owners Go From Rejected to Funded
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-vault-muted text-sm">
                <span className="text-vault-gold">🔒</span>
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-vault-muted text-sm">
                <span className="text-vault-gold">✓</span>
                <span>100% Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-vault-muted text-sm">
                <span className="text-vault-gold">★</span>
                <span>247+ Success Stories</span>
              </div>
            </div>
          </div>

          <div className="scroll-reveal delay-2">
            {unlocked ? (
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-vault-gold/30">
                {vslUrl ? (
                  <iframe
                    src={vslUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; fullscreen"
                  />
                ) : (
                  <div className="w-full h-full bg-vault-black flex items-center justify-center text-vault-muted">
                    Video loading...
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-vault-black border border-vault-gold/30 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="heading-md text-vault-cream">
                    🔓 Unlock The Transformation Video
                  </h2>
                  <p className="text-vault-muted text-sm leading-relaxed">
                    Enter your details to watch how I went from 510 to launching
                    my dream business in 62 days
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name *"
                        className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name *"
                        className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className="w-full bg-vault-black border border-hairline rounded-lg px-4 py-3 text-vault-cream placeholder-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                    onSuccess={(token) => {
                      turnstileToken.current = token;
                      setErrors((prev) => ({ ...prev, turnstile: "" }));
                    }}
                    onExpire={() => {
                      turnstileToken.current = null;
                    }}
                    onError={() => {
                      turnstileToken.current = null;
                    }}
                    options={{ theme: "dark" }}
                  />
                  {errors.turnstile && (
                    <p className="text-red-400 text-xs">{errors.turnstile}</p>
                  )}
                  {errors.form && (
                    <p className="text-red-400 text-sm text-center">{errors.form}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                  >
                    {isSubmitting ? "Unlocking..." : "🎬 Unlock Video Now"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
