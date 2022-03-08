const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "Please provide a display name"],
    minLength: 1,
    maxLength: 20,
  },
  email: {
    type: String,
    unique: [true, "an account with this email already exists"],
    required: [true, "Please provide an email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
  },
});

UserSchema.pre("save", async function () {
  // runs before new user gets saved, since "User.create()" is shorthand for "new User(doc).save()"
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this.id, userDisplayName: this.displayName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = function (incomingPassword) {
  const isMatch = bcrypt.compare(incomingPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
