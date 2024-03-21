import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utilis/axiosClient'

export const getuserprofile = createAsyncThunk(
  '/user/getuserprofile',
  async (body) => {
    try {
      const response = await axiosClient.post('/user/getuserprofile', body)
      console.log('success found ', response)
      return response
    } catch (error) {
      console.log('error found ', error)
    }
  },
)

export const likeandunlike = createAsyncThunk('/post/likes', async (body) => {
  try {
    const response = await axiosClient.post('/post/likes', body)
    console.log('likewallah ', response)
    return response
  } catch (err) {
    console.log('likeerror ', err)
  }
})

export const deletepost = createAsyncThunk('/post/', async (body) => {
  console.log('asynccpost', body)
  try {
    const response = await axiosClient.post('/post/delete', body)
    console.log('deleteresponse ', response)
    return response
  } catch (err) {
    console.log('deleteerror', err)
  }
})

const postslice = createSlice({
  name: 'postslice',
  initialState: {
    userprofile: {},
    likect: {},
    delpost: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getuserprofile.fulfilled, (state, action) => {
        state.userprofile = action.payload.data
      })
      .addCase(deletepost.fulfilled, (state, action) => {
        state.delpost = action.payload
      })

      .addCase(likeandunlike.fulfilled, (state, action) => {
        state.likect = action.payload.data

        // const posts = action.payload
        // const index = state?.userprofile?.post?.findIndex(
        //   (item) => item._id === posts._id
        // )
        // console.log("postsliceind ",index)

        // if (index !== undefined && index !== -1) {
        //   state.userprofile.post[index]=posts;
        // }
      })
  },
})

export default postslice.reducer
