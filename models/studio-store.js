'use strict';

const JsonStore = require('./json-store');

const studioStore = {

  studio: require('./studio-store.json').studio,

    getStudio() {
      return this.studio;
    }
  

};

module.exports = studioStore;