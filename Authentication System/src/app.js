import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import AuthRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
import User from './models/user.js';
import transporter  from './email.js';
const app = express();
app.use(passport.initialize());
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
   try {
  const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;
      
        let user = await User.findOne({ googleId });

        // If not exists → CREATE user
        if (!user) {
          const username = email.split('@')[0];
          user = await User.create({
            googleId,
            username,
            name,
            email,
          
          });
        }
  // For this example, we'll just return the profile
   return done(null, user);
      } catch (error) {
        return done(error, null);
      }
}));
app.use(express.json());
app.use(cookieparser());
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send the token to the client
    res.json({ token });
  }
);
app.get('/',(req , res)=>{
    res.send({message:"hello world"});
});
app.use('/auth',AuthRoutes);

export default app;
