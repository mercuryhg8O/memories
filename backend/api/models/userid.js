const mongoose = require('mongoose');

const useridSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    current : Number
})

let userid = module.exports = mongoose.model('userids', useridSchema);

module.exports.getCurrent = async () => {
    let val= await userid.find({name : 'Counter'})
    .select('current');
    return val[0].current;
}