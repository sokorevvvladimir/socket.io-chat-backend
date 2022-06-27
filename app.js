const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("morgan");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", () => {
  console.log("new client connected");
});

app.use(cors());
app.use(express.json());
app.use(logger("tiny"));

module.exports = server;
