import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Lead from "../models/Lead.js";
import WorkItem from "../models/WorkItem.js";
import CrewMember from "../models/CrewMember.js";
import Testimonial from "../models/Testimonial.js";

const router = Router();

router.get("/stats", requireAuth, async (_req, res) => {
  const [totalLeads, newLeads, workItems, crewMembers, testimonials, recentLeads] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      WorkItem.countDocuments(),
      CrewMember.countDocuments(),
      Testimonial.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5),
    ]);

  res.json({
    totalLeads,
    newLeads,
    workItems,
    crewMembers,
    testimonials,
    recentLeads,
  });
});

export default router;
