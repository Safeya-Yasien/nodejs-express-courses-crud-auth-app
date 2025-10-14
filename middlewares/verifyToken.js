const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }

  const token = authHeader && authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
};

module.exports = verifyToken;
