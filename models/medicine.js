var mongoose = require("mongoose");


var MedicineSchema = new mongoose.Schema({
  name: String,
  timestamp: {
    createdAt: Date,
    updatedAt: Date
  }

});

module.exports = mongoose.model("Medicine", MedicineSchema)
