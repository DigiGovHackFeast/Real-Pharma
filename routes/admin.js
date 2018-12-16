var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var middleware = require("../middleware");
var User = require("../models/user");
var Medicine = require("../models/medicine");
var EachMedicine = require("../models/eachmedicine");
var Manufacturer = require("../models/manufacturer");
var Retailer = require("../models/retailer");
var Inventory = require("../models/inventory");



router.get("/login", function(req, res){

  res.render("adminlogin");
});

router.post("/login", passport.authenticate("local", {
  failureFlash: 'No Such User Registered',
  failureRedirect:"/admin/login"

}),async function(req, res){
  console.log(req.user);
  if(req.user.isVerified){
    if(req.user.role == "admin"){
      req.flash("success", "Logged In Sucessfully as Admin");
      res.redirect("/admin/dashboard");
    }
    else{
      req.flash("error", "This is Admin Panel");
      res.redirect("back");
    }

  }
  else{
    req.flash("error", "Verify Your Token Sent Through Email.")
    req.logout();
    res.redirect("/admin/login")
  }



});

router.get("/dashboard", middleware.isAdmin, function(req, res){
  res.render("admindashboard");
});
router.get("/addmanufacturer", middleware.isAdmin, function(req, res){
  res.render("addmanufacturer");
});
router.post("/addmanufacturer", middleware.isAdmin, function(req, res){
  var newmanufacturer = {name: req.body.name, address: req.body.address, phone: req.body.phone, licenseNumber: req.body.licenseNumber};
  Manufacturer.create(newmanufacturer, function(err, response){
    if(err){
      console.log(err);
    }
    else{
      console.log("manufacturer added");
      req.flash('success', "Manufacturer Added");
      res.redirect('/admin/dashboard');
    }
  });
});



router.get("/addmedicine", middleware.isAdmin, function(req, res){
  Manufacturer.find({}, function(err, response){
    if(err){
      console.log(err);
    }
    else{
      res.render("addmedicine", {manufacturer: response});
    }
  });

});
router.post("/addmedicine", middleware.isAdmin, function(req, res){
  // Manufacturer.find({ name: req.body.manufacturer}, function(err, response){
  //   if(err){
  //
  //   }
  //   else{
  //
  //   }
  // });


  var newmedicine = {name: req.body.name};
  Medicine.create(newmedicine, function(err, response){
    if(err){
      console.log(err);
    }
    else{
      console.log(response);
      var medicine = response._id;
      Manufacturer.findOneAndUpdate({name: req.body.manufacturer}, {$push:{ medicinelist: response._id}}, {new: true}, (err, doc) => {
          if (err) {
              console.log("Something wrong when updating data!");
          }

          console.log(doc);
        });
      console.log("Medicine added");
      req.flash('success', "Medicine Added");
      res.redirect('/admin/dashboard');
    }
  });

});



router.get("/addretailer", middleware.isAdmin, function(req, res){
    res.render("addretailer");
  });


router.post("/addretailer", middleware.isAdmin, function(req, res){
  var newretailer = {name: req.body.name, address: req.body.address, concernedperson: req.body.concernedperson,phone: req.body.phone, license: req.body.licenseNumber};
  Retailer.create(newretailer, function(err, response){
    if(err){
      console.log(err);
    }
    else{
      console.log("Retailer added");
      req.flash('success', "Retailer Added");
      res.redirect('/admin/dashboard');
    }
  });

});



router.get("/eachmedicine", middleware.isAdmin, function(req, res){
    res.render("eachmedicine");
  });


router.post("/eachmedicine", middleware.isAdmin, function(req, res){
  var newmedicine = {name: req.body.name, hexcode: req.body.hexcode, retailer: req.body.retailer,manufacturer: req.body.manufacturer};
  EachMedicine.create(newmedicine, function(err, response){
    if(err){
      console.log(err);
    }
    else{
      console.log(response);
      console.log("Medicine added");
      req.flash('success', "Medicine Added");
      res.redirect('/admin/dashboard');
    }
  });

});




router.get("/addinventory", middleware.isAdmin, function(req, res){
    Medicine.find({}, function(err, response){
      if(err){
        console.log(err);
      }
      else{
        Manufacturer.find().populate("medicinelist").exec(function(err, manufacturer){
          if(err){

          }
          else{
            Retailer.find({}, function(err, retailer){
              console.log(manufacturer);

              res.render("addinventory", {medicine:response, manufacturer: manufacturer, retailer: retailer});
            });

          }
        });

      }
    });


  });


router.post("/addinventory", middleware.isAdmin, function(req, res){


  var hexcodearr = [];
  var i = 0;
  for(i ; i < req.body.quantity; i++){
    hexcodearr.push(Math.floor(Math.random()*96777215341343217).toString(16));
  }


  console.log(req.body.retailername);
  Retailer.find({name: req.body.retailername}, function(err, response){
    if(err){

    }
    else{
      var retailer_id = response._id;
      console.log(response);

      var companyname = req.body.medicinename.split('manufacturered')[0];
      console.log(companyname);
      Manufacturer.find({name: companyname}, function(err, manufacturer){
        if(err){

        }
        else{
          console.log(manufacturer);
          var manufacturerid  = manufacturer._id;
          console.log(manufacturerid);
          var newinventory = {name: req.body.medicinename, manufacturer: manufacturerid, hexcode:hexcodearr, retailer: retailer_id };
          console.log(newinventory);
          EachMedicine.create(newinventory, function(err, response){
            if(err){
              console.log(err);
            }
            else{
              console.log("New Medicine batch added");
              req.flash('success', "Medicine Added");
              res.redirect('/admin/dashboard');
            }
          });
        }
      });
    }
  });



});





//LOGOUT
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged You Out!");
  res.redirect("/");
});



module.exports = router;
