const celery = require("celery-node");
const { Image } = require("./models");

const client = celery.createClient("amqp://", "amqp://");
const worker = celery.createWorker("amqp://", "amqp://");

const saveRecordTask = client.createTask("tasks.saveRecord");
const fetchImageDataTask = client.createTask("tasks.fetchImageData");

worker.register("tasks.fetchImageData", async (imageId) => {
  return await Image.findByPk(imageId);
});

worker.register("tasks.saveRecord", async (file) => {
  const image = await Image.create({
    imagePath: file.filename,
    fileSize: file.size,
    originalName: file.originalname,
  });
  return image.id;
});

worker.start();

module.exports = {
  client,
  worker,
  saveRecordTask,
  fetchImageDataTask,
};
