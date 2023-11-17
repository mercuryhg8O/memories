const mongoose = require('mongoose');
const Account = require('../models/account');
const UserID = require('../models/userid');

exports.searchUser = (req, res, next) => {
    const term = req.query.search;
    //Check if the search term is a UserID
    if(!isNaN(term) && term.length == 4){ 
        const ID = Number(term);
        Account.findOne({userid : ID})
        .exec()
        .then(user =>
            res.status(200).json({user}));
    }
    else{
        
    }
}

exports.searchPlace = (req, res, next) => {
    //Needs some garbage data for location
    return null;
}
exports.searchTags = (req, res, next) => {
    return null;
}
