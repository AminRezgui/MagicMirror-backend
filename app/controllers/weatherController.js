const Weather = require("../models/Weather");

const WeatherController = () => {
  const getWeatherByUser = async (req, res) => {
    const { query } = req;
    //console.log(req);
    try {
      const weather = await Weather.findOne({
        where: { userid: query.userid },
      });
      res.status(200).json(weather);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getWeatherByUser,
  };
};

module.exports = WeatherController;
