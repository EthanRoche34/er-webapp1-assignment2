'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}
const categoryStore = {

  store: new JsonStore('./models/category-store.json', { categoryCollection: [] }),
  collection: 'categoryCollection',

  getAllcategories() {
    return this.store.findAll(this.collection);
  },

  getCategory(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addCategory(category, response) {
    category.picture.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          category.picture = result.url;
          response();
        });
      }
    });
  this.store.add(this.collection, category);
},

  removeCategory(id) {
    const category = this.getCategory(id);
    this.store.remove(this.collection, category);
  },

  removeAllCategories() {
    this.store.removeAll(this.collection);
  },

  addGame(id, game, response) {
    const category = this.getCategory(id);
    const games = category.games;
    game.picture.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          game.picture = result.url;
          response();
        });
      }
    });
    games.push(game);
  },

  removegame(id, gameId) {
    const category = this.getCategory(id);
    const games = category.games;
    _.remove(games, { id: gameId});
  },

  editGame(id, gameId, updatedGame) {
    const category = this.getCategory(id);
    const games = category.games;
    const index = games.findIndex(game => game.id === gameId);
    games[index].title = updatedGame.title;
    games[index].developer = updatedGame.developer;
    games[index].release = updatedGame.release;
  },

  getUserCategories(userid) {
    return this.store.findBy(this.collection, { userid: userid});
  },
};

module.exports = categoryStore;