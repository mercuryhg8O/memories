const bcrpyt = require('bcrypt');
const multer = require('multer');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();

const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const accountController = require('../controllers/account');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../pfp');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


//CREATING A MEMORIES ACCOUNT
router.post('/signup', upload.single('pfp'), accountController.signup);

//LOG INTO A MEMORY ACCOUNT
router.post('/login', accountController.login);

//GET MUTUALS OF A MEMORY ACCOUNT
router.get('/:accountID/mutuals', accountController.getMutuals);

//EDIT A MEMORY ACCOUNT
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