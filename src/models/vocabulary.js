module.exports = (sequelize, DataTypes) => {
  const Vocabulary = sequelize.define("vocabulary", {
    name: DataTypes.STRING,
    userId: DataTypes.STRING,
  });

  Vocabulary.associate = (models) => {
    Vocabulary.belongsTo(models.language, { as: "plainLanguage" });
    Vocabulary.belongsTo(models.language, { as: "translatedLanguage" });
    Vocabulary.hasMany(models.word);
  };

  return Vocabulary;
};
