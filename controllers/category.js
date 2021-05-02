"use strict";

const logger = require("../utils/logger");
const categoryStore = require("../models/category-store");
const uuid = require("uuid");
const accounts = require('./accounts.js');

const category = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const categoryId = request.params.id;
    logger.debug("Category id = " + categoryId);
    if (loggedInUser) {
      const viewData = {
        title: "Category",
        category: categoryStore.getCategory(categoryId),
        fullName: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      response.render("category", viewData);
    }
    else response.redirect('/');
  },
  deleteGame(request, response) {
    const categoryId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug(`Deleting game ${gameId} from category ${categoryId}`);
    categoryStore.removegame(categoryId, gameId);
    response.redirect("/category/" + categoryId);
  },

  addGame(request, response) {
    const categoryId = request.params.id;
    const category = categoryStore.getCategory(categoryId);
    const newGame = {
      id: uuid(),
      title: request.body.title,
      developer: request.body.developer,
      release: request.body.release,
      picture: request.files.picture
    };
    logger.debug("Adding a game: " + newGame);
    categoryStore.addGame(categoryId, newGame, function() {
      response.redirect("/category/" + categoryId);
    });
  },

  updateGame(request, response) {
    const categoryId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug("Updating Game" + gameId);
    const updatedGame = {
      title: request.body.title,
      developer: request.body.developer,
      release: request.body.release,
      picture: request.body.picture
    }
    categoryStore.editGame(categoryId, gameId, updatedGame);
    response.redirect('/category/' + categoryId);
  }
};

module.exports = category;
