import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/login'

import Home from './pages/home/Home'
import Feed from './components/Feed'
import Updateprofile from './components/Updateprofile'
import Profile from './components/Profile'
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Require from './components/Require'
import Signup from './pages/signup/signup'
import Ifnotlogedin from './components/Ifnotlogedin'
import toast, { Toaster } from 'react-hot-toast'

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const isloding = useSelector((state) => state.appconfigslice.isloding)
  const lodingref = useRef(null)
  const toastdata = useSelector((state) => state.appconfigslice.toastdata)

  useEffect(() => {
    if (isloding) {
      lodingref.current?.continuousStart()
    } else {
      lodingref.current?.complete()
    }
  }, [isloding])

  useEffect(() => {
    switch (toastdata.type) {
        case TOAST_SUCCESS:
            toast.success(toastdata.message);
            break;
        case TOAST_FAILURE:
            toast.error(toastdata.message);
            break;
    }
}, [toastdata]);

  return (
    <div className="App ">
      {/* <LoadingBar color="var(--accent-color)" ref={lodingref} /> */}
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<Require />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/updateprofile" element={<Updateprofile />} />
          </Route>
        </Route>

        <Route element={<Ifnotlogedin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
