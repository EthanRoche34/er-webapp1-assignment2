// use javascript in strict mode
'use strict';

// import all required modules
const express = require("express");
const logger = require('./utils/logger');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// initialise project
const app = express();
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(fileUpload());

// static files output to public folder
app.use(express.static("public"));
// use handlebars as view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    uppercase: function(inputString) {
      return inputString.toUpperCase();
  },
  formatDate: function(date) {
    let dateCreated = new Date(date);
    let dateNum = dateCreated.getDate();
    let month = dateCreated.getMonth();
    let year = dateCreated.getFullYear();

    let months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let monthname = months[month];
    return `${monthname} ${dateNum}, ${year}`;
  },
  capitalise: function(word) {
    let capitalisedWord = word[0].toUpperCase() + word.slice(1);
    return capitalisedWord;
  },
  }
}));
app.set('view engine', '.hbs');

// import routes file and use this for routing
const routes = require('./routes');
app.use('/', routes);


// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info('Your app is listening on port ' + listener.address().port);
});