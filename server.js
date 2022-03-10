require("dotenv").config();
require("express-async-errors");

// node express mongoose
const path = require("path");
const express = require("express");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");

// npm packages
const { StatusCodes } = require("http-status-codes");

// custom stuff
const errorHandlerMiddleware = require("./middleware/error-handler");
const { BadRequestError, AuthenticationError } = require("./errors");

app.use(express.json());

app.get("/api/v1/auth/user", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({ allUsers });
});

app.post("/api/v1/auth/register", async (req, res, next) => {
  const newUser = await User.create(req.body);
  token = newUser.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: newUser.displayName }, token });
});

app.post("/api/v1/auth/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new AuthenticationError("Invalid credentials");
  }
  token = user.createToken();
  res.status(StatusCodes.OK).json({ user: { name: user.displayName }, token });
});

app.get("/api/v1/hello-world", (req, res) => {
  res.status(StatusCodes.OK).json("Hello Everyone");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static file
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use(errorHandlerMiddleware);

const { PORT } = process.env;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("listening on port 4000 ....");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
