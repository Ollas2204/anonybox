const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
const errorHandlers = require('./handlers/errorHandlers');

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

// Set flash
app.use(flash());


// Set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// Set global variables in respond
app.use((req,res,next)=>{
  res.locals.flashes = req.flash();
  res.locals.page = null;
  res.locals.body = null;
  res.locals.username = req.session.username;
  res.locals.userId = req.session.userId;
  next();
})

// Handle all incoming request to this route
app.use('/', routes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

// Start the server
const server = app.listen(3000, (req, res) => {
  console.log(`Server running on port ${server.address().port}`);
});

