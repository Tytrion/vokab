/**
 * Required External Modules
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");
const db = require("./models");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const bodyParser = require("body-parser");

/**
 * App Variables
 */

const app = express();
const apiRouter = express.Router();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

fs.readdirSync(__dirname + "/controllers/")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    require(path.join(__dirname + "/controllers/", file))(apiRouter, db);
  });
/**
 * Server Activation
 */

db.sequelize.sync().then(() => {
  app.listen(serverPort, () =>
    console.log("Vokab listening on port " + serverPort)
  );
});
