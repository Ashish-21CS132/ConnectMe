import React, { useState } from 'react'
import './Updateprofile.scss'
import Avatar from './Avatar'
import userimg from '../assets/user.png'
import { useDispatch } from 'react-redux'
import { showtoast, updateprofile } from '../redux/slices/appconfigslice'
import { TOAST_SUCCESS } from '../App'

const Updateprofile = () => {
  const [name, setname] = useState('')
  const [bio, setbio] = useState('')
  const [img, setimg] = useState('')
  const dispatch = useDispatch()

  function handlesubmit(e) {
    e.preventDefault()
    dispatch(
      updateprofile({
        name,
        bio,
        img,
      }),
    )
    dispatch(showtoast({
      type: TOAST_SUCCESS,
      message:"Profile Updated.."
    }))
  }

  function handleimg(e) {
    const file = e.target.files[0]
    const filereader = new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      if (filereader.readyState === filereader.DONE) {
        setimg(filereader.result)
        console.log(filereader.result)
      }
    }
  }

  return (
    <div className="updateprofil  flex justify-center mt-20 gap-10 ">
      <div className="left-pa mt-3  flex justify-center items-center">
        <label className="w-[80px] h-[80px] rounded-[50%] hover-link">
          <img
            className="rounded-[50%] h-[100%] w-[100%] object-cover"
            src={img ? img : userimg}
            alt="img."
          />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleimg}
          />
        </label>
      </div>
      <div className="right-pa mt-3  ">
        <form action="">
          <input
            type="text"
            className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-400"
            placeholder="Name"
            onChange={(e) => setname(e.target.value)}
          />

          <input
            type="text"
            className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-400 mt-2"
            placeholder="Bio"
            onChange={(e) => setbio(e.target.value)}
          />

          <input
            type="submit"
            className="bg-blue-500 mt-3 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handlesubmit}
          />
        </form>
      </div>
    </div>
  )
}

export default Updateprofile
