const express = require('express')
const bodyParser = require('body-parser')

const Signup_Controller = require("./dbcontroller/signup.js");
const login_Controller = require("./dbcontroller/login.js");
const app = express()
 
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload_image = multer({ storage: storage });

app.post("/registration", upload_image.single("photo"), Signup_Controller.signup_validation, Signup_Controller.Signup_User);
app.post("/login", login_Controller.login_validator, login_Controller.password_verify, login_Controller.jwtTokenGen, login_Controller.verify_Token);

// emplty error handling
app.use("/*", function(req, res) {
  res.status(404);
  res.send("NOT FOUND");
});

//error handling middleware first parm err
app.use(function(err, req, res, next) {
  res.status(500);
  res.json({
    status: 500,
    message: err.message
  });
});


//for unnecessary request
app.use("/*", function(req, res) {
  res.status(404);
  res.json({
    status: 404,
    message: "Page not found"
  });
});


app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3220)