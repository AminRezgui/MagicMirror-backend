const express = require("express");
const http = require("http");
const dbService = require("./services/db.service");
const database = require("../config/database");

const app = express();
const server = http.Server(app);

const DB = dbService().start();

app.get("/ping", function (req, res) {
  res.status(200).send("pong");
});

database.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
  }
);

server.listen(3000, () => {
  console.log("starting port on 3000");
  return DB;
});
