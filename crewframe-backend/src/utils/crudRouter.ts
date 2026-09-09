import { Router } from "express";
import type { Model } from "mongoose";
import { requireAuth } from "../middleware/auth.js";

/**
 * Builds a standard REST CRUD router for a Mongoose model:
 *   GET    /            -> public list (sorted by `order` then createdAt)
 *   GET    /:id         -> public single item
 *   POST   /            -> admin-only create
 *   PUT    /:id         -> admin-only update
 *   DELETE /:id         -> admin-only delete
 *
 * The public list/read endpoints let the main CrewFrame site render content
 * that was authored in the admin panel; writes require an admin session.
 */
export function crudRouter(model: Model<any>) {
  const router = Router();

  router.get("/", async (_req, res) => {
    const items = await model.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  });

  router.get("/:id", async (req, res) => {
    const item = await model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found." });
    res.json(item);
  });

  router.post("/", requireAuth, async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json(item);
  });

  router.put("/:id", requireAuth, async (req, res) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: "Not found." });
    res.json(item);
  });

  router.delete("/:id", requireAuth, async (req, res) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found." });
    res.json({ ok: true });
  });

  return router;
}
