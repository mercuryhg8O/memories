const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
    tag :{
        type: String,
        unique: true,
        required: true,
        index: true
    },
})


module.exports = tagsSchema;