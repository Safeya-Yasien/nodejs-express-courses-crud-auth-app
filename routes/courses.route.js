const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses,
} = require("../controllers/courses.controller");
const {
  courseValidator,
  handleValidationErrors,
} = require("../middlewares/courseValidator");
const verifyToken = require("../middlewares/verifyToken");

// Get all courses
router.get("/", getAllCourses);

// Create new course
router.post(
  "/",
  courseValidator(),
  verifyToken,
  handleValidationErrors,
  createCourse
);

// Update course by ID
router.put(
  "/:id",
  courseValidator(),
  verifyToken,
  handleValidationErrors,
  updateCourse
);

// Delete course by ID
router.delete("/:id", verifyToken, deleteCourse);
// Delete all courses
router.delete("/", verifyToken, deleteAllCourses);

module.exports = router;
