const express = require("express");
const http = require("http");
const dbService = require("./services/db.service");
const database = require("../config/database");
const config = require("../config/");
const mapRoutes = require("express-routes-mapper");
const bodyParser = require("body-parser");

const app = express();
const server = http.Server(app);

const DB = dbService().start();
const mappedOpenRoutes = mapRoutes(config.publicRoutes, "app/controllers/");
app.use(bodyParser.json());
app.use("/public", mappedOpenRoutes);
app.get("/ping", function (req, res) {
  res.status(200).send("pong");
});

server.listen(3000, () => {
  console.log("starting port on 3000");
  return DB;
});
