import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Account {
    @Prop()
    email;

    @Prop()
    verification;

    @Prop()
    accountId;

    @Prop()
    username;

    @Prop()
    password;

    @Prop()
    profilepic;

    @Prop()
    label;
}

export const AccountSchema = SchemaFactory.createForClass(Account);