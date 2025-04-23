require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const db = require("./models");

const app = express();
app.use(bodyParser.json()); // Parses JSON bodies
app.use(express.json()); // Alternative JSON parser
app.use("/api/auth", authRoutes);

// Sync database and start server
db.sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Failed to sync database:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Auth service running at http://localhost:${PORT}`)
);
