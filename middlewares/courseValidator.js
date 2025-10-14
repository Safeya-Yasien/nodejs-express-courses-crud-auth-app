const { body, validationResult } = require("express-validator");

const courseValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 2 })
      .withMessage("Description must be at least 2 characters long"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isInt()
      .withMessage("Price must be an integer"),
  ];
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  next();
};

module.exports = { courseValidator, handleValidationErrors };
