require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);

// Database
const db = require('./models');
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synchronized');
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth service running at http://localhost:${PORT}`);
});
