const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0, password: 0 });
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ status: "success", data: newUser });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to register user",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      status: "success",
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to login user",
      error: err.message,
    });
  }
};

// logout

module.exports = { getAllUsers, register, login };
