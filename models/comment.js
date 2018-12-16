var mongoose = require("mongoose");


var CommentSchema = new mongoose.Schema({
  name: String,
  timestamp: {
    createdAt: Date,
    updatedAt: Date
  }

});

module.exports = mongoose.model("Comment", CommentSchema)
