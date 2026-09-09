import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import WorkItem from "../models/WorkItem.js";
import CrewMember from "../models/CrewMember.js";
import PricingPlan from "../models/PricingPlan.js";
import Testimonial from "../models/Testimonial.js";
import FaqItem from "../models/FaqItem.js";

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'><rect width='640' height='480' fill='#15191d'/><circle cx='320' cy='240' r='60' fill='#f36a2d' opacity='0.9'/></svg>`
  );

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "hello@crewframeagency.com").toLowerCase().trim();
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`[seed] admin already exists: ${email}`);
    return;
  }
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "CrewFrame#2026";
  const passwordHash = await bcrypt.hash(initialPassword, 12);
  await Admin.create({ email, passwordHash, name: "CrewFrame Admin" });
  console.log(`[seed] created admin ${email} — log in and change this password immediately.`);
}

async function seedIfEmpty() {
  if ((await WorkItem.countDocuments()) === 0) {
    await WorkItem.insertMany([
      {
        cat: ["reel"],
        format: "reel",
        img: PLACEHOLDER_IMG,
        title: "400-lb safe, third floor",
        marker: "Crew Cam",
        dur: "0:41",
        loc: "Dallas, TX",
        views: "182K views",
        job: "Job #1482",
        desc: "Four movers, one stair-run, and a safe that most companies refuse to touch.",
        result: "Highest-saving clip of the quarter: 182K views and 41 quote requests.",
        order: 1,
      },
      {
        cat: ["long"],
        format: "long",
        img: PLACEHOLDER_IMG,
        title: "How we moved a four-bedroom in one day",
        marker: "Job #1482",
        dur: "14:22",
        loc: "Dallas, TX",
        views: "24K views",
        job: "Job #1482",
        desc: "A full-day move cut into a fourteen-minute walkthrough.",
        result: "Twelve booked moves traced directly to it.",
        order: 2,
      },
    ]);
    console.log("[seed] work items seeded");
  }

  if ((await CrewMember.countDocuments()) === 0) {
    await CrewMember.insertMany([
      {
        name: "Marcus Hale",
        role: "Field Director",
        tag: "Field",
        img: PLACEHOLDER_IMG,
        social: ["linkedin", "instagram"],
        bio: "Nine years shooting documentary before he ever filmed a jobsite.",
        focusLabel: "On site",
        skills: [
          { label: "Run-and-gun coverage", pct: 97 },
          { label: "Crew rapport", pct: 95 },
        ],
        order: 1,
      },
    ]);
    console.log("[seed] crew seeded");
  }

  if ((await PricingPlan.countDocuments()) === 0) {
    await PricingPlan.insertMany([
      {
        name: "Starter Reel",
        monthly: 799,
        yearly: 639,
        desc: "For single-crew businesses posting content for the first time.",
        features: [
          { label: "Content strategy & shot list", included: true },
          { label: "8 edited clips / month", included: true },
          { label: "Paid social boosting", included: false },
        ],
        cta: "Get started",
        order: 1,
      },
      {
        name: "Growth Crew",
        monthly: 1899,
        yearly: 1519,
        desc: "For crews ready to make content a steady lead source.",
        featured: true,
        popularLabel: "Most Booked",
        features: [
          { label: "Everything in Starter Reel", included: true },
          { label: "20 edited clips / month", included: true },
        ],
        cta: "Get started",
        order: 2,
      },
      {
        name: "Multi-Crew",
        monthly: null,
        yearly: null,
        desc: "For multi-location or franchise home service companies.",
        features: [{ label: "Everything in Growth Crew", included: true }],
        cta: "Talk to us",
        order: 3,
      },
    ]);
    console.log("[seed] pricing plans seeded");
  }

  if ((await Testimonial.countDocuments()) === 0) {
    await Testimonial.insertMany([
      {
        quote:
          "We stopped explaining what makes us different and started showing it. Booked jobs were up before we changed anything else.",
        name: "Ray Delgado",
        company: "Owner · Delgado Moving Co.",
        avatar: PLACEHOLDER_IMG,
        stars: 5,
        order: 1,
      },
    ]);
    console.log("[seed] testimonials seeded");
  }

  if ((await FaqItem.countDocuments()) === 0) {
    await FaqItem.insertMany([
      {
        q: "Nobody on our crew wants to be on camera. Does that matter?",
        a: "Not at all. Most of our strongest work is hands, tools, and finished results, no interviews at all.",
        order: 1,
      },
      {
        q: "How much footage do we actually need to send?",
        a: "Less than most crews expect. A few minutes of phone footage per job is usually enough.",
        order: 2,
      },
    ]);
    console.log("[seed] faq seeded");
  }
}

async function main() {
  await connectDB();
  await seedAdmin();
  await seedIfEmpty();
  console.log("[seed] done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
