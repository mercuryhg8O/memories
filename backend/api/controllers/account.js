const Account = require('../models/account');
const UserID = require('../models/userid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcrypt');

//SIGN UP CONTROLLER
exports.signup = (req, res, next) => {
    Account.find({ email: req.body.email })
        .exec()
        .then(account => {
            if (account.length >= 1) {
                return res.status(409).json({
                    message: 'An account with this email already exist'
                });
            } else {
                //Hash the password
                bcrpyt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        //Generate a new ID and create Account
                        newid().then(id => {
                            const account = new Account({
                                _id: new mongoose.Types.ObjectId(),
                                userid : id,
                                email: req.body.email,
                                password: hash,
                                username: req.body.username,
                                label: req.body.label,
                                bio: req.body.bio,
                                pfp: req.file.path,
                                verified: false,
                                followers: []
                            })
                            //Saves the newly created account and return the successfully created account
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
}

//LOGIN CONTROLLER
exports.login = (req, res, next) => {
    Account.find({ email: req.body.email })
    .exec()
    .then(account => {
        if (account.length < 1) {
            return res.status(404).json({
                message: "Email not found, user does not exist"
            });
        }
        //Check if the password is correct
        bcrpyt.compare(req.body.password, account[0].password, (err, result) => {
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
                    accountID: account[0]._id
                })
            }
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
}

//RETURNS ALL MEMORIES ACCOUNTS
exports.getAllAccounts = (req, res, next) => {
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
}

//GET ACCOUNT BY ID
exports.getById = (req, res, next) => {
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
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });  
}

//EDIT AN ACCOUNTS LABEL, USERNAME, 
exports.edit = (req, res, next) => {
    const id = req.params.accountId;
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
}

//FOLLOW ANOTHER USER 
exports.follow = (req, res, next) => {
    const accountID = req.params.accountID;
    console.log(req);
    const userID = req.params.self;

    //SEARCH FOR USER
    const account = Account.findById(accountID)
        .exec()
        .then(account => {
            if (!account) {
                return res.status(404).json({
                    message: "User Not Found",
                });
            }
            //CONFIRM YOU AREN'T ALREADY FOLLOWING THE USER
            const index = account.followers.indexOf(userID);
            console.log(index);
            if (index == -1) {
                account.followers.push(req.params.self);
                res.status(200).json({
                    account: account,
                    message: 'User Followed',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/memory/' + account._id
                    } 
                });
                account.save();
                // CHECK TO SEE IF THE USER YOU ARE FOLLOWING FOLLOWS YOU
                // IF SO, ADD BOTH USERS INTO EACH OTHERS MUTUALS
                me = Account.findById(userID)
                    .exec()
                    .then(me => {
                        const index1 = me.followers.indexOf(accountID);
                        if (index1 != -1) {
                            me.mutuals.push(accountID);
                            Account.findByIdAndUpdate(accountID, {$push : {mutuals : userID}})
                            .exec();
                            me.save();
                        }
                    })

            } else {
                res.status(200).json({
                    message: "You're Already Following this User"
                })
            }   
        })
}

//UNFOLLOW A USER
exports.unfollow = (req, res, next) => {
    const userID = req.params.self;
    const accountID = req.params.accountID;
    //SEARCH FOR USER
    Account.findById(accountID)
    .exec()
    .then(account => {
        if (!account) {
            return res.status(404).json({
                message: "User Not Found",
            });
        } else {
            //CONFIRM YOU ARE FOLLOWING THE USER
            const index = account.followers.indexOf(userID);
            if (index == -1) {
                res.status(404).json({
                    message: "You aren't Following this User"
                })
            } else {
                account.followers.splice(index, 1);
                account.save();
                res.status(200).json({
                    account: account,
                    message: 'User Unfollowed',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/memory/' + account._id
                    } 
                })
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

// RETURN ALL MUTUALS OF THE USER THAT REQUESTED
exports.getMutuals = (req, res, next) => {
    const accountID = req.params.accountID;
    const account = Account.findById(accountID)
    .select()
    .exec()
    .then(account => {
        if (!account) {
            return res.status(404).json({
                message: "User Not Found",
            });
        } else {
            return res.status(200).json ({
                mutuals: account.mutuals,
                message: 'Retrieved Mutuals'
            })  
        }
    })
}

//DELETE ACCOUNT CONTROLLER
exports.delete = (req, res, next) => {
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
}

//GENERATE A NEW ID
const newid = async () => {
    const currentVal = await UserID.getCurrent();
    const newID = currentVal+1;
    UserID.updateOne({name : "Counter"}, {current : newID})
    .exec()
    .then(err => {
        if (err) {
            console.error(err);
          } 
        });
    return newID;
}

