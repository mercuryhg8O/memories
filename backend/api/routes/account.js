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

router.patch('/edit', accountController.edit);

router.post('/:accountID/:self/follow', accountController.follow);

router.post('/:accountID/:self/unfollow', accountController.unfollow);

router.delete('/:accountID/delete', accountController.delete);

module.exports = router;