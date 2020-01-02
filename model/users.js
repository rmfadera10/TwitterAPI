var database = require("../database_conn/dbconfig.js");

var twitter_user = database.sequelize.define(
  "twitter_user",
  {
 //attributes
    id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    name: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require: true
    },

    password: {
      type: database.Sequelize.TEXT,
      allowNull: false,
      require: true
    },

    email: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },

    phone: {
        type: database.Sequelize.TEXT,
        allowNull: false
      },

    image: {
      type: database.Sequelize.TEXT,
      allowNull: false
    }

  },

  {
    freezeTableName: true,
    tableName: "tbl_twitter"
  }
);
twitter_user

  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })

  .catch(function(err) {
    console.log(err);
  });


module.exports = twitter_user;