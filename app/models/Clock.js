const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "clock";

const Clock = sequelize.define(
  "Clock",
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
    timezone: {
      type: Sequelize.STRING,
    },
    isdigital: {
      type: Sequelize.BOOLEAN,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Clock.belongsTo(User, { as: "User", foreignKey: "userid" });

Clock.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Clock;
