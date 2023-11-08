const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const memory = {
        bodyText: req.body.bodyText,
        tags: req.body.tags,
        visibility: req.body.visibility,
        likes: 0,
        // location:,
        // account:,
    }
    res.status(201).json({
        message: 'Handling POST requests to /memory',
        createdMemory: memory
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