import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
// import Feed from "../../components/Feed"
import Navbar from '../../components/Navbar'
import { useDispatch } from 'react-redux'

import { getmyinfo } from '../../redux/slices/appconfigslice'

// import { axiosClient } from '../../utilis/axiosClient';

const Home = () => {
  // useEffect(()=>{
  //     fetchdata();
  // },[]);

  // async function fetchdata(){
  //     const response=await axiosClient.get("/post/all");

  //     console.log("got the response ",response);

  // }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getmyinfo())
  }, [dispatch])

  return (
    <div>
      <Navbar />

      <div className="outlet mt-16 ">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
