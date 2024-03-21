const mongoose = require('mongoose')

const userschema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  bio: {
    type: String,
  },

  avatar: {
    publicId: String,
    url: String,
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
})

module.exports = mongoose.model('user', userschema)
