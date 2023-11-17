const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Memory = require('../models/memory');
const Account = require('../models/account');
const Tags = require('../models/tags');

router.get('/', (req,res,next) => {
    const search = req.query.search;
    searchUser(search);
    searchPlace(search);
    searchPlace(search);
})

const searchUser = (req) => {
    return null;
}

const searchPlace = (req) => {
    //Needs some garbage data for location
    return null;
}
const searchTags = (req) => {
    return null;
}
module.exports = router;