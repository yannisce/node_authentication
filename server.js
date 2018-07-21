const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const app         = express();
const sessions    = require('client-sessions');
const bcrypt      = require('bcryptjs');
const User        = require('./models/user');
const userInfo    = require('./middleware/user_info');

// Requiring routes
const index             = require('./routes/index');
const dashboard         = require('./routes/dashboard');

// Connect to mongoDB
mongoose.connect('mongodb://localhost/auth');
mongoose.connection.once('open', () => {
  console.log('Connection to db has been made...');
}).on('error', () => {
  console.error.bind(console, 'Connection error:');
});

//  =====================
//  APP CONFIG
//  =====================
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// Cookie Setup
app.use(sessions({
  cookieName: 'session',
  secret: 'remaof982354zxaws',
  duration: 30 * 60 * 1000 // 30 mins
}));
// Middleware
app.use(userInfo);

// Routes
app.use('/', index);
app.use('/dashboard',dashboard);

app.listen(3000, () => console.log('App started on port 3000...'));
