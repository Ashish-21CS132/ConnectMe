import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { BsCardImage } from 'react-icons/bs'
import background from '../assets/background.jpg'
import { axiosClient } from '../utilis/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { getfeeddata } from '../redux/slices/feedslice'
import { showtoast } from '../redux/slices/appconfigslice'
import { TOAST_SUCCESS } from '../App'

const Createpost = () => {
  const [caption, setcaption] = useState('')
  const [img, setimg] = useState('')
  const myprofile = useSelector((state) => state.appconfigslice.myprofile)
  const dispatch = useDispatch()

  //   useEffect(()=>{
  //     dispatch(getfeeddata());
  //  },[dispatch])

  function handlesetimg(e) {
    const file = e.target.files[0]
    const filereader = new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      if (filereader.readyState === filereader.DONE) {
        setimg(filereader.result)
        console.log('updated image as ', filereader)
      }
    }
  }

  const handlepost = async () => {
    try {
      const result = await axiosClient.post('/post/', {
        caption,
        img,
      })
      dispatch(
        showtoast({
          type: TOAST_SUCCESS,
          message: 'Post Success',
        }),
      )

      console.log('createdpost is ', result)

      dispatch(getfeeddata())
    } catch (error) {
      console.log('failed to creat post. ', error)
    }
  }

  return (
    <div className="createpost flex mt-3 gap-3 shadow-md p-3 bg-slate-100">
      <div className="left flex-none">
        <div className="w-10 h-10 rounded-full hover-link">
          <Avatar src={myprofile?.avatar?.url} />
        </div>
      </div>
      <div className="right flex-grow ">
        <div className="caption">
          <input
            type="text"
            placeholder="What's on your mind.."
            className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-400"
            onChange={(e) => setcaption(e.target.value)}
          />
        </div>
        {img && (
          <div className="img-container m-2">
            <img
              src={img}
              alt="post-img"
              className="w-full h-60 object-cover rounded-md"
            />
          </div>
        )}
        <div className="button-part flex justify-between items-center mt-5">
          <label htmlFor="card" className="input-post-img flex items-end">
            <BsCardImage className="text-blue-500 text-3xl cursor-pointer active:text-blue-400" />
          </label>
          <input
            id="card"
            type="file"
            accept="image/*"
            onChange={handlesetimg}
            className="hidden"
          />
          <button
            onClick={handlepost}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Createpost
