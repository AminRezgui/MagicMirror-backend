const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const bcryptService = require("../services/bcrypt.service");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};
const tableName = "users";
const User = sequelize.define(
  "User",
  {
    username: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    timeformat: {
      type: Sequelize.STRING,
    },
    unit: {
      type: Sequelize.STRING,
    },
  },
  { hooks, tableName }
);

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
module.exports = User;
