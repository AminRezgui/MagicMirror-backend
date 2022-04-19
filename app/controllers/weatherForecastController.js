const WeatherForecast = require("../models/WeatherForecast");

const WeatherForecastController = () => {
  const getWeatherForecastByUser = async (req, res) => {
    const { query } = req;
    //console.log(req);
    try {
      const weatherForecast = await WeatherForecast.findOne({
        where: { userid: query.userid },
      });
      res.status(200).json(weatherForecast);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getWeatherForecastByUser,
  };
};

module.exports = WeatherForecastController;
