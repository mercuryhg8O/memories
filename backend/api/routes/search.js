const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const searchController = require('../controllers/search');


//SEARCH FOR USERS
router.get('/user', searchController.searchUser);

//SEARCH FOR PLACE **UNIMPLEMENTED**
router.get('/place', searchController.searchPlace);

//SEARCH FOR TAG **UNIMPLEMENTED**
router.get('/tags', searchController.searchTags);

module.exports = router;