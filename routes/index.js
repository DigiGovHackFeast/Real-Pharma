var dotenv = require('dotenv').config();
var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
const nodemailer = require('nodemailer');
var Token = require("../models/token");
var middleware = require("../middleware");
var randomString= require("randomstring");
var multer = require('multer');


//Homepage Route
router.get('/', (req, res) => res.render("landing"));

//Register Route
router.get("/register", function(req, res){
  res.render("register");
});

//Register Create Route
router.post("/register", function(req, res){


  req.body.newUser = {



    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,

    timestamp: {
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
  User.findOne({'email': req.body.email}, function(err, email){
    if(err){
      console.log(err);
    }
    else{
      if(email){

        console.log(email);
        req.flash("error", "Someone is already registered with this email address");
        res.redirect("register");
      }
      else{
        req.body.newUser.secretToken = randomString.generate();
        User.register(new User(req.body.newUser), req.body.password, function(err, user){
          if(err){
            console.log(err.message);
            console.log(typeof(err.message));
            req.flash("error", err.message);
            res.redirect("register");
          }
          console.log(user);
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kkhan.bese16seecs@seecs.edu.pk',
              pass: 'nustA-30/1e-9'
            },
            tls: {
                rejectUnauthorized: false
            }
          });
          // var htmlEmail = '<p>Thank you for resgistering. Click on Button below to verify your email.</p><a href=https://murmuring-bastion-29134.herokuapp.com/verify/'+req.body.newUser.secretToken+'"><button>Verify Email</button></a>'
          // var htmlEmail = <p>Thank you for resgistering. Click on Button below to verify your email.</p><a href='http://localhost:3000/verify/'+req.body.newUser.secretToken>Login</a>
          var htmlEmail = 'http://localhost:3000/verify/'+ req.body.newUser.secretToken;
          var tokendata = {
            _userId: user._id,
            token: req.body.newUser.secretToken,
            createdAt: new Date()
          }
          Token.create(tokendata, function(err, response){
            if(err){
              console.log(err);
            }
          });
          var mailOptions = {
            from: 'kkhan.bese16seecs@seecs.edu.pk',
            to: req.body.email,
            subject: 'Verify Your Email',
            html: htmlEmail
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Plant App "+ req.body.newUser.username);
            res.render("emailverify");
          })
        });
      }

    }});

});










//LOGIN
router.get("/login", function(req, res){

  res.render("login");
});

//Login Authenticate
router.post("/login", passport.authenticate("local", {
  failureFlash: 'No Such User Registered',
  failureRedirect:"/login"

}),async function(req, res){
  console.log(req.user);
  if(req.user.isVerified){
    req.flash("success", "Logged In Sucessfully");
    res.redirect("/med/verify");
  }
  else{
    req.flash("error", "Verify Your Token Sent Through Email.")
    req.logout();
    res.redirect("/login")
  }



});

//LOGOUT
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged You Out!");
  res.redirect("/");
});


module.exports = router;
