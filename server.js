const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const emailRoutes = require('./routes/emailroutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Serve static files (CSS, JS, images) from public directory
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // For parsing application/json
// Use body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));

// Email routes
app.use('/', emailRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Handle 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  // Or just send a simple message if you don't have a 404 page:
  // res.status(404).send('Page not found');
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
