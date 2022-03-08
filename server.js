require("dotenv").config();
const path = require("path");
const express = require("express");

const app = express();

const User = require("./models/User");
const mongoose = require("mongoose");

app.use(express.json());

/*
All your api endpoints should be prefixed with /api and be before the next ones
If you have many endpoints, consider use Express Router for each set of endpoints
*/

app.post("/api/v1/auth/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({ newUser });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.post("/api/v1/auth/login", (req, res) => {
  res.status(200).send("login user");
});

app.get("/api/v1/hello-world", (req, res) => {
  res.status(200).json("Hello Everyone");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static file
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const { PORT } = process.env;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("listening on port 3000 ....");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
