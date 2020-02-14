const express = require("express");
const helmet = require("helmet");
const server = express();
const actionRoutes = require("./routes/actionRoutes");
const projectRoutes = require("./routes/projectRoutes");
require("dotenv").config();

server.use("/api/projects", logger, projectRoutes);
server.use("/api/actions", logger, actionRoutes);
server.use(helmet());
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

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n * Server running on https://localhost:${port}* \n`);
});
