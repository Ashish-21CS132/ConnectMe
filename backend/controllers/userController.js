const User = require('../models/User')
const Post = require('../models/Post')
const { mappostoutput } = require('../utilis/utilis')
const cloudinary = require('cloudinary').v2

const followandunfollow = async (req, res) => {
  try {
   
    const { useridtofollow } = req.body
    const currid = req._id

    const usertofollow = await User.findById(useridtofollow)
    const curruserid = await User.findById(currid)


    if (!usertofollow) {
      console.log("usertofollownotfound");
      return res.status(401).send('usertofollow not found')
    }

    //logic for followandunfollow

    //   console.log(curruserid);

    if (curruserid.followings.includes(useridtofollow)) {
      console.log('already follow')
      const index = curruserid.followings.indexOf(usertofollow)
      curruserid.followings.splice(index)

      const followerindex = usertofollow.followers.indexOf(curruserid)
      usertofollow.followers.splice(followerindex)

      await curruserid.save()
      await usertofollow.save()

      console.log('unfollow successfully');
    } else {
      console.log('not folowed')
      curruserid.followings.push(usertofollow)
      usertofollow.followers.push(curruserid)
      await curruserid.save()
      await usertofollow.save()
    }
    console.log("followsucces ",usertofollow)
    return res.status(201).send( usertofollow)
  } catch (err) {
    console.log("backendfollowerror ",err)
  }
}

const getmypost = async (req, res) => {
  try {
    const userid = req._id
    const alluserpost = await Post.find({
      owner: userid,
    }).populate('likes')
    return res.send({ alluserpost })
  } catch (err) {
    console.log(err)
  }
}

const getuserpost = async (req, res) => {
  try {
    const { userid } = req.body

    if (!userid) {
      return res.send('userid is required')
    }
    const alluserpost = await Post.find({
      owner: userid,
    }).populate('likes')
    return res.send(alluserpost)
  } catch (err) {
    console.log(err)
  }
}

const getmyinfo = async (req, res) => {
  try {
    const user = await User.findById(req._id)
    return res.send({ user })
  } catch (err) {
    console.log(err)
  }
}

const updateprofile = async (req, res) => {
  try {
    const { name, bio, img } = req.body
    console.log(name)
    const user = await User.findById(req._id)

    if (name) console.log(name)
    if (name) user.name = name
    if (bio) user.bio = bio

    if (img) {
      const cloudimg = await cloudinary.uploader.upload(img, {
        folder: 'profileimg',
      })

      user.avatar = {
        url: cloudimg.secure_url,
        publicId: cloudimg.public_id,
      }
    }
    await user.save()
    return res.send({ user })
  } catch (err) {
    console.log(err)
  }
}

const getuserprofile = async (req, res) => {
  try {
    console.log('yes ')
    const { userid } = req.body
    const user = await User.findById(userid).populate({
      path: 'posts',
      populate: {
        path: 'owner',
      },
    })

    const fullpost = user.posts
    const post = fullpost
      .map((items) => mappostoutput(items, req._id))
      .reverse()

    console.log(post)
    return res.send({ ...user._doc, post })
  } catch (error) {
    console.log('error post ', error)
  }
}

const getpostoffollowings = async (req, res) => {
  try {
    const curruserid = req._id
  const curruser = await User.findById(curruserid).populate('followings')

  const fullpost = await Post.find({
    $or: [
      { owner: { $in: curruser.followings } },
      { owner: curruserid }
    ]
  }).populate("owner");

  const posts=fullpost.map((item)=>mappostoutput(item,req._id)).reverse();
  
  const followingsids=curruser.followings.map((item)=>item._id);
  followingsids.push(req._id);

  const suggestions=await User.find({
    _id:{
      $nin:followingsids,
    }
  })

  return res.send({...curruser._doc,suggestions,posts});

  } catch (err) {
    console.log("backendpostoffollerror",err)
  }
  
}

module.exports = {
  followandunfollow,
  getmypost,
  getuserpost,
  getmyinfo,
  updateprofile,
  getuserprofile,
  getpostoffollowings,
}
