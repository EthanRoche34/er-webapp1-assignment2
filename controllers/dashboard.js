'use strict';

// import all required modules
const logger = require('../utils/logger');
const categoryStore = require('../models/category-store.js');
const uuid = require('uuid');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'RPG Archives App Dashboard',
      categories: categoryStore.getAllcategories(),
    };

    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.categories);
    response.render('dashboard', viewData);
  },
  deleteCategory(request, response) {
    const categoryId = request.params.id;
    logger.debug(`Deleting category ${categoryId}`);
    categoryStore.removeCategory(categoryId);
    response.redirect('/dashboard');
  },
  
    addCategory(request, response) {
    const newCategory = {
      id: uuid(),
      title: request.body.title,
      games: [],
    };
    categoryStore.addCategory(newCategory);
    response.redirect('/dashboard');
  },
  
};

// export the dashboard module
module.exports = dashboard;