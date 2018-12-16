var express = require("express");
var router = express.Router();
var User = require("../models/user");
var EachMedicine = require("../models/eachmedicine");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dswznyoqb',
  api_key: 648738688112439,
  api_secret: 'Zk06K4VCB9gigB9XmH_YAXx1QSc'
});




router.get("/verify", middleware.isLoggedIn, function(req, res){

      res.render("verify");



});
router.post("/verify",middleware.isLoggedIn, function(req, res){
  EachMedicine.find({hexcode: req.body.inputhexcode}, function(err, response){
    if(err){
      res.render("result", {response:response});
    }
    else{
      console.log(response);
      res.render("result", {response:response});
    }
  });

});

router.get("/imageupload", function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result) {
    console.log(result.secure_url);
  });
  res.send("Done");
});

router.post("/imageupload", upload.single('image'), function(req, res){

  res.render("imageupload");
});

router.get("/report", function(req, res){
  res.render("report");
})




module.exports = router;
