import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
// import OAuth2Strategy from 'passport-google-oauth2';
import User from './models/userModel.js';

const GOOGLE_CLIENT_ID = '136984051374-e148a5vp8qbs6ddcgrorgj5952g9rg17.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  // scope: ["profile", "email"]
},
  async (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile)
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          fullname: profile.displayName,
          profilePicture: profile._json.image.url, // profile.picture might not work
        });

        await user.save();
      }

      return done(null, user);
      
    } 
    catch (err) 
    {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize the user with _id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
