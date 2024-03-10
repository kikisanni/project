import { Router } from "express";
import Results from "../models/ResultsModel.js";
import { isAuthenticated } from "../helpers/auth.helpers.js";

const router = Router();

router.post("/results", isAuthenticated, async (req, res) => {
  try {
    const newResult = new Results({
      userId: req.user._id,
      profilePicture: req.user.profilePicture,
      username: req.user.username,
      completed: req.body.completed,
      categoryTotalPoints: req.body.categoryTotalPoints,
      totalXP: req.body.totalXP,
      totalPoints: req.body.totalPoints,
      hearts: req.body.hearts,
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT endpoint for updating results
router.put("/results/:userId", isAuthenticated, async (req, res) => {
  try {
    const updatedResult = await Results.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.json(updatedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to retrieve results for a specific user
router.get("/results/:userId", isAuthenticated, async (req, res) => {
  try {
    const results = await Results.findOne({ userId: req.params.userId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:userId", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the result exists based on userId
    const result = await Results.findOne({ userId });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Results not found for this user." });
    }

    // Delete the result based on userId
    await Results.deleteOne({ userId });

    res.json({ message: "Results removed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
