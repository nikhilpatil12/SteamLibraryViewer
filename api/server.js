const express = require("express");
const passport = require("passport");
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
    origin: "http://localhost:5173", // Replace with your frontend's origin
    credentials: true, // Enable passing cookies and credentials
  })
);
// Set up Steam authentication strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
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
  console.log(user);
  console.log("Out of deserialize");
  done(null, {
    steamId: user.steamId,
    profile: JSON.stringify(user.userProfile),
  }); // We don't need to retrieve the profile here
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "Authenticated", user: req.user });
  } else {
    res.json({ message: "Not authenticated" });
  }
});

app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "http://localhost:5173/" }),
  (req, res) => {
    // Redirect to the SvelteKit application with user data as a query parameter
    res.redirect(`http://localhost:5173/profile`);
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
