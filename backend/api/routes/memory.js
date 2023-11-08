const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Memory = require('../models/memory')
router.post('/', (req, res, next) => {
    const memory = new Memory({
        _id: new mongoose.Schema.ObjectId,
        account: req.account,
        bodyText: req.body.bodyText,
        tags: req.body.tags,
        visibility: req.body.visibility,
        likes: 0,
        // location:,
    })
    memory.save().exec().then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
});
router.get('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling GET requests to /memory'
    })
});

router.get('/:memoryID', (req, res, next) => {
    const id = req.params.memoryID;
    res.status(201).json({
        message: 'Retrieved ID',
        id: id
    })
});



router.delete('/:memoryID')

module.exports = router;