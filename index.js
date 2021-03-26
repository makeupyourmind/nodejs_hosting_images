const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

const PORT = process.env.PORT || 3000;

const homeController = require(`${__dirname}/controllers/home`);
const uploadController = require(`${__dirname}/controllers/upload`);

const NODE_ENV = process.env.NODE_ENV || "development";
const dbConfig = require("./config/config.js")[NODE_ENV];

app.use(express.static("uploads"));

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.get("/", homeController.getHome);
app.get("/about", homeController.geAbout);
app.get("/rules", homeController.getRules);
app.get("/images/:id", homeController.getImageDataById);
app.get("/view/:id", homeController.viewUploadedPhoto);
app.post("/multiple-upload", uploadController.multipleUpload);

app.listen(PORT, () => console.log(`App is started on PORT - ${PORT}`));
