const mongoose = require('mongoose');

const label = Object.freeze({
  Personal: 'Personal',
  Blog: 'Blog',
  Business: 'Business',
});

const accountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  label: {
    type: String,
    enum: Object.values(label),
    required: true
  },
  bio: String,
  profilePic: String,
  verified: Boolean,
});

Object.assign(accountSchema.statics, {
  label,
});

module.exports = mongoose.model('account', accountSchema);