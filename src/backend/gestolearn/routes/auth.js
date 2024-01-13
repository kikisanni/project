import express from "express";
import passport from "passport";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('http://localhost:5173/');

  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect("http://localhost:5173/");
  // });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

// Google OAuth route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Check if user has a username
    if (req.user.username) {
      res.redirect("http://localhost:5173/registered");
    } else {
      res.redirect("http://localhost:5173/profile");
    }
  }
);

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  console.log("isAuthenticated middleware called");
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next();
  } else {
    console.log("User is not authenticated");
    res.redirect("/login");
  }
}
export default router;


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

    res.redirect("http://localhost:5173/registered"); // Redirect after update
  } catch (error) {
    console.error("Error caught in /updateUsername:", error);
    res
      .status(500)
      .json({ message: "Error updating username", error: error.message });
  }
});

router.get("/login/success", (req, res) => {
  console.log("reqqqqq", req.user);

  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});
