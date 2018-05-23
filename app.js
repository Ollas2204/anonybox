const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

// Setup express app
const app = express();

// Setup logger 
app.use(logger('dev'));

// Setup session using cookie
app.use(session({
  secret: 'strawhat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 180000
  }
}));

// Set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// Handle all incoming request to this route
app.use('/', routes);

// Start the server
const server = app.listen(3000, (req, res) => {
  console.log(`Server running on port ${server.address().port}`);
});

