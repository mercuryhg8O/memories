const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Memory = require('../models/memory');
const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const memoryController = require('../controllers/memory')

router.post('/', memoryController.createMemory, (req, res, next) => {
    console.log(req.file);
    
});

router.get('/', memoryController.getAllMemories);

router.get('/:memoryID', (req, res, next) => {
    const id = req.params.memoryID
    const memory = Memory.findById(id)
        .exec()
        .then(memory => {
            res.status(200).json({
                memory: memory,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/memory'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/like', (req, res, next) => {
    const memoryID = req.body.memoryID;
    const accountID = req.userData.id;
    const memory = Memory.findById(memoryID)
        .exec()
        .then(memory => {
            if (!memory) {
                return res.status(404).json({
                    message: "Memory Not Found",
                });
            }
            const index = memory.likedBy.indexOf(accountID);
            console.log(index);
            if (index == -1) {
                memory.likedBy.push(accountID);
                memory.save();
                // memory.likes++;
                res.status(200).json({
                    memory: memory,
                    message: 'Memory Liked',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/memory/' + memory._id
                    } 
                });
            } else {
                res.status(404).json({
                    message: "User Already Liked Memory"
                })
            }   
        })
})

router.post('/unlike', (req, res, next) => {
    const memoryID = req.body.memoryID;
    const accountID = req.userData.accountID;
    const memory = Memory.findById(memoryID)
    .exec()
    .then(memory => {
        if (!memory) {
            return res.status(404).json({
                message: "Memory Not Found",
            });
        } else {
            const index = memory.likedBy.indexOf(accountID);
            if (index == -1) {
                res.status(404).json({
                    likedBy: memory.likedBy,
                    accountID: accountID,
                    message: "User Never Liked Memory"
                })
            } else {
                memory.likedBy.splice(index, 1);
                memory.save();
                res.status(200).json({
                    memory: memory,
                    message: 'Memory Unliked',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/memory/' + memory._id
                    } 
                })
                // memory.likes--;
            }
        }
    })   
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

router.delete('/:memoryID', (res, req, next) => {
    const id = req.params.memoryID;
    Memory.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Memory Deleted',
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

module.exports = router;