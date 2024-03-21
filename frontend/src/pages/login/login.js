import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utilis/axiosClient'
import loginbgg from '../../assets/loginbgg.jpg'
import { getmyinfo, showtoast } from '../../redux/slices/appconfigslice'
import { TOAST_SUCCESS } from '../../App'
import { useDispatch } from 'react-redux'
import { getfeeddata } from '../../redux/slices/feedslice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [count, setcount] = useState(0)

  async function handlechange(e) {
    e.preventDefault()
    try {
      const result = await axiosClient.post('/auth/login', {
        email,
        password,
      })
      console.log(result)
      localStorage.setItem('token', result?.data?.result?.accessToken)
      dispatch(
        showtoast({
          type: TOAST_SUCCESS,
          message: 'Loged In..',
        }),
      )
      navigate('/')
      // x = x + 1
      // setcount(x)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div
      className="login flex justify-center h-[100vh] items-center "
      style={{
        backgroundImage: `url(${loginbgg})`,
        backgroundSize: 'cover',
        objectfit: 'cover',
      }}
    >
      <div className="login-page  p-4 min-w-[400px] rounded-sm shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handlechange} className="flex flex-col">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border bg-slate-100 w-full p-1 rounded-md focus:outline-none focus:border-blue-400"
            type="text"
            placeholder="Enter your email"
          />
          <label className="font-bold mt-4" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border bg-slate-100 w-full p-1 rounded-md focus:outline-none focus:border-blue-400"
            type="password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
