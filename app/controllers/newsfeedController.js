const Newsfeed = require("../models/Newsfeed");

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

  return {
    getNewsfeedByUser,
    updateNewsfeed,
  };
};

module.exports = NewsfeedController;
