'use strict';

// import express and initialise router
const express = require('express');

const router = express.Router();

// import controllers
const welcome = require('./controllers/welcome.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const category = require('./controllers/category.js');

// connect routes to controllers
router.get('/', welcome.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/category/:id', category.index);
router.get('/category/:id/deleteGame/:gameid', category.deleteGame);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.post('/category/:id/addgame', category.addGame);
router.post('/dashboard/addcategory', dashboard.addCategory);

// export router module
module.exports = router;