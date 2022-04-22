const express = require("express");
const http = require("http");
const dbService = require("./services/db.service");
const database = require("../config/database");
const config = require("../config/");
const mapRoutes = require("express-routes-mapper");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.Server(app);

const DB = dbService().start();
const mappedOpenRoutes = mapRoutes(config.publicRoutes, "app/controllers/");
const mappedPrivateRoutes = mapRoutes(config.privateRoutes, "app/controllers/");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
    origin: true,
    credentials: true,
  })
);
app.use("/public", mappedOpenRoutes);

app.use("/private", mappedPrivateRoutes);
app.get("/ping", function (req, res) {
  res.status(200).send("pong");
});

server.listen(3001, () => {
  console.log("starting port on 3001");
  return DB;
});
