const ta = require('time-ago')

const mappostoutput = (post, userid) => {
  return {
    _id: post._id,
    caption: post.caption,
    images: post.images,
    owner: {
      _id: post.owner._id,
      name: post.owner.name,
      avatar: post.owner.avatar,
    },
    likescount: post.likes.length,
    isliked: post.likes.includes(userid),
    timeago: ta.ago(post.createdAt),
  }
}

module.exports={mappostoutput};
