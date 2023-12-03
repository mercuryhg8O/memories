const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const searchController = require('../controllers/search');


//SEARCH FOR USERS
router.get('/user', searchController.searchUser);
module.exports = router;