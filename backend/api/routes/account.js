const express = require('express');
const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Account = require('../models/account');
const checkAuth = require('../auth/check-auth');
const useridCount = require('../models/userid');
    
router.post('/signup', (req, res, next) => {
    Account.find({ email: req.query.email })
        .exec()
        .then(account => {
            if (account.length >= 1) {
                return res.status(409).json({
                    message: 'An account with this email already exist'
                });
            } else {
                bcrpyt.hash(req.query.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        newid().then(id => {
                            const account = new Account({
                                _id: new mongoose.Types.ObjectId(),
                                userid: id,
                                email: req.query.email,
                                password: hash,
                                username: req.query.username,
                                label: req.query.label,
                                bio: req.query.bio,
                                profilePic: req.query.profilePic,
                                verified: false
                            })
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
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post('/login', (req, res, next) => {
    Account.find({ email: req.query.email })
    .exec()
    .then(account => {
        if (account.length < 1) {
            return res.status(404).json({
                message: "Email not found, user does not exist"
            });
        }
        bcrpyt.compare(req.query.password, account[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: account[0].email,
                        id: account[0]._id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch()
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
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.get('/:accountID', (req, res, next) => {
    const id = req.params.accountID;
    Account.findOne({userid : id})
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json({ doc });
            } else {
                res.status(404).json({
                    message: "No found entry found for provided ID"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });    
});

router.patch('/:accountID', checkAuth, (req, res, next) => {
    const id = req.params.accountID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Account.updateOne({ userid : id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Account Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/account/' + result.userid
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

router.delete('/:accountID', checkAuth, (req, res, next) => {
    const id = req.params.accountID;
    Account.deleteOne({ userid: id })
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

//Generate new ID for user
const newid = async () =>{
    const currentVal = await useridCount.getCurrent();
    const newID = currentVal+1;
    useridCount.updateOne({name : "Counter"}, {current : newID})
    .exec()
    .then(err => {
        if (err) {
            console.error(err);
          } 
    });
    return newID;
}


module.exports = router;