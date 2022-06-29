const server = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3001");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
