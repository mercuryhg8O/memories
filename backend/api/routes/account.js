const express = require('express');
const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const accountController = require('../controllers/account');
    
router.post('/signup', accountController.signup);

router.post('/login', accountController.login);

router.get('/', accountController.getAllAccounts);

router.get('/:accountID', accountController.getById);

router.patch('/:accountID', checkAuth, accountController.edit);

router.patch('/:accountID/follow', checkAuth, accountController.follow);

router.patch('/:accountID/unfollow', checkAuth, accountController.unfollow);

router.delete('/:accountID', checkAuth, accountController.delete);

//Generate new ID for user
const newid = async () =>{
    const currentVal = await useridCount.getCurrent();
    const newID = currentVal+1;
    useridCount.updateOne({name : "Counter"}, {current : newID})
    .exec()
    .then(err => {
        if (err) {
            console.error(err);
          } 
    });
    return newID;
}


module.exports = router;