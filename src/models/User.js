const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "cadre_pedagogique"],
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //before the s  ve we can do so , save is the name of middelware and a function to run
  const salt = await bcrypt.genSalt(10); // next : to next middelware     10 nbre de tour generer le tri
  this.password = await bcrypt.hash(this.password, salt); // pass la9dim t3ayatlou lel saltu
  next();
});

//verify password
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

//for validations
