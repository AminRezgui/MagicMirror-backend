const publicRoutes = {
  "POST /register": "UserController.register",
  "POST /login": "UserController.login",
  "GET /getcomponents/:userId": "UserController.getComponents",
};

module.exports = publicRoutes;
