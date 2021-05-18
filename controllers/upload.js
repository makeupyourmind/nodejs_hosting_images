const upload = require("../middleware/upload");

const { saveRecordTask } = require("../celery");

const multipleUpload = async (req, res) => {
  try {
    await upload(req, res);

    if (req.file.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    const saveRecordTaskResult = saveRecordTask.applyAsync([req.file]);
    saveRecordTaskResult.get().then((imageId) => {
      res.redirect(`/view/${imageId}`);
    });
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
