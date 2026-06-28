"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

const STEP_LABELS = ["Business", "Revenue", "Owner", "Funding"];

type IntakeData = {
  businessName: string;
  ein: string;
  entityType: string;
  industry: string;
  businessState: string;
  businessCity: string;
  yearsInBusiness: string;
  employees: string;
  monthlyRevenue: string;
  monthlyDeposits: string;
  bankName: string;
  bankAccounts: string;
  hasExistingDebt: string;
  existingDebtAmount: string;
  ownerName: string;
  dob: string;
  homeAddress: string;
  homeCity: string;
  homeState: string;
  homeZip: string;
  ssnLast4: string;
  creditScore: string;
  ownershipPct: string;
  fundingAmount: string;
  fundingPurpose: string;
  timeline: string;
  email: string;
  phone: string;
};

const INITIAL: IntakeData = {
  businessName: "", ein: "", entityType: "", industry: "",
  businessState: "", businessCity: "", yearsInBusiness: "", employees: "",
  monthlyRevenue: "", monthlyDeposits: "", bankName: "",
  bankAccounts: "", hasExistingDebt: "", existingDebtAmount: "",
  ownerName: "", dob: "", homeAddress: "", homeCity: "",
  homeState: "", homeZip: "", ssnLast4: "", creditScore: "", ownershipPct: "",
  fundingAmount: "", fundingPurpose: "", timeline: "", email: "", phone: "",
};

function validateStep(step: number, data: IntakeData): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 1) {
    if (!data.businessName.trim()) e.businessName = "Required";
    if (!data.ein.trim()) e.ein = "Required";
    if (!data.entityType) e.entityType = "Required";
    if (!data.industry.trim()) e.industry = "Required";
    if (!data.businessState) e.businessState = "Required";
    if (!data.businessCity.trim()) e.businessCity = "Required";
    if (!data.yearsInBusiness) e.yearsInBusiness = "Required";
  }
  if (step === 2) {
    if (!data.monthlyRevenue.trim()) e.monthlyRevenue = "Required";
    if (!data.bankName.trim()) e.bankName = "Required";
    if (!data.hasExistingDebt) e.hasExistingDebt = "Required";
    if (data.hasExistingDebt === "Yes" && !data.existingDebtAmount.trim()) e.existingDebtAmount = "Required";
  }
  if (step === 3) {
    if (!data.ownerName.trim()) e.ownerName = "Required";
    if (!data.dob) e.dob = "Required";
    if (!data.homeAddress.trim()) e.homeAddress = "Required";
    if (!data.homeCity.trim()) e.homeCity = "Required";
    if (!data.homeState) e.homeState = "Required";
    if (!data.homeZip.trim()) e.homeZip = "Required";
    if (!data.ssnLast4 || data.ssnLast4.length !== 4) e.ssnLast4 = "Enter last 4 digits";
    if (!data.creditScore) e.creditScore = "Required";
  }
  if (step === 4) {
    if (!data.fundingAmount.trim()) e.fundingAmount = "Required";
    if (!data.fundingPurpose) e.fundingPurpose = "Required";
    if (!data.timeline) e.timeline = "Required";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Valid email required";
    if (!data.phone.trim()) e.phone = "Required";
  }
  return e;
}

export default function IntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IntakeData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const turnstileToken = useRef<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const advance = () => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep(4, data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!turnstileToken.current) {
      setErrors((prev) => ({ ...prev, turnstile: "Please complete the verification." }));
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: turnstileToken.current }),
      });
      if (!res.ok) throw new Error("Failed");
      router.push("/intake/thanks");
    } catch {
      setErrors((prev) => ({ ...prev, form: "Submission failed. Please try again." }));
      turnstileToken.current = null;
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between max-w-xs mx-auto">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                done
                  ? "bg-vault-gold text-vault-ink"
                  : active
                  ? "border-2 border-vault-gold text-vault-gold"
                  : "border border-vault-border text-vault-muted"
              }`}>
                {done ? "✓" : n}
              </div>
              <span className={`text-xs ${active ? "text-vault-gold" : "text-vault-muted"}`}>{label}</span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="card-vault space-y-5 p-6 md:p-8">

        {/* ── Step 1: Business Info ── */}
        {step === 1 && (
          <>
            <h2 className="heading-md text-vault-cream">Business Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Legal Business Name *</label>
                <input name="businessName" value={data.businessName} onChange={handleChange} className="input-vault" placeholder="Acme HVAC LLC" />
                {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">EIN *</label>
                <input name="ein" value={data.ein} onChange={handleChange} className="input-vault" placeholder="XX-XXXXXXX" />
                {errors.ein && <p className="text-red-400 text-xs mt-1">{errors.ein}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Entity Type *</label>
                <select name="entityType" value={data.entityType} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>LLC</option>
                  <option>S-Corp</option>
                  <option>C-Corp</option>
                  <option>Sole Prop</option>
                </select>
                {errors.entityType && <p className="text-red-400 text-xs mt-1">{errors.entityType}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Industry *</label>
                <input name="industry" value={data.industry} onChange={handleChange} className="input-vault" placeholder="HVAC, Construction, Trucking..." />
                {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Business State *</label>
                <select name="businessState" value={data.businessState} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  {US_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.businessState && <p className="text-red-400 text-xs mt-1">{errors.businessState}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Business City *</label>
                <input name="businessCity" value={data.businessCity} onChange={handleChange} className="input-vault" placeholder="Los Angeles" />
                {errors.businessCity && <p className="text-red-400 text-xs mt-1">{errors.businessCity}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Years in Business *</label>
                <select name="yearsInBusiness" value={data.yearsInBusiness} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>Less than 1 year</option>
                  <option>1–2 years</option>
                  <option>2–3 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
                {errors.yearsInBusiness && <p className="text-red-400 text-xs mt-1">{errors.yearsInBusiness}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Employees</label>
                <select name="employees" value={data.employees} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>1–5</option>
                  <option>6–20</option>
                  <option>21–50</option>
                  <option>50+</option>
                </select>
              </div>
            </div>
            <button type="button" onClick={advance} className="btn-gold w-full py-4 text-lg">
              Continue →
            </button>
          </>
        )}

        {/* ── Step 2: Revenue & Banking ── */}
        {step === 2 && (
          <>
            <h2 className="heading-md text-vault-cream">Revenue & Banking</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Average Monthly Revenue *</label>
                <input name="monthlyRevenue" value={data.monthlyRevenue} onChange={handleChange} className="input-vault" placeholder="$85,000" />
                {errors.monthlyRevenue && <p className="text-red-400 text-xs mt-1">{errors.monthlyRevenue}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Avg Monthly Bank Deposits</label>
                <input name="monthlyDeposits" value={data.monthlyDeposits} onChange={handleChange} className="input-vault" placeholder="$75,000" />
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Primary Bank *</label>
                <input name="bankName" value={data.bankName} onChange={handleChange} className="input-vault" placeholder="Wells Fargo, Chase..." />
                {errors.bankName && <p className="text-red-400 text-xs mt-1">{errors.bankName}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Number of Bank Accounts</label>
                <select name="bankAccounts" value={data.bankAccounts} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Existing Business Debt? *</label>
                <select name="hasExistingDebt" value={data.hasExistingDebt} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errors.hasExistingDebt && <p className="text-red-400 text-xs mt-1">{errors.hasExistingDebt}</p>}
              </div>
              {data.hasExistingDebt === "Yes" && (
                <div>
                  <label className="text-xs text-vault-muted mb-1 block">Total Existing Debt Amount *</label>
                  <input name="existingDebtAmount" value={data.existingDebtAmount} onChange={handleChange} className="input-vault" placeholder="$120,000" />
                  {errors.existingDebtAmount && <p className="text-red-400 text-xs mt-1">{errors.existingDebtAmount}</p>}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-outline flex-1 py-4">← Back</button>
              <button type="button" onClick={advance} className="btn-gold flex-1 py-4 text-lg">Continue →</button>
            </div>
          </>
        )}

        {/* ── Step 3: Owner Info ── */}
        {step === 3 && (
          <>
            <h2 className="heading-md text-vault-cream">Owner Information</h2>
            <p className="text-sm text-vault-muted">Used to match lender requirements. Transmitted securely — never stored locally.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Owner Full Name *</label>
                <input name="ownerName" value={data.ownerName} onChange={handleChange} className="input-vault" placeholder="John Smith" />
                {errors.ownerName && <p className="text-red-400 text-xs mt-1">{errors.ownerName}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Date of Birth *</label>
                <input name="dob" type="date" value={data.dob} onChange={handleChange} className="input-vault" />
                {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-vault-muted mb-1 block">Home Street Address *</label>
                <input name="homeAddress" value={data.homeAddress} onChange={handleChange} className="input-vault" placeholder="123 Main St" />
                {errors.homeAddress && <p className="text-red-400 text-xs mt-1">{errors.homeAddress}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Home City *</label>
                <input name="homeCity" value={data.homeCity} onChange={handleChange} className="input-vault" placeholder="Los Angeles" />
                {errors.homeCity && <p className="text-red-400 text-xs mt-1">{errors.homeCity}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Home State *</label>
                <select name="homeState" value={data.homeState} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  {US_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.homeState && <p className="text-red-400 text-xs mt-1">{errors.homeState}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">ZIP Code *</label>
                <input name="homeZip" value={data.homeZip} onChange={handleChange} className="input-vault" placeholder="90210" maxLength={5} />
                {errors.homeZip && <p className="text-red-400 text-xs mt-1">{errors.homeZip}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">SSN — Last 4 Digits Only *</label>
                <input
                  name="ssnLast4"
                  type="password"
                  inputMode="numeric"
                  value={data.ssnLast4}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setData((prev) => ({ ...prev, ssnLast4: val }));
                    if (errors.ssnLast4) setErrors((prev) => ({ ...prev, ssnLast4: "" }));
                  }}
                  className="input-vault"
                  placeholder="••••"
                  maxLength={4}
                  autoComplete="off"
                />
                {errors.ssnLast4 && <p className="text-red-400 text-xs mt-1">{errors.ssnLast4}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Personal Credit Score *</label>
                <select name="creditScore" value={data.creditScore} onChange={handleChange} className="input-vault">
                  <option value="">Select range...</option>
                  <option>Below 580</option>
                  <option>580–649</option>
                  <option>650–699</option>
                  <option>700–749</option>
                  <option>750+</option>
                </select>
                {errors.creditScore && <p className="text-red-400 text-xs mt-1">{errors.creditScore}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Ownership %</label>
                <input name="ownershipPct" value={data.ownershipPct} onChange={handleChange} className="input-vault" placeholder="100" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-outline flex-1 py-4">← Back</button>
              <button type="button" onClick={advance} className="btn-gold flex-1 py-4 text-lg">Continue →</button>
            </div>
          </>
        )}

        {/* ── Step 4: Funding Request ── */}
        {step === 4 && (
          <>
            <h2 className="heading-md text-vault-cream">Funding Request</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Amount Requested *</label>
                <input name="fundingAmount" value={data.fundingAmount} onChange={handleChange} className="input-vault" placeholder="$150,000" />
                {errors.fundingAmount && <p className="text-red-400 text-xs mt-1">{errors.fundingAmount}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Purpose *</label>
                <select name="fundingPurpose" value={data.fundingPurpose} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>Working Capital</option>
                  <option>Equipment Purchase</option>
                  <option>Real Estate</option>
                  <option>Business Expansion</option>
                  <option>Debt Consolidation</option>
                  <option>Other</option>
                </select>
                {errors.fundingPurpose && <p className="text-red-400 text-xs mt-1">{errors.fundingPurpose}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Timeline *</label>
                <select name="timeline" value={data.timeline} onChange={handleChange} className="input-vault">
                  <option value="">Select...</option>
                  <option>ASAP (within 7 days)</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                </select>
                {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>}
              </div>
              <div>
                <label className="text-xs text-vault-muted mb-1 block">Email Address *</label>
                <input name="email" type="email" value={data.email} onChange={handleChange} className="input-vault" placeholder="you@company.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-vault-muted mb-1 block">Mobile Phone *</label>
                <input name="phone" type="tel" value={data.phone} onChange={handleChange} className="input-vault" placeholder="(555) 000-0000" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
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
            {errors.turnstile && <p className="text-red-400 text-xs">{errors.turnstile}</p>}
            {errors.form && <p className="text-red-400 text-sm text-center">{errors.form}</p>}
            <div className="flex gap-3">
              <button type="button" onClick={back} className="btn-outline flex-1 py-4">← Back</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
            <p className="text-xs text-vault-muted text-center">
              No credit pull. Your information is transmitted securely to Capital Vault only.
            </p>
          </>
        )}

      </form>
    </div>
  );
}
