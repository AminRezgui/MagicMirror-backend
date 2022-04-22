const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "feed";

const Feed = sequelize.define(
  "Feed",
  {
    title: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

Feed.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Feed;
