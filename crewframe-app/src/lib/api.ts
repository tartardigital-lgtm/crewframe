const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:4000/api";

export interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  trade?: string;
  message?: string;
}

/**
 * Posts a contact-form submission to the CrewFrame backend.
 * Throws with a readable message on failure so the form can show it.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore parse errors */
    }
    throw new Error(message);
  }
}
