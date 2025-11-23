import { Router } from "express";

const r = Router();

r.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "blackroad-os-demo" });
});

export default r;
