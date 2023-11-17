const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const searchController = require('../controllers/search');
const Memory = require('../models/memory');
const Account = require('../models/account');
const Tags = require('../models/tags');

router.get('/user', searchController.searchUser);

router.get('/place', searchController.searchPlace);

router.get('/tags', searchController.searchTags);

module.exports = router;