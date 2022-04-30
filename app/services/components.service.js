const Calendar = require("../models/Calendar");
const Clock = require("../models/Clock");
const Complements = require("../models/Complements");
const Newsfeed = require("../models/Newsfeed");
const Todo = require("../models/Todo");
const Weather = require("../models/Weather");
const Weatherforecast = require("../models/Weatherforecast");
const componentsService = () => {
  const getComponentsByUser = async (userId) => {
    let components = [];
    const clock = await Clock.findOne({ where: { userid: userId } });
    components.push(clock);
    const complements = await Complements.findOne({
      where: { userid: userId },
    });
    components.push(complements);
    const newsfeed = await Newsfeed.findOne({ where: { userid: userId } });
    components.push(newsfeed);
    const todo = await Todo.findOne({ where: { userid: userId } });
    components.push(todo);
    const weather = await Weather.findOne({ where: { userid: userId } });
    components.push(weather);
    const calendar = await Calendar.findOne({ where: { userid: userId } });
    components.push(calendar);
    const weatherforecast = await Weatherforecast.findOne({
      where: { userid: userId },
    });
    components.push(weatherforecast);
    return components;
  };
  return {
    getComponentsByUser,
  };
};

module.exports = componentsService;
