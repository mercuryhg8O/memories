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
            message: 'Created account successfully',
            createdAccount: {
                _id: result._id,
                email: result.email,
                username: result.username,
                label: result.label,
                bio: result.bio,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/account/' + result._id
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
    Account.find()
        .select('_id email username label bio')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                accounts: docs.map(doc => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        username: doc.username,
                        label: doc.label,
                        bio: doc.bio,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/account' + doc._id
                        }
                    }
                })
            };
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
        count.findById(id)
        .exec()
        .then(doc => {
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
            res.status(200).json({
                message: 'Account Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/account/' + result._id
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

router.delete('/:accountID', (req, res, next) => {
    const id = req.params.accountID;
    Account.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Account Deleted',
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