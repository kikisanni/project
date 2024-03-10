import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/userModel.js";

import { config } from "dotenv";

config();
const { NODE_ENV, GOOGLE_CLIENT_ID } = process.env;
const { NODE_ENV2, GOOGLE_CLIENT_SECRET } = process.env;

const defaultProfilePicture = "/media/Default_pfp.png";

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      // scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        let user = await User.findOne({ profileId: profile.id });

        if (!user) {
          user = new User({
            profileId: profile.id,
            fullname: profile.displayName,
            profilePicture: profile._json.picture || defaultProfilePicture,
            provider: "Google",
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserialize User", user);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
