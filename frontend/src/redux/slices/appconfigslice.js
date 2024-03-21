import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import { axiosClient } from '../../utilis/axiosClient'

export const getmyinfo = createAsyncThunk('/user/getmyinfo', async () => {
  try {
    const response = await axiosClient.get('/user/getmyinfo')
    console.log('api is called', response)
    return response
  } catch (err) {
    console.log('failed to fetch api', err)
    return Promise.reject(err)
  }
})

export const updateprofile = createAsyncThunk('/user/', async (body) => {
  try {
    const response = await axiosClient.put('/user/', body)
    console.log('updated profile ', response)
    return response
  } catch (err) {
    console.log('update..profile error ', err)
  }
})

const appconfigslice = createSlice({
  name: 'appconfigslice',
  initialState: {
    isloding: false,
    myprofile: null,
    toastdata: {},
  },

  reducers: {
    setloding: (state, action) => {
      state.isloding = action.payload
    },

    showtoast: (state,action)=>{
      state.toastdata=action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getmyinfo.fulfilled, (state, action) => {
        state.myprofile = action.payload.data.user
      })
      .addCase(updateprofile.fulfilled, (state, action) => {
        state.myprofile = action.payload.data.user
      })
  },
})

export default appconfigslice.reducer
export const { setloding, showtoast } = appconfigslice.actions
