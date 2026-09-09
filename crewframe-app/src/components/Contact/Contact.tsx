import { useState } from "react";
import { tradeOptions } from "../../data/content";
import { useReveal } from "../../hooks/useReveal";
import { submitLead } from "../../lib/api";
import "./Contact.css";

type SubmitState = "idle" | "sending" | "done" | "error";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  trade: tradeOptions[0],
  message: "",
};

export default function Contact() {
  const [state, setState] = useState<SubmitState>("idle");
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState("");
  const left = useReveal<HTMLDivElement>("right");
  const right = useReveal<HTMLDivElement>("left");

  const handleChange = (field: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setErrorMsg("");
    try {
      await submitLead(form);
      setState("done");
      setForm(initialForm);
      setTimeout(() => setState("idle"), 4200);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div ref={left.ref} className={left.className}>
          <div className="ctc-tag">
            <span className="ctc-dot" />
            Get in Touch
          </div>
          <h2 className="ctc-title">Let's frame your next job</h2>
          <p className="ctc-desc">
            Tell us about your crew and your busiest season. We'll send back a short content plan
            within two business days, no cost, no obligation.
          </p>

          <div className="ctc-block">
            <div className="ctc-lbl">Email</div>
            <div className="ctc-val">hello@crewframeagency.com</div>
          </div>
          <div className="ctc-block">
            <div className="ctc-lbl">Phone</div>
            <div className="ctc-val">(214) 555-0148</div>
          </div>
        </div>

        <div ref={right.ref} className={right.className}>
          <form className="ctc-form flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="ctc-field">
                <label className="ctc-form-label">First name</label>
                <input
                  type="text"
                  className="ctc-input"
                  placeholder="Dana"
                  required
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                />
              </div>
              <div className="ctc-field">
                <label className="ctc-form-label">Last name</label>
                <input
                  type="text"
                  className="ctc-input"
                  placeholder="Marsh"
                  required
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="ctc-field">
                <label className="ctc-form-label">Email</label>
                <input
                  type="email"
                  className="ctc-input"
                  placeholder="dana@yourcompany.com"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="ctc-field">
                <label className="ctc-form-label">Trade</label>
                <select className="ctc-select" value={form.trade} onChange={handleChange("trade")}>
                  {tradeOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ctc-field ctc-field-full">
              <label className="ctc-form-label">Tell us about your crew</label>
              <textarea
                className="ctc-textarea"
                placeholder="How many crews, your service area, and what content you've tried so far..."
                value={form.message}
                onChange={handleChange("message")}
              />
            </div>

            {state === "error" && <div className="ctc-error">{errorMsg}</div>}

            <button type="submit" className={`btn-p ctc-submit ${state}`} disabled={state === "sending"}>
              {state === "idle" && "Send message"}
              {state === "sending" && "Sending..."}
              {state === "done" && "Got it, we'll reply within one business day"}
              {state === "error" && "Try again"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
