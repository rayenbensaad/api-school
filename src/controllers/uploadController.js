
const Archive = require("../models/Archive");
const fs =require('fs');

exports.addArchive = async function (req, res, next) {

  console.log('--------------------');
  try {
        if (!req.body.fullName) {
          return res.status(400).send({
            message: "Content can not be empty!",
          });
        }
        // Create a Post
        const post = {
          fullName: req.body.fullName,
          description: req.body.description,
          role: req.body.role,
          picture: req.file.filename,
        };
    console.log(post);
        // Save post in the database
        Archive.create(post)
          .then((data) => {
            
             console.log('--------------------', data);
             console.log('************',__dirname);
              fs.writeFileSync( `${__dirname}/../uploads`, data.picture);
               
              return res.send(data);
              
          })
         
          .catch((err) => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while creating the post.",
            });
          });
        } catch (error) {
            res.status(500);
            throw new Error(error);
          }
};