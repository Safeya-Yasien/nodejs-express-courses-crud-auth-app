const Course = require("../models/Course.model");

const getAllCourses = async (req, res) => {
  try {
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
    res.status(200).json({ status: "success", data: { courses } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch courses",
      error: err.message,
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = new Course({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    await newCourse.save();
    res.status(201).json({ status: "success", data: newCourse });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: { message: "Invalid data", error: err.message },
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Course not found" } });
    }
    course.name = req.body.name;
    course.description = req.body.description;
    course.price = req.body.price;

    await course.save();
    res.status(200).json({ status: "success", data: { course } });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: { message: "Update failed", error: err.message },
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: "fail",
        data: { message: "Course not found" },
      });
    }
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteAllCourses = async (req, res) => {
  try {
    await Course.deleteMany();
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete courses",
      error: err.message,
    });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  deleteAllCourses,
};
