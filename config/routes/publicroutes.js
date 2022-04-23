const publicRoutes = {
  "POST /register": "UserController.register",
  "POST /login": "UserController.login",
  "POST /refreshlogin": "UserController.refreshLogin",
};

module.exports = publicRoutes;
