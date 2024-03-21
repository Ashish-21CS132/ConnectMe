import React, { useEffect, useState } from 'react'
import Post from './Post'
import './Profile.scss'
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getuserprofile } from '../redux/slices/postslice'
import { useNavigate } from 'react-router-dom'
import userphoto from '../assets/user.png'

const Profile = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const userprofile = useSelector((state) => state.postslice.userprofile)
  const navigate = useNavigate()
  const [ismyprofile, setmyprofile] = useState()
  const [isfollowing, setfollowing] = useState()

  useEffect(() => {
    console.log('hyy my profile')
    dispatch(getuserprofile({ userid: params.userid }))
    console.log(params.userid)

    setmyprofile(userprofile?._id === params.userid)

    setfollowing(
      userprofile?.followings?.find((user) => user._id === userprofile._id),
    )
  }, [params, ismyprofile])

  return (
    <div className="profile">
      <div className="container flex ">
        <div className=" left-part  ">
          {userprofile?.post?.map((item) => (
            <Post key={item._id} item={item} />
          ))}
        </div>
        <div className=" right-part m-3 ">
          <div className="car bg-slate-100 border flex flex-col items-center py-10 shadow-md">
            <div className=" w-[80px] h-[80px] rounded-[50%]">
              <img
                className=" w-[100%] h-[100%] rounded-[50%] object-cover "
                src={
                  userprofile?.avatar?.url
                    ? userprofile?.avatar?.url
                    : userphoto
                }
                alt="phot"
              />
            </div>
            <h3 className="font-semibold">{userprofile.name}</h3>
            <h3>{userprofile.bio}</h3>
            <div className="follow flex justify-between gap-10 ">
              <h3 className="font-semibold text-blue-500">{`${userprofile?.followers?.length} Followers `}</h3>
              <h3 className="font-semibold text-blue-500">
                {`${userprofile?.followings?.length} Followings`}{' '}
              </h3>
            </div>
            {/* {!ismyprofile && (
              <h3 className="bg-blue-500 btn-primary m-2">
                {isfollowing ? "Follow" : "Unfollow"}
              </h3>
            )} */}
            {ismyprofile ? (
              <h3
                className="bg-red-600 btn-primary m-2"
                onClick={() => navigate('/updateprofile')}
              >
                Update
              </h3>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
