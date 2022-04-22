const privateRoutes = {
  /*--------------------UserController-------------------- */
  "GET /getcomponents": "UserController.getComponents",
  "GET /getactivecomponents": "UserController.getActiveComponents",
  "PUT /editProfile": "UserController.editProfile",
  "GET /test": "UserController.test",

  /*--------------------ClockController-------------------- */
  "GET /getclock": "ClockController.getClockByUser",
  "PUT /updateclock": "ClockController.updateClock",

  /*--------------------NewsfeedController-------------------- */
  "GET /getnewsfeed": "NewsfeedController.getNewsfeedByUser",
  "PUT /updatenewsfeed": "NewsfeedController.updateNewsfeed",

  /*--------------------CalendarController-------------------- */
  "GET /getcalendar": "CalendarController.getCalendarByUser",
  "PUT /updatecalendar": "CalendarController.updateCalendar",

  /*--------------------WeatherController-------------------- */
  "GET /getweather": "WeatherController.getWeatherByUser",
  "PUT /updateweather": "WeatherController.updateWeather",

  /*--------------------WeatherForecastController-------------------- */
  "GET /getweatherforecast":
    "WeatherForecastController.getWeatherForecastByUser",
  "PUT /updateweatherforecast":
    "WeatherForecastController.updateWeatherForecast",

  /*--------------------TodoController-------------------- */
  "GET /gettodolist": "TodoController.getTodoListByUser",
  "GET /gettodo": "TodoController.getTodoByUser",
  "PUT /updatetodo": "TodoController.updateTodo",
  "POST /addtodoelement": "TodoController.addtodoElement",
  "PUT /updatetodoelement": "TodoController.updatetodoElement",
};

module.exports = privateRoutes;
