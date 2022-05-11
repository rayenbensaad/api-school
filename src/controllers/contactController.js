var nodemailer = require('nodemailer');
const Contact =require('../models/Contact');
const { application } = require("express");

// Create and Save a new Contact
 exports.createContact = (req, res) => {
   
  // Validate request
  if (!req.body.Name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Contact
  const contact = {
    Name: req.body.Name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
  };


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 	'reactnode3@gmail.com'  ,   // must be Gmail
      pass: '123456*.'
    } 
  });

  let mailOptions = {
    from:'reactnode3@gmail.com' ,
    to: 'rayenbensaad01@gmail.com', // must be Gmail
    cc:`${req.body.Name} <${req.body.email}> ${req.body.message}`,
    subject: ` ${req.body.subject}`,
    html: `
          <h2>Contact: </h4>
          <h3> name : ${req.body.Name} </h3>
          <h3> email : ${req.body.email} </h3>
          <h3> message : ${req.body.message} </h3>
          `
  };


 transporter.sendMail(mailOptions,(error,info) =>{
  if (error){
    return console.log(error);
  }

});
 // Save Contact in the database
  Contact.create(contact)
    .then(data => {
      res.send(data);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({
            message: 'successfuly sent!'
          })
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};


