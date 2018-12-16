var dotenv = require('dotenv').config(),
    express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        = require("./models/user"),
    favicon = require('serve-favicon'),
    flash       = require("connect-flash"),
    path = require("path");
const http = require("http");



//requiring routes
var indexRoutes      = require("./routes/index"),
    verifyRoutes = require("./routes/verify");
    medRoutes = require("./routes/med");
    adminRoutes = require("./routes/admin");



mongoose.connect("mongodb://pb193105:pb193105@ds129484.mlab.com:29484/florashotdemo");
// mongoose.connect("mongodb://pb193105:pb193105@ds035533.mlab.com:35533/pb193105");



//mongodb://pb193105:pb193105@ds035533.mlab.com:35533/pb193105
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//app.use(favicon(__dirname + '/public/img/landing/favicon.png'));
// app.use('/favicon.png', express.static('/img/landing/favicon.png'));
//app.use(favicon(path.join(__dirname,'public','img', 'landing' ,'fevicon.png')));



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/verify", verifyRoutes);
app.use("/med", medRoutes);
app.use("/admin", adminRoutes);



app.listen(3000, () => console.log('Example app listening on port 3000!'))
// app.listen(process.env.PORT, process.env.IP);
