const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Node API Sprint Challenge</h2>`);
});

function logger(req, res, next) {
  console.log(
    `${req.method} request to ${req.originalUrl} at ${new Date().toUTCString()}`
  );
  next();
}

module.exports = server;
