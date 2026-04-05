const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Set up base routes 
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/leads', require('./src/routes/leads.routes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: { status: 'OK' },
    error: null,
    meta: { timestamp: new Date().toISOString() }
  });
});

// Error handling middleware based on api-handlers.md
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    data: null,
    error: {
      code: "SERVER_ERROR",
      message: "Internal Server Error",
      details: err.message
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
