'use strict';

// import all required modules
const logger = require('../utils/logger');
const studioStore = require('../models/studio-store.js');

// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('about rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'About the RPG Archives',
      studio: studioStore.getStudio(),
    };
    
    // render the about view and pass through the data
    response.render('about', viewData);
  },
};

// export the about module
module.exports = about;