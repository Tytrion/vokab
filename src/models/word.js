module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define("word", {
    plain: { type: DataTypes.STRING, allowNull: true },
    translation: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
  });

  Word.associate = (models) => {
    Word.belongsTo(models.wordCategory);
    Word.belongsTo(models.vocabulary);
  };

  return Word;
};
