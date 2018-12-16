var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Token = require("../models/token");

router.get("/:id", function(req, res){
  Token.findOne({token: req. params.id}, function(err, response){
    if(response){
      User.update({_id: response._userId},{ isVerified : true}, function(err, user){
        if(err){
          console.log(err);
        }
      req.body.username = user.username;
      });
      req.flash("success", "Token Verified, Login with Your credentials.");
      res.redirect("http://localhost:3000/login/");
    }
  })
});
module.exports = router;
