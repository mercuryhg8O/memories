const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image.png') {
        cb(null, false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter
});

const Memory = require('../models/memory');
const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const Tags = require('../models/tags');

router.post('/', checkAuth, upload.single('images'), (req, res, next) => {
    console.log(req.file);
    const tags = req.body.tags.split(',');
    for(i=0; i<tags.length; i++){
        Tags.findOne({tag : tags[i]}, (err, result) => {
            if(err){
             return;   
            }
            if(!result){
                Tags.save({tag: tags[i]});
            }
        })
    }
    const memory = new Memory({
        _id: new mongoose.Types.ObjectId(),
        accountID: req.body.accountID,
        bodyText: req.body.bodyText,
        visibility: req.body.visibility,
        tags: tags,
        likes: 0,
        // images: req.file.path
    });
    memory.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created memory successfully',
            createdMemory: {
                _id: result._id,
                bodyText: result.bodyText,
                accountID: result.accountID,
                visibility: result.visibility,
                likes: result.likes,
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
});

router.get('/', (req, res, next) => {
    Memory.find()
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
                    url: 'http://localhost:3000/memory/' + doc._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:memoryID', (req, res, next) => {
    const id = req.params.memoryID
    Memory.findById(id)
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
    res.status(201).json({
        message: 'Retrieved ID',
        _id: id
    });
});

router.patch('/:memoryID/like', checkAuth, (req, res, next) => {
    const id = req.params.memoryID;
    const memory = Memory.findById(id);
    if (!memory) {
        return res.status(404).json({
            message: "Memory Not Found",
        })
    }
    memory.updateOne({ _id: id },{ likes: (memory.likes + 1) })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Memory Liked',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/memory/' + result._id
                } 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.patch('/:memoryID/unlike', checkAuth, (res, req, next) => {
    const id = req.params.memoryID;
    const memory = memory.findById(id);
    if (!memory) {
        return res.status(404).json({
            message: "Memory Not Found",
        })
    }
    memory.updateOne({ _id: id }, { likes: (memory.likes - 1) })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Memory Unliked',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/memory/' + result._id
                } 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.delete('/:memoryID', checkAuth, (res, req, next) => {
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