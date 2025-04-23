const db = require("../models");

(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    await require("./fakultasSeeder")();
    await require("./prodiSeeder")();
    await require("./userSeeder")();
    console.log("✅ All seeders executed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
})();
