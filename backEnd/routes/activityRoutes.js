// routes/activityRoutes.js
import express from "express";
import Activity from "../models/Activity.js";

const router = express.Router();

// Add new activity
router.post("/:childId/activities", async (req, res) => {
  const { childId } = req.params;
  const { activity, authorType } = req.body;

  if (!activity || !authorType)
    return res
      .status(400)
      .json({ message: "Activity and authorType required" });

  try {
    const newActivity = await Activity.create({
      activity,
      authorType,
      childId,
    });
    res.status(201).json(newActivity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
