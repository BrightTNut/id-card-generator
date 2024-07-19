const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  schoolname: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  classes: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
