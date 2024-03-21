import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import background from '../assets/background.jpg'
import { CiHeart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { deletepost, likeandunlike } from '../redux/slices/postslice'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { showtoast } from '../redux/slices/appconfigslice'
import { TOAST_SUCCESS } from '../App'
import { MdDelete } from 'react-icons/md'
import { getfeeddata } from '../redux/slices/feedslice'

const Post = ({ item }) => {
  const dispatch = useDispatch()
  const [isiliked, setiliked] = useState(false)
  const likect = useSelector((state) => state.postslice.likect.post)
  const params = useParams()
  const navigate = useNavigate()
  const delpost = useSelector((state) => state.postslice.delpost)
  let flag = 0
  console.log(likect)
  function handleclick() {
    dispatch(likeandunlike({ postid: item._id }))
    dispatch(
      showtoast({
        type: TOAST_SUCCESS,
        message: 'Liked Success',
      }),
    )
    if (likect?.owner === params.userid && flag === 0) {
      flag = 1
      setiliked(true)
    } else {
      flag = 0
      setiliked(false)
    }
    console.log(isiliked)
  }

  useEffect(() => {
    dispatch(getfeeddata())
  }, [delpost])

  function handledelete() {
    console.log('frontendpostid', item._id)
    dispatch(deletepost({ postid: item._id }))
    dispatch(
      showtoast({
        type: TOAST_SUCCESS,
        message: 'Deleted..',
      }),
    )
  }

  return (
    <div className="mt-3 rounded-md border border-blue-100 shadow-md container ">
      <div className="heading border-b-2 flex items-center gap-2 h-10 p-4 cursor-pointer bg-slate-100">
        <div
          className="w-8 h-8 rounded-full hover-link"
          onClick={() => navigate(`/profile/${item?.owner._id}`)}
        >
          <Avatar src={item?.owner?.avatar?.url} />
        </div>
        <h3>{item?.owner?.name}</h3>
      </div>
      <div className="content h-[400px]">
        <img
          src={item?.images?.url}
          alt="images"
          className="w-full h-[100%] object-contain"
        />
      </div>
      <div className="footer bg-slate-100 border-t border-gray-300 p-4">
        <div className="likes flex gap-2">
          <div
            className="text-2xl text-red-500 cursor-pointer"
            onClick={handleclick}
          >
            {isiliked ? <AiFillHeart /> : <AiOutlineHeart />}
          </div>
          <h1>{`${
            likect?.likes?.length ? likect?.likes?.length : item?.likescount
          } likes`}</h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="caption mt-1">{item?.caption}</div>
          <div
            className="text-xl text-red-500 cursor-pointer active:text-red-400"
            onClick={handledelete}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
