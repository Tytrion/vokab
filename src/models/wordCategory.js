module.exports = (sequelize, DataTypes) => {
  const WordCategory = sequelize.define("wordCategory", {
    name: { type: DataTypes.STRING, allowNull: true },
  });

  WordCategory.associate = (models) => {
    WordCategory.hasMany(models.word);
  };

  return WordCategory;
};
