var mongoose = require("mongoose");


var PostSchema = new mongoose.Schema({
  name: String,
  timestamp: {
    createdAt: Date,
    updatedAt: Date
  }

});

module.exports = mongoose.model("Post", PostSchema)
