const express = require('express');
const mongoose = require('mongoose');
const Memory = require('../models/memory');
const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const memoryController = require('../controllers/memory');
const router = express.Router();

//CREATE A MEMORY
router.post('/:accountID', memoryController.createMemory);

//LIKING A MEMORY
router.post('/:memoryID/:accountID/like', memoryController.like); 

//UNLIKING A MEMORY
router.post('/:memoryID/:accountID/unlike', memoryController.unlike);

//GET ALL MEMORIES
router.get('/', memoryController.getAllMemories);

//GET A MEMORY BY ITS ID
router.get('/:memoryID', memoryController.getById); 

// FINDING MEMORIES THAT ARE PUBLIC
router.get('/public', memoryController.getPublicMemories);

// FINDING MEMORIES FOR A SPECIFIC USER
// based on the specific user requesting, finding the posts for that user.
// if the two users are mutuals, they can view all memories besides private. if not, they can just view public memories
router.get('/:accountID/:self', memoryController.getUserMemories);

//DELETE A MEMORY
router.delete('/:memoryID', memoryController.delete);

module.exports = router;