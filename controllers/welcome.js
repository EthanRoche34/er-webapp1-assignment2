'use strict';

// import all required modules
const logger = require('../utils/logger');
const categoryStore = require('../models/category-store.js')
const accounts = require ('./accounts.js');
const { multiply } = require('lodash');
const { getCategory } = require('../models/category-store.js');

// create welcome object
const welcome = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    // display confirmation message in log
    logger.info('welcome rendering');

    if(loggedInUser){
    // statistics calculations
    const categories = categoryStore.getAllcategories();
    let numCategories = categories.length;
    let numGames = 0;
    for (let item of categories) {
      numGames += item.games.length;
  }
  let avgGames = (numGames / numCategories);
  const usrCategories = categoryStore.getUserCategories(loggedInUser.id);
  let numOfUserCategories = usrCategories.length;

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the RPG Archives',
      totalCategories: numCategories,
      totalGames: numGames,
      averageGames: avgGames,
      userCategories: numOfUserCategories,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };

    // render the welcome view and pass through the data
    response.render('welcome', viewData);
  }
  else response.redirect('/');
},
};

// export the welcome module
module.exports = welcome;