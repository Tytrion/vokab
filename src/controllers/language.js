const express = require("express");
const checkJwt = require("../authz/check-jwt");

module.exports = (api, db) => {
  const languageRouter = express.Router();
  languageRouter.use(checkJwt.checkJwt);
  languageRouter.get("/", (req, res) => {
    db.language
      .findAll({ attributes: ["id", "code"] })
      .then((availableLanguages) => {
        res.json({ availableLanguages: availableLanguages });
      });
  });
  api.use("/language", languageRouter);
};
