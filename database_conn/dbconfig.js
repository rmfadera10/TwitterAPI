var Sequelize = require("sequelize");
var sequelize = new Sequelize("Twitter_Clone", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});
sequelize
  .authenticate()
  .then(function() {
     console.log('db connection successfull');
  })

  .catch(function(err) {
    console.log(err);
  });



module.exports = {

  Sequelize,

  sequelize

};