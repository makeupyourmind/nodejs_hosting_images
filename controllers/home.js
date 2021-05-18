const path = require("path");
const { fetchImageDataTask } = require("../celery");

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

const viewUploadedPhoto = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/viewImage.html`));
};

const getImageDataById = (req, res) => {
  const imageId = req.params.id;
  const fetchImageDataTaskResult = fetchImageDataTask.applyAsync([imageId]);

  fetchImageDataTaskResult.get().then((imageData) => {
    res.json(imageData);
  });
};

const geAbout = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/about.html`));
};

const getRules = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/rules.html`));
};

module.exports = {
  getHome: home,
  viewUploadedPhoto,
  getImageDataById,
  geAbout,
  getRules,
};
