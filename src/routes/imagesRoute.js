const express = require("express");

const {
  addArchive,
} = require("../controllers/uploadController");

const imagesRoute = express.Router(); //instance of express router
const upload = require("../middlewares/uploadMiddleware");

//create Cadre Pédagogique
imagesRoute.post("/",upload.single("file"),addArchive ); 

module.exports = imagesRoute;