import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { crudRouter } from "./utils/crudRouter.js";

import WorkItem from "./models/WorkItem.js";
import CrewMember from "./models/CrewMember.js";
import PricingPlan from "./models/PricingPlan.js";
import Testimonial from "./models/Testimonial.js";
import FaqItem from "./models/FaqItem.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow same-origin/non-browser requests (no Origin header) and any
      // configured origin
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "2mb" }));

// Basic abuse protection on the public contact-form endpoint.
const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "crewframe-backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsLimiter, leadsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/work", crudRouter(WorkItem));
app.use("/api/crew", crudRouter(CrewMember));
app.use("/api/pricing", crudRouter(PricingPlan));
app.use("/api/testimonials", crudRouter(Testimonial));
app.use("/api/faq", crudRouter(FaqItem));

app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

export default app;
