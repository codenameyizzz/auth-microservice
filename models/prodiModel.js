module.exports = (sequelize, DataTypes) => {
  const Prodi = sequelize.define(
    "Prodi",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      fakultasId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "fakultas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        field: "fakultas_id",
      },
    },
    { tableName: "prodi" }
  );

  return Prodi;
};
