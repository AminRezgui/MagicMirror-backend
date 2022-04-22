const Weatherforecast = require("../models/WeatherForecast");
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
  const updateWeatherForecast = async (req, res) => {
    const { body } = req;
    try {
      console.log(body);
      const weatherForecast = await Weatherforecast.findByPk(body.id);

      await weatherForecast.update({
        numberofdays: body.numberofdays,
        location: body.location,
        colored: body.colored,
        active: body.active,
      });
      res.status(200).json(weatherForecast);
    } catch (e) {
      res.status(400).json("bad request: user not found");
    }
  };

  return {
    getWeatherForecastByUser,
    updateWeatherForecast,
  };
};

module.exports = WeatherForecastController;
