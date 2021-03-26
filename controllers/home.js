const path = require("path");
const { Image } = require("../models");

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

const viewUploadedPhoto = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/viewImage.html`));
};

const getImageDataById = async (req, res) => {
  const imageId = req.params.id;

  const response = await Image.findByPk(imageId);

  res.json(response);
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
