const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "newsfeed";

const Newsfeed = sequelize.define(
  "Newsfeed",
  {
    name: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
    title: {
      type: Sequelize.STRING,
    },
    URL: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Newsfeed.belongsTo(User, { as: "User", foreignKey: "userid" });

Newsfeed.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Newsfeed;
