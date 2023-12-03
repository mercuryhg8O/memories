const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const Memory = require('../models/memory');
const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const memoryController = require('../controllers/memory');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../uploads');
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


//CREATE A MEMORY
router.post('/', upload.single('image'), memoryController.createMemory);

//LIKING A MEMORY
router.post('/like', memoryController.like); 

//UNLIKING A MEMORY
router.post('/unlike', memoryController.unlike);

//GET ALL MEMORIES
router.get('/', memoryController.getAllMemories);

//GET A MEMORY BY ITS ID
// router.get('/:memoryID', memoryController.getById); 

// FINDING MEMORIES THAT ARE PUBLIC
router.get('/public', memoryController.getPublicMemories);

// FINDING MEMORIES FOR A SPECIFIC USER
// based on the specific user requesting, finding the posts for that user.
// if the two users are mutuals, they can view all memories besides private. if not, they can just view public memories
router.get('/:accountID/:self', memoryController.getUserMemories);

//DELETE A MEMORY
router.delete('/:memoryID', memoryController.delete);

module.exports = router;