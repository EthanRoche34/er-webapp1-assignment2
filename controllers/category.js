"use strict";

const logger = require("../utils/logger");
const categoryStore = require("../models/category-store");
const uuid = require("uuid");

const category = {
  index(request, response) {
    const categoryId = request.params.id;
    logger.debug("Category id = " + categoryId);
    const viewData = {
      title: "Category",
      category: categoryStore.getCategory(categoryId)
    };
    response.render("category", viewData);
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
    };
    categoryStore.addGame(categoryId, newGame);
    response.redirect("/category/" + categoryId);
  }
};

module.exports = category;
