const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      nim: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tahun_lulus: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fakultas_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "fakultas",
          key: "id",
        },
      },
      prodi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "prodi",
          key: "id",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "alumni",
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
