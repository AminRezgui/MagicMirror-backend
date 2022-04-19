const Clock = require("../models/Clock");

const ClockController = () => {
  const getClockByUser = async (req, res) => {
    const { query } = req;
    //console.log(req);
    try {
      const clock = await Clock.findOne({ where: { userid: query.userid } });
      res.status(200).json(clock);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getClockByUser,
  };
};

module.exports = ClockController;
