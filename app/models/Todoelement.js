const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "todoelement";

const Todoelement = sequelize.define(
  "Todoelement",
  {
    name: {
      type: Sequelize.STRING,
    },
    deadline: {
      type: Sequelize.DATE,
    },
    done: {
      type: Sequelize.BOOLEAN,
    },
    todoid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Todoelement.belongsTo(Todo, { as: "Todo", foreignKey: "todoid" });

Todoelement.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Todoelement;
