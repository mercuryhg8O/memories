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
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
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
  verified: {
    type: Boolean,
    default: false
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account' }],
  },
  mutuals: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account' }],
  },
  likedMemories: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'memory' }],
    default: mongoose.Types.ObjectId['memory']
  }
});

Object.assign(accountSchema.statics, {
  label,
});

module.exports = mongoose.model('account', accountSchema);