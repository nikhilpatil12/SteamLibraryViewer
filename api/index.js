const express = require("express");
var passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const expressSession = require("express-session");
const path = require("path");

const app = express();
require("dotenv").config();
const secretKey = process.env.MY_SECRET_KEY;
const apiKey = process.env.API_KEY;
// Configure express-session
app.use(
  expressSession({
    secret: secretKey, // Use the generated secret key
    resave: true,
    saveUninitialized: true,
  })
);

const cors = require("cors");
// Enable CORS for your frontend's origin (replace 'http://localhost:5173' with your actual frontend's origin)
app.use(
  cors({
    origin: "https://steamapp.nikpatil.com",
    credentials: true, // Enable passing cookies and credentials
  })
);
// Set up Steam authentication strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "https://steamapi.nikpatil.com/auth/steam/return",
      // returnURL: "http://localhost:3000/auth/steam/return",
      realm: "https://steamapi.nikpatil.com/",
      // realm: "http://localhost:3000/",
      apiKey: apiKey,
    },
    (identifier, profile, done) => {
      // Handle user data and session setup here
      console.log(identifier);
      console.log(profile);
      console.log(done);

      const user = { steamId: identifier, userProfile: profile };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user); // Serialize the user with their unique identifier (SteamID)
});

passport.deserializeUser((user, done) => {
  // Deserialize the user based on the SteamID stored in the session
  // console.log(user);
  // console.log("Out of deserialize");
  done(null, {
    steamId: user.steamId,
    profile: JSON.stringify(user.userProfile),
  }); // We don't need to retrieve the profile here
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Nothing to see here!");
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "Authenticated", user: req.user, code: 200 });
  } else {
    res.json({ message: "Not authenticated", code: 401 });
  }
});

app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", {
    failureRedirect: "https://steamapp.nikpatil.com",
  }),
  (req, res) => {
    // Redirect to the SvelteKit application with user data as a query parameter
    res.redirect(`https://steamapp.nikpatil.com/profile`);
  }
);

// app.get(
//   "/auth/steam/return",
//   passport.authenticate("steam", { failureRedirect: "/" }),
//   (req, res) => {
//     // Redirect or handle the successful login here
//     res.redirect("/profile");
//   }
// );

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports = app;
