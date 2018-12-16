var mongoose = require("mongoose");


var EachMedicineSchema = new mongoose.Schema({
  name: String,
  hexcode: String,
  retailer: String,
  manufacturer: String,
  timestamp: {
    createdAt: Date,
    updatedAt: Date
  }

});

module.exports = mongoose.model("EachMedicine", EachMedicineSchema);
