const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Memory = require('../models/memory');
const Account = require('../models/account');
const Tags = require('../models/tags');

router.get('/', (req,res,next) => {

})

const searchUser = () => {
    
}

const searchPlace = () => {
    //Needs some garbage data for location
}
const searchTags = () => {

}
module.exports = router;