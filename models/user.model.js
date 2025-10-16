const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
