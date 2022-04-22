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
  const updateClock = async (req, res) => {
    const { body } = req;
    try {
      console.log(body);
      const clock = await Clock.findByPk(body.id);

      await clock.update({
        timezone: body.timezone,
        isdigital: body.isdigital,
        active: body.active,
      });
      res.status(200).json(clock);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getClockByUser,
    updateClock,
  };
};

module.exports = ClockController;
