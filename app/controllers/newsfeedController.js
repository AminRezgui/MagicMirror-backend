const { Op } = require("sequelize");
const Feed = require("../models/Feed");
const Newsfeed = require("../models/Newsfeed");
const Newsfeed_Feed = require("../models/Newsfeed_Feed");

const NewsfeedController = () => {
  const getNewsfeedByUser = async (req, res) => {
    const { query } = req;
    //console.log(req);
    try {
      const newsfeed = await Newsfeed.findOne({
        where: { userid: query.userid },
      });
      res.status(200).json(newsfeed);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };
  const updateNewsfeed = async (req, res) => {
    const { body } = req;
    try {
      console.log(body);
      const newsfeed = await Newsfeed.findByPk(body.id);

      await newsfeed.update({
        showdescription: body.showdescription,
        active: body.active,
      });
      res.status(200).json(newsfeed);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  const feedList = async (req, res) => {
    const { query } = req;
    var newsfeed = await Newsfeed.findOne({ where: { userid: query.userid } });
    try {
      var feedIds = await Newsfeed_Feed.findAll({
        attributes: ["feedid"],
        where: { newsfeedid: newsfeed.id },
      });
      feedIds = feedIds.map((el) => el.feedid);
      var feeds = await Feed.findAll({
        where: { id: { [Op.in]: feedIds } },
      });

      res.status(200).json(feeds);
    } catch (e) {
      res.status(400).json(e);
    }
  };

  return {
    getNewsfeedByUser,
    updateNewsfeed,
    feedList,
  };
};

module.exports = NewsfeedController;
