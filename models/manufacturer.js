var mongoose = require("mongoose");


var ManufacturerSchema = new mongoose.Schema({

  name: String,
  address: String,
  phone: Number,
  licenseNumber: Number,
  medicinelist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine"
  }]
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema)
