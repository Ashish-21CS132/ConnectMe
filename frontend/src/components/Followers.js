import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { followandunfollow, getfeeddata } from '../redux/slices/feedslice'
import { useNavigate } from 'react-router-dom'
import { showtoast } from '../redux/slices/appconfigslice'
import { TOAST_SUCCESS } from '../App'

const Followers = ({ item }) => {
  const dispatch = useDispatch()
  const feeddata = useSelector((state) => state.feedslice.feeddata)
  const [isfollowing, setfollowing] = useState()
  const navigate = useNavigate()

  // useEffect(()=>dispatch(getfeeddata())
  // ,[feeddata])

  function handleclick() {
    dispatch(
      followandunfollow({
        useridtofollow: item._id,
      }),
    )
    dispatch(showtoast({
      type:TOAST_SUCCESS,
      message:"Success"
    }))
  }

  useEffect(() => {
    setfollowing(feeddata?.followings.find((user) => item._id === user._id))
  }, [feeddata])
  return (
    <div className="flex justify-between mt-3 items-center bg-slate-10">
      <div className="user-info flex gap-2">
        <div
          className="w-[32px] h-[32px] rounded-full hover-link"
          onClick={() => navigate(`/profile/${item._id}`)}
        >
          <Avatar src={item?.avatar?.url} />
        </div>
        <h4>{item?.email}</h4>
      </div>
      <h4
        className={
          isfollowing
            ? 'btn-secondary'
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        }
        onClick={handleclick}
      >
        {isfollowing ? 'Unfollow' : 'Follow'}
      </h4>
    </div>
  )
}

export default Followers
