const mongoose = require('mongoose');

const visibility = Object.freeze({
    Private: 'Private',
    Public: 'Public',
    Mutuals: 'Mutuals',
    Group: 'Group'
});

const memorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
    bodyText: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: true,
    },
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    location: {
        // required: true,
    },
    images: {

    },
    visibility: {
        label: {
            type: String,
            enum: Object.values(visibility),
            required: true
        },
    }
})

module.exports = mongoose.model('memory', memorySchema);