require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Auth Microservice is running");
});

// Routes
app.use("/api/auth", authRoutes);

// Sync DB & start server
const PORT = process.env.PORT || 3000;

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Gagal sync database:", err));
