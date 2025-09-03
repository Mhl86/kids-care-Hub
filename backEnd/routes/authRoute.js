import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route

// Role based
router.get("/parents", verifyToken, authorizeRole("parent"), (req, res) => {
  res.json({ message: "Parent Dashboard" });
});

router.get(
  "/caregiver",
  verifyToken,
  authorizeRole("caregiver"),
  (req, res) => {
    res.json({ message: "Caregiver Dashboard" });
  }
);

export default router;
