//set DEBUG=* & node app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const route = require('./src/routes/index');
const response = require('./src/lib/response');
const app = express();
const appConfig = require('./src/config/appConfig');

//Handle request
app.use(session({
    secret: 'avevgretaswdef23wef23',
    saveUninitialized: false, // don't create session exituntil something stored,
    resave: true // don't save session if unmodified
}));
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(response.trimParams);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to API Project" });
});

// This is our route middleware
app.use('/api', route);

// Error handling
app.use(response.handleError);

// Handle response
app.use(response.handleSuccess);
 
// Connecting to the database
mongoose.connect(appConfig.DBURL, {
     useNewUrlParser: true
 }).then(() => {
     console.log("Successfully connected to the database");
 }).catch(err => {
     console.log('Could not connect to the database. Exiting now...', err);
     process.exit();
});

app.listen(appConfig.PORT, () => {
    console.log('Server listening on port', appConfig.PORT);
});
  
module.exports = app;
