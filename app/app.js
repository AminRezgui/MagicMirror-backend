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

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3001, () => {
  console.log("starting port on 3001");
  return DB;
});

io.on("connection", function (socket) {
  console.log("Client connected to the WebSocket");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("chat message", function (msg) {
    console.log("Received a chat message", msg);
    io.emit("chat message", msg);
  });
});
