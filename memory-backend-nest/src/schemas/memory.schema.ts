import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

const memorySchema = new mongoose.Schema({
    bodyText: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: true,
    },

    account: {
        type: mongoose.Schema.Types.ObjectId
    },
    
    tags: {
        type: [String],
    },

    likes: {
        type: Number,
        default: 0,
    }, 

    location: {
        latitude: Number,
        longitude: Number,
        required: true,
    },

    photo: {

    }, 

    visibility: {
        type: String,
        enum: {
            values: ['Private', 'Public', 'Mutuals'],
            message: '{Value} not supported'
        },
        required: true,
    }
})

export { memorySchema };