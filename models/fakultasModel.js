module.exports = (sequelize, DataTypes) => {
  const Fakultas = sequelize.define(
    "Fakultas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "fakultas",
      timestamps: false,
    }
  );

  return Fakultas;
};
