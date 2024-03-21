import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utilis/axiosClient'
import loginbgg from '../../assets/loginbgg.jpg'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setname] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const result = await axiosClient.post('/auth/signup', {
        email,
        password,
        name,
      })
      console.log(result)
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className="signup flex justify-center h-[100vh] items-center bg-gray-200  "
      style={{
        backgroundImage: `url(${loginbgg})`,
        backgroundSize: 'cover',
        objectfit: 'cover',
      }}
    >
      {/* <img src={loginbg} alt="" /> */}
      <div className="signup-page shadow-2xl border-red-300 p-4 min-w-[400px] rounded-sm bg-whit  ">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => setname(e.target.value)}
            className="border bg-slate-100 w-full p-1 rounded-md focus:outline-none focus:border-blue-400"
            type="text"
            placeholder="Enter your name"
          />
          <label className="font-bold mt-4" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border bg-slate-100 w-full p-1 rounded-md focus:outline-none focus:border-blue-400"
            type="text"
            placeholder="Enter your email"
          />
          <label className="font-bold mt-4 " htmlFor="password">
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
