const Sequelize = require("sequelize");

const sequelize = require("../../config/database");
const Feed = require("./Feed");
const Newsfeed = require("./Newsfeed");

const tableName = "newsfeed_feed";

const Newsfeed_Feed = sequelize.define(
  "Newsfeed_Feed",
  {
    newsfeedid: {
      type: Sequelize.INTEGER,
    },
    feedid: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName }
);

Newsfeed_Feed.belongsTo(Newsfeed, { as: "Newsfeed", foreignKey: "newsfeedid" });
Newsfeed_Feed.belongsTo(Feed, { as: "Feed", foreignKey: "feedid" });

Newsfeed_Feed.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Newsfeed_Feed;
