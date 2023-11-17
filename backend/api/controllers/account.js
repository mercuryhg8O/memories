const Account = require('../models/account');
const UserID = require('../models/userid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrpyt = require('bcrypt');

//STORE AN UPLOADED IMAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profilePics');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//FILTERS ANY FILES THAT AREN'T JPEG OR PNG
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image.png') {
        cb(null, false);
    } else {
        cb(null, true);
        res.status(404).json({
            message: "Only jpeg or png"
        })
    }
};

//UPLOAD IMAGE
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter
});

//SIGN UP CONTROLLER
exports.signup = (upload.single('profilePic'), (req, res, next) => {
    Account.find({ email: req.body.email })
        .exec()
        .then(account => {
            if (account.length >= 1) {
                return res.status(409).json({
                    message: 'An account with this email already exist'
                });
            } else {
                bcrpyt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        newid().then(id => {
                            const account = new Account({
                                _id: new mongoose.Types.ObjectId(),
                                userid : id,
                                email: req.body.email,
                                password: hash,
                                username: req.body.username,
                                label: req.body.label,
                                bio: req.body.bio,
                                profilePic: req.body.profilePic,
                                verified: false,
                            followers: []
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
})

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
    const accountID = req.post.accountID;
    console.log(req);
    const userID = req.post.self;
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
                account.followers.push(req.post.self);
                account.save();
                res.status(200).json({
                    account: account,
                    message: 'User Followed',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/memory/' + account._id
                    } 
                });
                me = Account.findById(userID)
                    .exec()
                    .then(me => {
                        const index1 = me.followers.indexOf(accountID);
                        if (index1 != -1) {
                            me.mutuals.push(accountID);
                            me.save();
                            account.mutuals.push(userID);
                            account.save();
                        }
                    })
            } else {
                res.status(404).json({
                    message: "You're Already Following this User"
                })
            }   
        })
}

//UNFOLLOW A USER
exports.unfollow = (req, res, next) => {
    const userID = req.post.self;
    const accountID = req.post.accountID;
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

//Generate new ID for user
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

