const util = require("util");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../uploads`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    const filename = `${Date.now()}-secret-${file.originalname}`;
    callback(null, filename);
  },
});

const uploadFiles = multer({ storage: storage }).single("single-file"); //.array("multi-files", 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
