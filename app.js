const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("morgan");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (client) => {
  console.log("new client connected");
  client.on("CHAT_MESSAGE", ({ message, userName }) => {
    io.emit("CHAT_UPDATE", { message, userName });
  });
});

app.use(cors());
app.use(express.json());
app.use(logger("tiny"));

module.exports = server;
