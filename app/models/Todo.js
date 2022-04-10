const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "todo";

const Todo = sequelize.define(
  "Todo",
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
    periodicity: {
      type: Sequelize.INTEGER,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Todo.belongsTo(User, { as: "User", foreignKey: "userid" });

Todo.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Todo;
