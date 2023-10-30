import mongoose from 'mongoose';
const { Schema } = mongoose;

@Schema()
export class Memory {
    @Prop()
    bodyText;

    @Prop()
    account;

    @Prop()
    tags;

    @Prop()
    likes;
    
    @Prop()
    Location;

    @Prop()
    Photos;

    @Prop()
    memoryId;

    @Prop()
    Visibility;    
}