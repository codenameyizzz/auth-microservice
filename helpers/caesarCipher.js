const bcrypt = require("bcrypt");
const { caesarEncrypt } = require("./caesarCipher");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nim: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tahun_lulus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fakultas_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prodi_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.name = caesarEncrypt(user.name); // <- enkripsi nama sebelum simpan
      }
    }
  });

  return User;
};