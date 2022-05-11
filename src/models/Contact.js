const mongoose =require('mongoose');

const ContactSchema = new mongoose.Schema({
    Name: {
        type: String,
      required: true,
    },

    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },

    },
   {
  timestamps: true,
   }
);
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;