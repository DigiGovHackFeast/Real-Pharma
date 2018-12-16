var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

  password: String,
  username: String,
  email: String,
  firstname: String,
  lastname: String,

  secretToken: String,
  score: Number,
  isVerified: { type: Boolean, default: false },
  timestamp: {
    createdAt: Date,
    updatedAt: Date
  },
  role: { type: String, default: "user" }

});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema)
