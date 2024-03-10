import { Router } from "express";
import Results from "../models/ResultsModel.js";
import { isAuthenticated } from "../helpers/auth.helpers.js";

const router = Router();

router.post('/updatePoints', isAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const pointsToAdd = 2; // The points to add when a lesson is completed
    const lessonId = req.body.lessonId;
  
    try {
      let results = await Results.findOne({ userId });
  
      if (results) {
        if (results.lessonsCompleted.includes(lessonId)) {
          // Lesson already completed, don't add points
          return res.status(409).json({ message: "Lesson already completed. No points awarded." });
        }
        // If it exists and it is for the first time, update the totalPoints
        results.totalPoints += pointsToAdd;
        results.lessonsCompleted.push(lessonId);
      } else {
        // If not, create a new Results document with initial points
        results = new Results({
          userId,
          lessonsCompleted: [lessonId],
          totalPoints: pointsToAdd,
        });
      }
  
      await results.save();
      res.json({ points: results.totalPoints, message: "Points added successfully!!" });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  
export default router;
