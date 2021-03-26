const upload = require("../middleware/upload");

const { Image } = require("../models");

const multipleUpload = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);

    if (req.file.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    const image = await Image.create({
      imagePath: req.file.filename,
      fileSize: req.file.size,
      originalName: req.file.originalname,
    });
    // return res.send(`Files has been uploaded.`);
    return res.redirect(`/view/${image.id}`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload,
};
