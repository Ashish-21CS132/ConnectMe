import { configureStore } from '@reduxjs/toolkit'
import appconfigslice from './slices/appconfigslice'
import postslice from './slices/postslice'
import feedslice from './slices/feedslice'

export default configureStore({
    reducer:{
        appconfigslice,
        postslice,
        feedslice,
    }
})