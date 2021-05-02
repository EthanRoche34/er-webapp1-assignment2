'use strict';

// import all required modules
const logger = require('../utils/logger');
const studioStore = require('../models/studio-store.js');
const accounts = require('./accounts.js');
// create about object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {

      // display confirmation message in log
      logger.info('about rendering');

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: 'About the RPG Archives',
        studio: studioStore.getStudio(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };

      // render the about view and pass through the data
      response.render('about', viewData);
    }
    else response.redirect('/');
  },
};

// export the about module
module.exports = about;