import { Router } from "express";
import User from "../models/userModel.js";
import { isAuthenticated } from "../helpers/auth.helpers.js";
import passport from "passport";
import Results from "../models/ResultsModel.js";
import googlePassport from "../OAuth_Passport/google-oauth20.js";
import githubPassport from "../OAuth_Passport/github-oauth.js";

const router = Router();

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/");
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "You are successfully logged in !",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized!" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure :(!",
  });
});

//get the current user's details
router.get("/current", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userToSend = {
      _id: req.user._id,
      username: req.user.username,
      profilePicture: req.user.profilePicture,
    };
    res.json(userToSend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Google OAuth route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // If a user has a username (if the users wants to login using google)
    if (req.user.username) {
      res.redirect("http://localhost:5173/registered");
    } else {
      res.redirect("http://localhost:5173/profile");
    }
  }
);



router.post("/updateUsername", isAuthenticated, async (req, res) => {
  try {
    console.log("Received update request for user:", req.user);
    const { username } = req.body;
    console.log("Username to update:", username);
    // Use _id from the deserialized user object
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = req.body.username;
    await user.save();

    res.status(200).json({ message: "Username updated successfully" });
    const newResults = new Results({
      userId: user._id,
      // Set any default values as needed
    });
    await newResults.save();
  } catch (error) {
    console.error("There is an error related to updating the username!", error);
    res
      .status(500)
      .json({ message: "Error updating username", error: error.message });
  }
});

// Github OAuth route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

// Callback route after Github authentication
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // If a user has a username (if the users wants to login using google)
    if (req.user.username) {
      res.redirect("http://localhost:5173/registered");
    } else {
      res.redirect("http://localhost:5173/profile");
    }
  }
);

export default router;
