const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema(
  {
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      data: {
        type: String,
      },
    }
);
  
  
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;