var mongoose = require("mongoose");


var RetailerSchema = new mongoose.Schema({
  name: String,
  address: String,
  concernedperson: String,
  phone: String,
  license: String
});

module.exports = mongoose.model("Retailer", RetailerSchema)
