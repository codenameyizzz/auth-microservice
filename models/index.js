const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Fakultas = require("./fakultasModel")(sequelize, Sequelize);
db.Prodi = require("./prodiModel")(sequelize, Sequelize);
db.User = require("./userModel")(sequelize, Sequelize);

db.Fakultas.hasMany(db.User, { foreignKey: "fakultas_id" });
db.Prodi.hasMany(db.User, { foreignKey: "prodi_id" });
db.User.belongsTo(db.Fakultas, { foreignKey: "fakultas_id" });
db.User.belongsTo(db.Prodi, { foreignKey: "prodi_id" });

db.Fakultas.hasMany(db.Prodi, { foreignKey: "fakultas_id" });
db.Prodi.belongsTo(db.Fakultas, { foreignKey: "fakultas_id" });

module.exports = db;
