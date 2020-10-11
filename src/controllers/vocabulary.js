const express = require("express");
const checkJwt = require("../authz/check-jwt");

module.exports = (api, db) => {
  const vocabularyRouter = express.Router();
  vocabularyRouter.use(checkJwt.checkJwt);
  vocabularyRouter.get("/:id", (req, res) => {
    db.vocabulary
      .findOne({
        where: { id: req.params.id },
        include: [
          { model: db.language, as: "plainLanguage", attributes: ["code"] },
          {
            model: db.language,
            as: "translatedLanguage",
            attributes: ["code"],
          },
        ],
        attributes: ["id", "name"],
      })
      .then((vocabulary) => {
        db.word
          .findAll({
            where: {
              vocabularyId: req.params.id,
            },
            include: { model: db.wordCategory, attributes: ["name"] },
          })
          .then((words) => {
            res.json({
              vocabulary: vocabulary,
              words: words,
            });
          });
      });
  });
  vocabularyRouter.get("/:id/meta", (req, res) => {
    db.vocabulary
      .findOne({
        where: { id: req.params.id },
        include: [
          { model: db.language, as: "plainLanguage", attributes: ["code"] },
          {
            model: db.language,
            as: "translatedLanguage",
            attributes: ["code"],
          },
        ],
        attributes: ["id", "name"],
      })
      .then((vocabulary) => {
        db.wordCategory.findAll().then((wc) => {
          res.json({ vocabulary: vocabulary, wordCategories: wc });
        });
      });
  });
  vocabularyRouter.post("/:id/addWord", (req, res) => {
    db.word
      .create({
        plain: req.body.plain,
        translation: req.body.translation,
        description: req.body.description,
        vocabularyId: req.params.id,
        wordCategoryId: req.body.wordCategoryId,
      })
      .then(() => {
        res.json({ result: "OK" });
      });
  });
  api.use("/vocabulary", vocabularyRouter);
};
