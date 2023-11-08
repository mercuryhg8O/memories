const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Account = require('../models/account')
    
router.post('/', (req, res, next) => {
    const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        label: req.body.label,
        bio: req.body.bio,
        profilePic: req.body.profilePic,
        verified: false, 
    });
    account.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /account',
            createdAccount: result
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
    Account.find()
        .select('')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                accounts: 
            }
            if (docs.length >= 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.get('/:accountID', (req, res, next) => {
    const id = req.params.accountID;
    Account.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json({ doc });
            } else {
                res.status(404).json({
                    message: "No found entry found for provided ID"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        }
    );    
});

router.get('/:username', (req, res, next) => {
    const username = req.params.username;
    Account.findByUsername(username)
        ccount.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            res.status(200).json({ doc });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });    
});

router.patch('/:accountID', (req, res, next) => {
    const id = req.params.accountID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Account.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.delete('/:accountID', (req, res, next) => {
    const id = req.params.accountID;
    Account.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;