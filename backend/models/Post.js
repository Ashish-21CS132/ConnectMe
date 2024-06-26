const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  caption: {
    type: String,
    
  },

  images: {
    publicId: String,
    url: String,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],

 
},{
  timestamps:true,
})

module.exports = mongoose.model('post', postSchema);
