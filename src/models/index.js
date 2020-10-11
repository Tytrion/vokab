"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

let sequelize;
if (env == "production") {
  sequelize = new Sequelize(
    process.env.PRODUCTION_DB_DATABASE,
    process.env.PRODUCTION_DB_USERNAME,
    process.env.PRODUCTION_DB_PASSWORD,
    {
      host: process.env.PRODUCTION_DB_HOST,
      timezone: process.env.GENERAL_DB_TIMEZONE,
      logging: false,
      dialect: "mysql",
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DEVELOPMENT_DB_DATABASE,
    process.env.DEVELOPMENT_DB_USERNAME,
    process.env.DEVELOPMENT_DB_PASSWORD,
    {
      host: process.env.DEVELOPMENT_DB_HOST,
      timezone: process.env.GENERAL_DB_TIMEZONE,
      logging: false,
      dialect: "mysql",
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
