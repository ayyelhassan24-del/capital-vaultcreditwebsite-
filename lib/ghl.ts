export async function submitToGHL(
  data: {
    name: string;
    email: string;
    phone: string;
    revenue?: string;
    message?: string;
    source?: string;
    campaign?: string;
  },
  turnstileToken: string
) {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, turnstileToken }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error ?? `Submission failed: ${response.statusText}`);
  }

  return response.json();
}
