const twitter_user = require("../model/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


function login_validator(req, res, next) {
    // registered or not
    if (req.body.email === "") {
      res.status(200);
      res.json({
        satus: 200,
        message: "Email shouldnot be empty"
      });
  
    } else if (req.body.password === "") {
      res.status(200);
      res.json({
        satus: 200,
        message: "Password shouldnot be empty"
      });
  
    }
  
    twitter_user
  
      .findOne({
        where: { email: req.body.email }
      })
      .then(function(result) {
        if (result === null) {
          res.send("You have not registered, please register first");
        } else {
          req.passwordFromDB = result.dataValues.password;
          next();
        }
      })
      .catch(function(err) {});
    // next()
  }


  function password_verify(req, res, next) {
    // console.log(req.body.password, req.passwordFromDB);
     bcrypt
       .compare(req.body.password, req.passwordFromDB)
       .then(function(result) {
        // console.log(result);
         if (result === true) {
           next();
         } else {
           res.json({ status: 500, message: "Invalid PAssword" });
           // next({status:500,message:'Invalid PAssword'})
         }
       })
   
       .catch(function(err) {
         next(err);
         // next({status:500,message:'ERROROROR'})
   
       });
   
   }


   function jwtTokenGen(req, res) {
    console.log(req.body.email);
    const payloadd = {
      email: req.body.email,
      userLevel: "superadmin"
    };  
  
    jwt.sign(payloadd, "thisisSecretKey", { expiresIn: "10h" }, function(
      err,
      resultToken
    ) {
      // console.log(err);
      // console.log(resultToken);
      res.json({ usertoken: resultToken });
    });
  }
  
  function verify_Token(req, res, next) {
    if (req.headers.authorization === undefined) {
      res.json({ status: 401, message: "Unauthorized" });
    }
  
    console.log(req.headers.authorization);
    //slice the Bearer and sapce part out
    const token = req.headers.authorization.slice(7,
      req.headers.authorization.length
    );

    jwt.verify(token, "thisisSecretKey", function(err, result) {  
      // console.log(err);
      console.log(result);
      //check result then next to another middleware
  
      next();
    });
  
    //token verify
    // next()
  }
  
  
  
  module.exports = {
    login_validator,
    password_verify,
    jwtTokenGen,
    verify_Token
  
  };