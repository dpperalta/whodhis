const express = require('express');

const app = express();

// Importing routes
const vaccinesWhodrugRoutes = require('./vaccinesWhodrug');

// Using routes
app.use('/api/vaccines-whodrug', vaccinesWhodrugRoutes);

module.exports = app;