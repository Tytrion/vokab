module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define("language", {
    code: DataTypes.STRING,
  });

  return Language;
};
