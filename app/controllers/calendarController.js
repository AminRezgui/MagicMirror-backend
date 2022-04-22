const Calendar = require("../models/Calendar");

const CalendarController = () => {
  const getCalendarByUser = async (req, res) => {
    const { query } = req;
    //console.log(req);
    try {
      const calendar = await Calendar.findOne({
        where: { userid: query.userid },
      });
      res.status(200).json(calendar);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };
  const updateCalendar = async (req, res) => {
    const { body } = req;
    try {
      console.log(body);
      const calendar = await Calendar.findByPk(body.id);

      await calendar.update({
        country: body.country,
        active: body.active,
      });
      res.status(200).json(calendar);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getCalendarByUser,
    updateCalendar,
  };
};

module.exports = CalendarController;
