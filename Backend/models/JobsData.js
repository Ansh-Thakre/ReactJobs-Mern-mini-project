const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  location: String,
  salary: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
});

module.exports = mongoose.model("Job", jobsSchema);