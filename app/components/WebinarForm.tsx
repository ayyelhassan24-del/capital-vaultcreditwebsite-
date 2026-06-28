"use client";

import { useState } from "react";

const ZOOM_URL = "https://us06web.zoom.us/meeting/register/5XAgJ7alT-WrQp-N9LQ1GQ";

export default function WebinarForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      window.location.href = "/register/thank-you";
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="card-vault-glow p-8" id="register">
      <h3 className="text-2xl font-black text-vault-cream mb-1">
        Reserve Your Free Seat
      </h3>
      <p className="text-sm text-vault-muted mb-6">
        No replay guaranteed. Live attendance only.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-vault-muted mb-2">
            First Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input-vault"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-vault-muted mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input-vault"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-vault-muted mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="input-vault"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        {status === "error" && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gold-gradient w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Saving your seat..." : "Reserve My Free Seat →"}
        </button>

        <p className="text-xs text-vault-muted text-center">
          By registering you agree to receive event reminders by email and SMS.
        </p>
      </form>
    </div>
  );
}
