const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const User = require("./User");

const tableName = "complements";

const Complements = sequelize.define(
  "Complements",
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
    userid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Complements.belongsTo(User, { as: "User", foreignKey: "userid" });

Complements.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Complements;
