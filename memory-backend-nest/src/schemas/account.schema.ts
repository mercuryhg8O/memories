//import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

//export type AccountDocument = HydratedDocument<Account>;

const Account = new mongoose.Schema({
    email: {
        type: String,
        unique : true 
        },
    verification : Boolean,
    accountId : {
        type: Number,
        unique: true
        },

    username : String,
    bio : String,
    password : String,
    profilepic : String,
    label : String
})

export const AccountModel = mongoose.model('accounts', Account);



/*@Schema()
export class Account {
    @Prop()
    email: string;

    @Prop()
    verification : boolean;

    @Prop()
    accountId : Number;

    @Prop()
    username : string;

    @Prop()
    password : string;

    @Prop()
    profilepic : string;

    @Prop()
    label : string;
}

export const AccountSchema = SchemaFactory.createForClass(Account); */