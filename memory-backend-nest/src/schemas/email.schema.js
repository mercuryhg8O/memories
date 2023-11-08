const emailSchema = new Schema({
    email: {
        type: String,
        min: 6,
        max: 50,
        required: true,
    }
})