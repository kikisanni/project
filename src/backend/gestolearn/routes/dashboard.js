import multer from 'multer';
import { Router } from "express";
import path from 'path';
import User from "../models/userModel.js";
import Results from "../models/ResultsModel.js";
import { isAuthenticated } from "../helpers/auth.helpers.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });

router.put("/edit/:id", isAuthenticated, upload.single('profilePicture'), async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found!!" });
      }
  
      if (user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "User not authorized to edit this profile !!",
        });
      }
  
      // Update user details
      user.fullname = req.body.fullname || user.fullname;
      user.username = req.body.username || user.username;
  
      if (req.file) {
        const url = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
        user.profilePicture = url;
      }
  
      await user.save();
      res.json({ message: "User updated successfully!!", user });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error });
    }
});

router.get("/leaderboard", isAuthenticated, async (req, res) => {
  try {
    const leaderboard = await Results.find({})
                                     .sort({ totalXP: -1 })
                                     .populate('userId')
                                     .lean();
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get('/activitiesCompleted', isAuthenticated, async (req, res) => {
  const userId = req.user._id;

  try {
    const results = await Results.findOne({ userId });

    // If user doesn't have any data
    if (!results) {
      return res.status(200).json({
        completionRate: "0", // No data, so 0% completion
        message: "No activities completed yet."
      });
    }

    // Calculate completion rate based on lessons, quizzes completed and assessments (in the future)
    const totalLessons = 3;
    const totalQuizzes = 6;
    const totalActivities = totalLessons + totalQuizzes;
    //if lessons are completed or not
    const lessonsCompleted = results.lessonsCompleted ? results.lessonsCompleted.length : 0;
    //if quizzes are completed or not
    const quizzesCompleted = results.completed ? results.completed : 0;
    const completedActivities = lessonsCompleted + quizzesCompleted;
    const completionRate = (completedActivities / totalActivities) * 100;

    res.json({
      completionRate: completionRate.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;