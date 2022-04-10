const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "weather";

const Weather = sequelize.define(
  "Weather",
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
    location: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Weather.belongsTo(User, { as: "User", foreignKey: "userid" });

Weather.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Weather;
