const express =require ('express');
const {
    createContact,
  } = require("../controllers/contactController");
  const contactRoute = express.Router();
    // Create a new contact
    contactRoute.post("/", createContact);

    module.exports = contactRoute;