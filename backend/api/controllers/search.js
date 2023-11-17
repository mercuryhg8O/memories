const mongoose = require('mongoose');
const Account = require('../models/account');
const UserID = require('../models/userid');

exports.searchUser = (req, res, next) => {
    if(req.query.constructor === Object && Object.keys(req.query).length === 0) {
        res.status(404).json({"Error": "Got Nothing"});    
      }
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
        //Temporarily no other function
        res.status(500).json({"Error": "Currently Not Supported"});
    }
}

exports.searchPlace = (req, res, next) => {
    //Needs some garbage data for location
    return null;
}
exports.searchTags = (req, res, next) => {
    return null;
}
