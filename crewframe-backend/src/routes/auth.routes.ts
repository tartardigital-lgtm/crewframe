import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  const token = jwt.sign({ id: admin._id.toString(), email: admin.email }, secret, {
    expiresIn,
  } as jwt.SignOptions);

  res.json({
    token,
    admin: { _id: admin._id, email: admin.email, name: admin.name },
  });
});

router.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const admin = await Admin.findById(req.admin!.id).select("-passwordHash");
  if (!admin) return res.status(404).json({ error: "Admin not found." });
  res.json(admin);
});

router.post("/change-password", requireAuth, async (req: AuthedRequest, res) => {
  const { currentPassword, newPassword } = req.body as {
    currentPassword?: string;
    newPassword?: string;
  };
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res
      .status(400)
      .json({ error: "currentPassword and a newPassword (8+ chars) are required." });
  }

  const admin = await Admin.findById(req.admin!.id);
  if (!admin) return res.status(404).json({ error: "Admin not found." });

  const ok = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: "Current password is incorrect." });

  admin.passwordHash = await bcrypt.hash(newPassword, 12);
  await admin.save();
  res.json({ ok: true });
});

export default router;
