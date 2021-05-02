'use strict';

// import all required modules
const logger = require('../utils/logger');
const categoryStore = require('../models/category-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');

    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: 'RPG Archives App Dashboard',
        categories: categoryStore.getUserCategories(loggedInUser.id),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      // render the dashboard view and pass through the data
      logger.info('about to render' + viewData.categories);
      response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  deleteCategory(request, response) {
    const categoryId = request.params.id;
    logger.debug(`Deleting category ${categoryId}`);
    categoryStore.removeCategory(categoryId);
    response.redirect('/dashboard');
  },

  addCategory(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newCategory = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      games: []
    };
    logger.debug('Creating a new Category' + newCategory);
    categoryStore.addCategory(newCategory, function () {
      response.redirect('/dashboard');
    });
  }
}
// export the dashboard module
module.exports = dashboard;