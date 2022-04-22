const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "calendar";

const Calendar = sequelize.define(
  "Calendar",
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
    country: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Calendar.belongsTo(User, { as: "User", foreignKey: "userid" });

Calendar.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Calendar;
