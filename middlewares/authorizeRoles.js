const authorizeRoles = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (roles.includes(role)) {
      next();
    } else {
      res.status(403).json({
        status: "error",
        message: "You are not authorized to access this route",
      });
    }
  };
};

module.exports = authorizeRoles;
