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
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                memory: docs.map(doc => {
                    return {
                        id: doc._id,
                        account: doc.accountID,
                        tags: doc.tags,
                        images: doc.images,
                        likes: doc.likes,
                        visibility: doc.visibility
                    }
                }),
                request: {
                    type: "GET",
                    url: 'http://localhost/3000/memory/' + docs._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
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

// FINDING MEMORIES THAT ARE PUBLIC
router.get('/public', (req, res, next) => {
    Memory.find()
        .where('visibility').equals("Public")
        .select('_id accountID bodyText tags images likes visibility')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                memory: docs.map(doc => {
                    return {
                        id: doc._id,
                        account: doc.accountID,
                        tags: doc.tags,
                        images: doc.images,
                        likes: doc.likes,
                        visibility: doc.visibility
                    }
                }),
                request: {
                    type: "GET",
                    url: 'http://localhost/3000/memory/' + docs._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

// FINDING MEMORIES FOR A SPECIFIC USER
// based on the specific user requesting, finding the posts for that user.
// if the two users are mutuals, they can view all memories besides private. if not, they can just view public memories
router.get('/:accountID/:self', (req, res, next) => {
    const id = req.params.accountID;
    const account1 = Account.findById(id)
    .exec()
    .then(account1 => {
        index1 = account1.followers.indexOf(id);
        account2 = Account.findById(req.params.self)
        .exec()
        .then(account2 => {
            index2 = account2.followers.indexOf(req.params.self);
            if (index1 != -1 && index2 != -1) {
                Memory.find()
                .where('accountID').equals(id)
                .where('visibility').equals("Public")
                .where('visibility').equals("Mutuals")
                .select('_id accountID bodyText tags images likes visibility')
                .exec()
                .then(docs => {
                    res.status(200).json({
                        count: docs.length,
                        memory: docs.map(doc => {
                            return {
                                id: doc._id,
                                account: doc.accountID,
                                tags: doc.tags,
                                images: doc.images,
                                likes: doc.likes,
                                visibility: doc.visibility
                            }
                        }),
                        request: {
                            type: "GET",
                            url: 'http://localhost/3000/memory/' + docs._id
                        }
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            } else {
                Memory.find()
                .where('accountID').equals(id)
                .where('visibility').equals("Public")
                .select('_id accountID bodyText tags images likes visibility')
                .exec()
                .then(docs => {
                    res.status(200).json({
                        count: docs.length,
                        memory: docs.map(doc => {
                            return {
                                id: doc._id,
                                account: doc.accountID,
                                tags: doc.tags,
                                images: doc.images,
                                likes: doc.likes,
                                visibility: doc.visibility
                            }
                        }),
                        request: {
                            type: "GET",
                            url: 'http://localhost/3000/memory/' + docs._id
                        }
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })
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