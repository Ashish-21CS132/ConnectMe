import React from 'react'
import userimg from '../assets/user.png'

const Avatar = ({ src }) => {
  return (
    <div className=" w-[32px] h-[32px] rounded-[50%]">
      <img
        className=" w-[100%] h-[100%] rounded-[50%] object-cover "
        src={src ? src : userimg}
        alt="phot"
      />
    </div>
  )
}

export default Avatar
