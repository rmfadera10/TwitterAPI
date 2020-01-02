const twitter_user = require("../model/users.js");
const bcrypt = require("bcryptjs");

function Signup_User(req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      //console.log(hash);
      twitter_user

        .create({
          name: req.body.name,
          password: hash,
          email: req.body.email,
          phone: req.body.phone,
          image: req.file.filename

        })

        .then(function(result) {
          //console.log(result);
          res.status(201);
          res.json({
            satus: 201,
            message: "You have been registered successfully"
          });
        })

        .catch(function(err) {
          // console.log(err)
          next(err);

        });

    });

  });

}



function signup_validation(req, res, next) {
  // console.log(req.body.username);
  if (req.body.name == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "Name should not be empty"
    });

  } else if (req.body.password == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "Password should not be empty"
    });

  } else if (req.body.email == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "email should not be empty"

    });
}
    else if (req.body.phone == "") {
        res.status(200);
        res.json({
          satus: 200,
          message: "ph should not be empty"
        });

  } else if (req.body.image == "") {
    res.status(200);
    res.json({
      satus: 200,
      message: "image should not be empty"
    });

  }

  twitter_user
    .findOne({
      where: { email: req.body.email }
    })
    .then(function(result) {
      // console.log(result);
      if (result === null) {
        // res.send('user not found so registered')
        next();
      } else {
        res.status(200);
        res.json({
          satus: 200,
          message: "Email was already registered"
        });

      }

    })

    .catch(function(err) {
      next(err);
    });
}



module.exports = {
    Signup_User,
    signup_validation
};