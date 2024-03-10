import { Router } from "express";

const router = Router();

router.get("/", function (req, res, next) {
  res.status(200).json({ message: "okay" });
});

export default router;
