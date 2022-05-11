const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const archiveSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    description: {
      type: String,
    },

    role: {
      type: String,
      enum: ["Student", "Teacher", "Admin", "Doc"],
      default: "Doc",
    },
  },
  {
    timestamps: true,
  }
);

archiveSchema.plugin(mongoosePaginate);
const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
