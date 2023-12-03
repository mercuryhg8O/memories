const express = require('express');
const mongoose = require('mongoose');
const Memory = require('../models/memory');
const Account = require('../models/account');
const router = express.Router();

//CREATE MEMORY CONTROLLER
exports.createMemory = (req, res, next) => {
    const memory = new Memory({
        _id: new mongoose.Types.ObjectId(),
        accountID: req.body.accountID,
        bodyText: req.body.bodyText,
        visibility: req.body.visibility,
        tags: req.body.tags,
        likes: 0,
        likedBy: [],
        latitude: req.body.latitude,
        longitude: req.body.longitude, 
        image: req.file.path,
    });

    memory.save()
        .then(result => {
        res.status(201).json({
            message: 'Created memory successfully',
            createdMemory: {
                _id: result._id,
                bodyText: result.bodyText,
                accountID: result.accountID,
                visibility: result.visibility,
                likes: result.likes,
                likedBy: result.likedBy,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/memory/' + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.getImage = (req, res, next) => {
    const id = req.params.memoryID;
    const memory = Memory.findById(id)
    .exec()
    .then(memory => {
        if (!memory) {
             return res.status(404).json({
                message: "Memory Not Found",
            });
        }
        const options = {
            root: path.join(__dirname)
        };
        if (memory.image != "C://Users//Michael//Documents//Memories//memories//uploads//i1Abv.png") {
            res.sendFile(memory.image);
        }
    })
    .catch()
}

//GET ALL MEMORIES
exports.getAllMemories = (req, res, next) => {
    Memory.find()
    .select('_id accountID bodyText tags image likes visibility')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            memory: docs.map(doc => {
                return {
                    id: doc._id,
                    account: doc.accountID,
                    tags: doc.tags,
                    image: doc.image,
                    likes: doc.likes,
                    visibility: doc.visibility, 
                    likedBy: doc.likedBy,
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

//GET A MEMORY BY ID
exports.getById = (req, res, next) => {
    const id = req.params.memoryID;
    const memory = Memory.findById(id)
    .exec()
    .then(memory => {
        res.status(200).json({
            memory: memory,
            request: {
                type: "GET",
                url: 'http://localhost/3000/memory'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

//LIKE A MEMORY
exports.like = (req, res, next) => {
    const memoryID = req.body.memoryID;
    const accountID = req.body.accountID;
    //SEARCH FOR MEMORY
    const memory = Memory.findById(memoryID)
    .exec()
    .then(memory => {
        if (!memory) {
            return res.status(404).json({
                message: "Memory Not Found",
            });
        }
        //CONFIRM YOU HAVEN'T ALREADY LIKED THE MEMORY
        const index = memory.likedBy.indexOf(accountID);
        console.log(index);
        if (index == -1) {
            //ADDED TO LIST OF USERS WHO LIKED THE MEMORY
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
}

//UNLIKE A MEMORY
exports.unlike = (req, res, next) => {
    const memoryID = req.body.memoryID;
    const accountID = req.body.accountID;
    //FIND MEMORY
    const memory = Memory.findById(memoryID)
    .exec()
    .then(memory => {
        if (!memory) {
            return res.status(404).json({
                message: "Memory Not Found",
            });
        } else {
            //CONFIRM YOU HAVE ALREADY LIKED IT
            const index = memory.likedBy.indexOf(accountID);
            if (index == -1) {
                res.status(404).json({
                    likedBy: memory.likedBy,
                    accountID: accountID,
                    message: "User Never Liked Memory"
                })
            } else {
                //REMOVE USER FROM LIST OF USERS WHO LIKED THE MEMORY
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
}

//GET ALL PUBLIC MEMORIES
exports.getPublicMemories = (req, res, next) => {
    Memory.find()
        .where('visibility').equals("Public")
        .select('_id accountID bodyText tags image likes visibility')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                memory: docs.map(doc => {
                    return {
                        id: doc._id,
                        account: doc.accountID,
                        tags: doc.tags,
                        image: doc.image,
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

//GET THE PUBLIC AND MUTUAL MEMORIES OF ANOTHER USER
exports.getUserMemories = (req, res, next) => {
    const id = req.params.accountID;
    const account1 = Account.findById(id)
    .exec()
        .then(account1 => {
            if (!account1) {
                return res.status(404).json({
                    message: "Account Not Found",
                });
            }
            index1 = account1.followers.indexOf(id);
            const account2 = Account.findById(req.params.self)
            .exec()
            .then(account2 => {
                if (!account2) {
                    return res.status(404).json({
                        message: "Account Not Found",
                    });
                }   
                index2 = account2.followers.indexOf(req.params.self);
                if (index1 != -1 && index2 != -1) {
                    Memory.find()
                    .where('accountID').equals(id)
                    .where('visibility').equals("Public")
                    .where('visibility').equals("Mutuals")
                    .select('_id accountID bodyText tags image likes visibility')
                    .exec()
                    .then(docs => {
                        res.status(200).json({
                            count: docs.length,
                            memory: docs.map(doc => {
                                return {
                                    id: doc._id,
                                    account: doc.accountID,
                                    tags: doc.tags,
                                    image: doc.image,
                                    likes: doc.likes,
                                    visibility: doc.visibility,
                                    latitude: doc.latitude,
                                    longitude: doc.longitude
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
                    .select('_id accountID bodyText tags image likes visibility')
                    .exec()
                    .then(docs => {
                        res.status(200).json({
                            count: docs.length,
                            memory: docs.map(doc => {
                                return {
                                    id: doc._id,
                                    account: doc.accountID,
                                    tags: doc.tags,
                                    image: doc.image,
                                    likes: doc.likes,
                                    visibility: doc.visibility,
                                    latitude: doc.latitude,
                                    longitude: doc.longitude
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
}

//DELETE A MEMORY
exports.delete = (res, req, next) => {
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
}