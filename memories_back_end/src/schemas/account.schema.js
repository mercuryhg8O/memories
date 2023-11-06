const mongoose = require('mongoose');

const Account = new mongoose.Schema({
    email: {
        type: String,
        unique : true,
        required : true
        },
    verification : Boolean,
    accountId : {
        type: Number,
        unique: true,
        required: true
        },

    username : String,
    bio : String,
    password : String,
    profilepic : String,
    label : String
});

const AccountSchema = mongoose.model('accounts', Account, 'accounts');

module.exports = AccountSchema;