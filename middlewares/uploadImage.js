const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];

  if (imageType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
