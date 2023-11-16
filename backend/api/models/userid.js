const mongoose = require('mongoose');

const useridSchema = mongoose.Schema({
    name: String,
    current : Number
})

module.exports = mongoose.model('userid', useridSchema);