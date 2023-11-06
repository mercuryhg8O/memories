const mongoose = require('mongoose');


const Memory = new mongoose.Schema({

    bodyText :{
        type : String,
        required : true
    },
    accountId:{
        type: Number,
        required : true
    },
    tags: [String],
    likes: [Number],
    Location: String,
    Photos: String,
    memoryId: String,
    Visibility: String

});

const MemorySchema = mongoose.model('memories', Memory, 'memories');
module.exports = MemorySchema;


