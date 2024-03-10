import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "../models/userModel.js";
import { config } from "dotenv";


config();
const { NODE_ENV, GITHUB_CLIENT_ID} = process.env;
const { NODE_ENV2, GITHUB_CLIENT_SECRET} = process.env;

const defaultProfilePicture = "/media/Default_pfp.png";

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
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
            username: profile.username,
            provider: "Github",
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
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
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
