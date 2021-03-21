'use strict';

// import all required modules
const logger = require('../utils/logger');

// create welcome object
const welcome = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('welcome rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the RPG Archives',
    };

    // render the welcome view and pass through the data
    response.render('welcome', viewData);
  },
};

// export the welcome module
module.exports = welcome;