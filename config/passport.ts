import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  google_client_id,
  google_client_secret,
  server_url,
} from "../helper/secret";
import User, { UserDocument } from "../models/user.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: `${server_url}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done: any) => {
      try {
        let user = (await User.findOne({
          googleId: profile.id,
        })) as UserDocument | null;

        if (!user) {
          user = (await User.findOne({
            email: profile.emails?.[0].value,
          })) as UserDocument | null;

          if (!user) {
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0].value,
              profileImage: profile.photos?.[0].value,
            });
            await user.save();
          }
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize user information into the session
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = (await User.findById(id)) as UserDocument | null;
    done(null, user);
  } catch (error) {
    done(error);
  }
});
