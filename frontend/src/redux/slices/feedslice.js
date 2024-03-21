import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosClient } from '../../utilis/axiosClient'

export const getfeeddata = createAsyncThunk(
  '/user/getpostoffollowings',
  async () => {
    try {
      const response = await axiosClient.post('/user/getpostoffollowings')
      console.log('getfeeddataaa ', response.data)
      return response.data
    } catch (error) {
      console.log('getfeederror ', error)
    }
  },
)

export const followandunfollow = createAsyncThunk(
  '/user/follow',
  async (body) => {
    try {
      const response = await axiosClient.post('/user/follow', body)
      console.log('followresponse ', response.data)
      return response.data
    } catch (error) {
      console.log('followerror ', error)
    }
  },
)

const feedslice = createSlice({
  name: 'feedslice',
  initialState: {
    feeddata: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getfeeddata.fulfilled, (state, action) => {
        state.feeddata = action.payload
      })
      .addCase(followandunfollow.fulfilled, (state, action) => {
        const user = action.payload
        const index = state?.feeddata?.followings?.findIndex(
          (item) => item._id === user._id,
        )

        if (index !== -1) {
          state?.feeddata?.followings?.splice(index, 1)
        } else {
          state?.feeddata?.followings?.push(user)
        }
      })
  },
})

export default feedslice.reducer
