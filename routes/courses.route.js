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
const authorizeRoles = require("../middlewares/authorizeRoles");

// Get all courses
router.get("/", getAllCourses);

// Create new course
router.post(
  "/",
  courseValidator(),
  verifyToken,
  authorizeRoles(["admin"]),
  handleValidationErrors,
  createCourse
);

// Update course by ID
router.put(
  "/:id",
  courseValidator(),
  verifyToken,
  authorizeRoles(["admin"]),
  handleValidationErrors,
  updateCourse
);

// Delete course by ID
router.delete("/:id", verifyToken, authorizeRoles(["admin"]), deleteCourse);
// Delete all courses
router.delete("/", verifyToken, authorizeRoles(["admin"]), deleteAllCourses);

module.exports = router;
