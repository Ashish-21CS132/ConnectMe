const { error, success } = require('../utilis/responseWrapper')
const User = require('../models/User')
const Post = require('../models/Post')
const cloudinary = require('cloudinary').v2

const post = (req, res) => {
  try {
    console.log('idquals', req._id)
    res.send(success(200, 'This is the post'))
  } catch (error) {
    console.log(error)
  }
}

const createPostController = async (req, res) => {
  try {
    // console.log(req.body)
    const { caption, img } = req.body

    // if (caption) console.log('caption true')
    // if (img) console.log('img true')

    if ( !img) {
      console.log('caption and img not found')
      return res.status(401).res('caption and img are required.')
    }
    const cloudimg = await cloudinary.uploader.upload(img, {
      folder: 'profileimg',
    })
    const owner = req._id

    const user = await User.findById(req._id)

    const post = await Post.create({
      owner: owner,
      caption: caption || "",
      images: {
        publicId: cloudimg.public_id,
        url: cloudimg.url,
      },
    })

    // console.log(user)
    user.posts.push(post._id)

    await user.save()

    return res.status(201).send({ user })
  } catch (err) {
    console.log('backend createpost ', err)
  }
}

const likeandunlike = async (req, res) => {
  try {
    const { postid } = req.body
    console.log('postid not found')
    const currUserId = req._id

    const post = await Post.findById(postid)
    console.log(post)
    if (!post) {
      return res.status(401).send('post is not found')
    }

    //if post is already liked

    if (post.likes.includes(currUserId)) {
      const index = post.likes.indexOf(currUserId)
      post.likes.splice(index, 1)
      console.log('post unliked. ')
    } else {
      post.likes.push(currUserId)
      console.log('post liked. ')
    }

    await post.save()

    return res.status(201).send({ post })
  } catch (err) {
    console.log(err)
  }
}

const updatepostcontroller = async (req, res) => {
  try {
    const { postid, caption } = req.body
    const userid = req._id

    const post = await Post.findById(postid)

    console.log(post)

    if (!post) {
      return res.status(401).send('post not found')
    }

    if (post.owner.toString() !== userid) {
      return res.status(401).send('user can only update to own post.')
    }

    if (caption) {
      post.caption = caption
    }

    await post.save()

    return res.send(post)
  } catch (err) {
    console.log(err)
  }
}

const deletepost = async (req, res) => {
  try {
    const  {postid}  = req.body
    console.log("reqdata ",req.body);
    console.log('backendpostid ', postid)
    const userid = req._id

    const post = await Post.findById(postid)
    const user = await User.findById(userid)
    if (!post) {
      return res.status(401).send('post not found')
    }

    if (post.owner.toString() !== userid) {
      return res.send('you can only delete your post')
    }

    const index = user.posts.indexOf(postid)
    user.posts.splice(index, 1)

    await user.save()
    await post.deleteOne()

    return res.send('post deleted successfully.')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  post,
  createPostController,
  likeandunlike,
  updatepostcontroller,
  deletepost,
}
