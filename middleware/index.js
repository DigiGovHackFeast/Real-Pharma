var Post = require("../models/post");
var User = require("../models/user");
var Comment = require("../models/comment");

var middlewareObj ={

};
middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Post.findById(req.params.id, function(err, foundPost){
        if(foundPost.author.id.equals(req.user._id)){
          next();

        }else{
          req.flash("error", "You donot have permission to do that!");
          res.redirect("back");
        }

      });
    }else{
      req.flash("error", "You Need to Logged in First");
      res.redirect("back");
    }
  };

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){

        if(foundComment.author.id.equals(req.user._id)){
          next();

        }else{
          req.flash("error", "You donot have permission to do that");
          res.redirect("back");
        }

      });
    }else{
      req.flash("error", "You Need to Logged in First");
      res.redirect("back");
    }
  };
middlewareObj.checkVerificationStatus = function(req, res, next){
  User.findOne({username:req.user.username}, function(err, user){
    if(!user.isVerified){
      req.flash("error", "Verify Your Profile.");
      res.redirect("back");
    }
    else{
      return next();
    }
  })
}
middlewareObj.checkProfileOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    User.findOne({username : req.user.username}, function(req, res){
      next();
    });
    req.flash("error", "You cannot edit this profile.");
    res.redirect("/");
  }
  else{
    req.flash("error", "You need to login.");
    res.redirect("/");
  }
}
middlewareObj.isAdmin = function(req, res, next){
  if(req.isAuthenticated()){
    if(req.user.role == "admin"){
      return next();
    }

  }
  req.flash("error", "You Need to Logged in First");
  res.redirect("/login");
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "You Need to Logged in First");
    res.redirect("/login");
  };



module.exports = middlewareObj;
