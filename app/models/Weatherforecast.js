const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "weatherforecast";

const Weatherforecast = sequelize.define(
  "Weatherforecast",
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
    numberofdays: {
      type: Sequelize.INTEGER,
    },
    colored: {
      type: Sequelize.BOOLEAN,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Weatherforecast.belongsTo(User, { as: "User", foreignKey: "userid" });

Weatherforecast.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Weatherforecast;
