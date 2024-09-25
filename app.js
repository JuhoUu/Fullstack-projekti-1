const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  // For AJAX message route
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Import routes (if separated into 'routes' folder)
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
