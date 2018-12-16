var mongoose = require("mongoose");


var ReportSchema = new mongoose.Schema({
  hexcodeonmed: String,
  reciptpic: Number,
  medpic: String,
  retailername: String,
  retaileraddress:String


});

module.exports = mongoose.model("Report", ReportSchema)
