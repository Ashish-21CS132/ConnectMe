import React, { useEffect } from 'react'
import './Feed.scss'
import Post from './Post'
import Followers from './Followers'
import Createpost from './Createpost'
import { useDispatch, useSelector } from 'react-redux'
import { getfeeddata } from '../redux/slices/feedslice'

const Feed = () => {
  const dispatch = useDispatch()
  const feeddata = useSelector((state) => state.feedslice.feeddata)

  useEffect(() => {
    dispatch(getfeeddata())
  }, [dispatch])

  return (
    <div className="">
      <div className="container flex ">
        <div className=" left-part  ">
          <Createpost />
          {feeddata?.posts?.map((item) => (
            <Post item={item} />
          ))}
        </div>
        <div className=" right-part m-3 shadow-2xl p-3 bg-slate-100">
          <div className="followings ">
            <h3 className="font-semibold text-blue-500 text-xl">
              You are the followings
            </h3>
            {feeddata?.followings?.map((item) => (
              <Followers key={item._id} item={item} />
            ))}
          </div>
          <div className="Suggestions mt-4">
            <h3 className="font-semibold text-xl text-blue-500">
              Suggesstions for you
            </h3>
            {feeddata?.suggestions?.map((item) => (
              <Followers key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
