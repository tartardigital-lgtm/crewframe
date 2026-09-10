import { Router } from "express";
import Lead from "../models/Lead.js";
import { requireAuth } from "../middleware/auth.js";
import { Resend } from "resend";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/** Public — the site's contact form posts here. No auth required. */
router.post("/", async (req, res) => {
  const { firstName, lastName, email, trade, message } = req.body as Record<string, string>;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "firstName, lastName and email are required." });
  }

  const lead = await Lead.create({ firstName, lastName, email, trade, message });

  try {
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      await resend.emails.send({
        from: "CrewFrame Leads <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: `New lead: ${firstName} ${lastName}`,
        html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Trade:</strong> ${trade || "-"}</p>
               <p><strong>Message:</strong> ${message || "-"}</p>`,
      });
    }
  } catch (err) {
    console.error("[email] failed to send lead notification:", err);
  }

  res.status(201).json({ ok: true, id: lead._id });
});

/** Admin-only from here down. */
router.get("/", requireAuth, async (req, res) => {
  const { status } = req.query as { status?: string };
  const filter = status && status !== "all" ? { status } : {};
  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json(leads);
});

router.patch("/:id", requireAuth, async (req, res) => {
  const { status } = req.body as { status?: string };
  const allowed = ["new", "contacted", "won", "archived"];
  if (!status || !allowed.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${allowed.join(", ")}` });
  }
  const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!lead) return res.status(404).json({ error: "Not found." });
  res.json(lead);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ error: "Not found." });
  res.json({ ok: true });
});

export default router;