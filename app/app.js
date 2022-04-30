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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('file');

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

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

app.post('/public/addImage', async (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        } else {
            const fileName = req.file.filename;
            console.log("filename:", fileName)
            console.log("file:", req.file)
            res.status(200).send({name: fileName});
        }
    })
});

server.listen(3001, () => {
    console.log("starting port on 3001");
    return DB;
});
