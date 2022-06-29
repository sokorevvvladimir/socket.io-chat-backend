const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("morgan");
const app = express();

const usersRouter = require("./routes/api/users");

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
app.use(express.static("public"));
app.use(logger("tiny"));
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = server;
