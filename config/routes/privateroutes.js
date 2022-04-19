const privateRoutes = {
  /*--------------------UserController-------------------- */
  "GET /getcomponents": "UserController.getComponents",
  "GET /getactivecomponents": "UserController.getActiveComponents",
  "PUT /editProfile": "UserController.editProfile",
  "GET /test": "UserController.test",

  /*--------------------ClockController-------------------- */
  "GET /getclock": "ClockController.getClockByUser",

  /*--------------------WeatherController-------------------- */
  "GET /getweather": "WeatherController.getWeatherByUser",

  /*--------------------WeatherForecastController-------------------- */
  "GET /getweatherforecast":
    "WeatherForecastController.getWeatherForecastByUser",

  /*--------------------TodoController-------------------- */
  "GET /gettodolist": "TodoController.getTodoListByUser",
  "GET /gettodo": "TodoController.getTodoByUser",
  "POST /addtodoelement": "TodoController.addtodoElement",
  "PUT /updatetodoelement": "TodoController.updatetodoElement",
};

module.exports = privateRoutes;
