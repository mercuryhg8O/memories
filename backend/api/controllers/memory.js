const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();
const Memory = require('../models/memory');
const Account = require('../models/account');


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

const success = (position) => {
    coord = position.coords;
}

const error = (err, (req, res, next) => {
    res.status(404).json({
        message: "Could not retrieve location"    
    })
})

exports.createMemory = (upload.array('images', 2), (req, res, next) => {
    console.log(req);
    const memory = new Memory({
        _id: new mongoose.Types.ObjectId(),
        accountID: req.userData.id,
        bodyText: req.body.bodyText,
        visibility: req.body.visibility,
        tags: req.body.tags,
        likes: 0,
        likedBy: [],
        location: navigator.geolocation.getCurrentPosition(success, error),
        images: req.file.path
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
})

exports.getAllMemories = (req, res, next) => {
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
                        visibility: doc.visibility, 
                        likedBy: doc.likedBy
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

exports.getById = (res, req, next) => {

}

exports.like = (req, res, next) => {

}

exports.unlike = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    
}