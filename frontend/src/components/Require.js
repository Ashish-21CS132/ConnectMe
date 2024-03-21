import React from 'react'
// import { KEY_ACCESS_TOKEN, getItem } from '../utilis/localStorage'
import { Navigate, Outlet } from 'react-router-dom'

const Require = () => {
  const user = localStorage.getItem('token')
  // console.log( user)
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default Require
