const mongoose = require('mongoose');
const Account = require('../models/account');

//SEARCH FOR USER BY ID, EMAIL, OR USERNAME
exports.searchUser = (req, res, next) => {
    if(req.query.constructor === Object && Object.keys(req.query).length === 0) {
        res.status(404).json({"Error": "Got Nothing"});    
      }
    const term = req.query.search;
    //USERID CANNOT BE NAN
    if(isNaN(term)){
        Account.find()
        .or([{email: {$regex: '.*' + term + '.*', $options: 'i'}},
            {username: {$regex: '.*' + term + '.*', $options: 'i'}}])
        .exec()
        .then(user =>
            res.status(200).json({user}))
        .catch(err =>
            res.status(500).json({err}));
    }
    //ALLOW USERID TO BE QUERIED IF NOT NAN
        else{
            Account.find()
            .or([{userid : term},
            {email: {$regex: '.*' + term + '.*', $options: 'i'}},
            {username: {$regex: '.*' + term + '.*', $options: 'i'}}])
            .exec()
            .then(user =>
                res.status(200).json({user}))
            .catch(err =>
                res.status(500).json({err}));
    }
}


