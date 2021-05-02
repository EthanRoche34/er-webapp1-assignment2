'use strict';

// import express and initialise router
const express = require('express');

const router = express.Router();

// import controllers
const welcome = require('./controllers/welcome.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const category = require('./controllers/category.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers
router.get('/welcome', welcome.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/category/:id', category.index);
router.get('/category/:id/deleteGame/:gameid', category.deleteGame);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.post('/category/:id/addgame', category.addGame);
router.post('/dashboard/addcategory', dashboard.addCategory);
router.post('/category/:id/updategame/:gameid', category.updateGame);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// export router module
module.exports = router;