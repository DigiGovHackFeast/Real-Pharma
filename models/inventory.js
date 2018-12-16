var mongoose = require("mongoose");


var InventorySchema = new mongoose.Schema({
  medicinename: String,
  medicinecompany: String,
  batchnumber: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer"
},
  timestamp: {
    createdAt: Date,
    updatedAt: Date
  }

});

module.exports = mongoose.model("Inventory", InventorySchema)
