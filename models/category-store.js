'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const categoryStore = {

  store: new JsonStore('./models/category-store.json', { categoryCollection: [] }),
  collection: 'categoryCollection',

  getAllcategories() {
    return this.store.findAll(this.collection);
  },

  getCategory(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addCategory(category) {
    this.store.add(this.collection, category);
  },

  removeCategory(id) {
    const category = this.getCategory(id);
    this.store.remove(this.collection, category);
  },

  removeAllCategories() {
    this.store.removeAll(this.collection);
  },

  addGame(id, game) {
    const category = this.getCategory(id);
    category.games.push(game);
  },

  removegame(id, gameId) {
    const category = this.getCategory(id);
    const games = category.games;
    _.remove(games, { id: gameId});
  },
};

module.exports = categoryStore;