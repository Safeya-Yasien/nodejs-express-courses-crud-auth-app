require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
const courseRoutes = require("./routes/courses.route");
const userRoutes = require("./routes/users.route");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/uploads", express.static(path.join(__dirname, "public")));
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

app.all("/{*any}", (req, res) => {
  res.status(404).json({ status: "error", data: { message: "Not found" } });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
