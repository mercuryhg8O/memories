const express = require('express');
const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const accountController = require('../controllers/account');

//CREATING A MEMORIES ACCOUNT
router.post('/signup', accountController.signup);

//LOG INTO A MEMORY ACCOUNT
router.post('/login', accountController.login);

//EDIT A MEMORY ACCOUNT
router.get('/:accountID/mutuals', accountController.getMutuals);

router.patch('/edit', accountController.edit);

//FOLLOW ANOTHER USER
router.post('/:accountID/:self/follow', accountController.follow);

//UNFOLLOW A USER
router.post('/:accountID/:self/unfollow', accountController.unfollow);

//GET ALL ACCOUNTS
router.get('/', accountController.getAllAccounts);

//GET AN ACCOUNT BY ITS ID
router.get('/:accountID', accountController.getById);

//DELETE AN ACCOUNT
router.delete('/:accountID/delete', accountController.delete);

module.exports = router;