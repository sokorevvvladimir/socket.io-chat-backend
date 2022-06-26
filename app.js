const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("tiny"));

module.exports = app;
