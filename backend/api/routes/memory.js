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
const memoryController = require('../controllers/memory')

router.post('/', checkAuth, upload.single('images'), memoryController.createMemory, (req, res, next) => {
    console.log(req.file);
    
});

router.get('/', checkAuth, memoryController.getAllMemories);

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

router.patch('/like', checkAuth, (req, res, next) => {
    const memoryID = req.body.memoryID;
    const accountID = req.body.accountID;
    const memory = Memory.findById(memoryID);
    if (!memory) {
        return res.status(404).json({
            message: "Memory Not Found",
        })
    }
    const account = Account.findById(accountID);
    if (!account) {
        return res.status(404).json({
            message: "User Not Found",
        })
    } 
    const index = memory.likedBy.indexOf(account);
    if (index == -1) {
        memory.likedBy.push(accountID).then(result => {
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
        memory.likes++;
    } else {
        res.status(404).json({
            message: "User Already Liked Memory"
        })
    }   
})

router.patch('/:memoryID/:accountID/unlike', checkAuth, (res, req, next) => {
    const memoryID = req.params.memoryID;
    const accountID = req.params.accountID;
    const memory = Memory.findById(memoryID);
    if (!memory) {
        return res.status(404).json({
            message: "Memory Not Found",
        })
    }
    const account = Account.findById(accountID);
    if (!account) {
        return res.status(404).json({
            message: "User Not Found",
        })
    } 
    const index = memory.likedBy.indexOf(accountID);
    if (index == -1) {
        res.status(404).json({
            message: "User Never Liked Memory"
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    } else {
        memory.likedBy.push(account).then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Memory Liked',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/memory/' + result._id
                } 
            });
        })
        memory.likes++;
    } 
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