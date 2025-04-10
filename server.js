require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const db = require("./models"); // tambahkan ini

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint awal
app.get('/', (req, res) => {
    res.send('Auth Microservice is running');
});

// Routes
app.use('/api/auth', authRoutes);

// Sync database & start server
const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true }) // Bisa ubah ke { force: true } untuk testing awal
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () => {
        console.log(`Auth service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal sync database:", err);
  });
