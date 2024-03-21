import Avatar from './Avatar'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { setloding, showtoast } from '../redux/slices/appconfigslice'
import { useEffect, useState } from 'react'
import { TOAST_FAILURE } from '../App'
import { axiosClient } from '../utilis/axiosClient'
import social from '../assets/social-logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const myprofile = useSelector((state) => state.appconfigslice.myprofile)
  // const loding = useSelector((state) => state.appconfigslice.isloding)
  // const [load,setload]=useState(true);

  const dispatch = useDispatch()

  async function logoutclick() {
    try {
      await axiosClient.post('/auth/logedout')
      localStorage.removeItem('token')
      dispatch(
        showtoast({
          type: TOAST_FAILURE,
          message: 'Loged Out..',
        }),
      )

      navigate('/login')
    } catch (err) {
      console.log('logedouterror', err)
    }
  }

  // const clicked=() => {
  //   if(load==="true")
  //   dispatch(setloding(true))
  //   load(false)
  // };

  // useEffect(()=>{
  //   dispatch(setloding(load));
  // },[load]);

  return (
    <div className="navbar fixed bg-slate-200 w-[100%] h-[60px] border border-b-3 top-0 ">
      <div className="container flex justify-between items-center h-[100%]">
        <div
          className=" font-bold text-2xl font-serif text-blue-600 cursor-pointer active:text-blue-400"
          onClick={() => navigate('/')}
        >
          ConnectMe
        </div>

        <div className="flex gap-4 items-center">
          <div
            className="w-[32px] h-[32px] rounded-full hover-link"
            onClick={() => navigate(`/profile/${myprofile?._id}`)}
          >
            <Avatar src={myprofile?.avatar?.url} />
          </div>
          <div
            className="text-3xl hover-link text-red-600"
            onClick={logoutclick}
          >
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
