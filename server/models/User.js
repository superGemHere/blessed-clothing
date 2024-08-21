const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email."]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "The password must be between 8-16 characters length."],
    maxLength: [16, "The password must be between 8-16 characters length."]
  }
});

userSchema.virtual("repeatPassword").set(function(value) {
  if (this.password !== value) {
    throw new Error("Password's do not match.");
  }
});

userSchema.pre("save", async function() {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
