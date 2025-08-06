const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
}, {
  timestamps: true,
});

const modal=mongoose.model("User", userSchema);
module.exports=modal;