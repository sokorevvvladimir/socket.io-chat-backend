const server = require("./app");

const { PORT = 3001 } = process.env;

server.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3001");
});
