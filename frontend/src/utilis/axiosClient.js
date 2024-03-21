import axios from 'axios'
import {  KEY_ACCESS_TOKEN } from './localStorage'
// import store from '../redux/Store'
// import { setloding } from '../redux/slices/appconfigslice'

export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
})

axiosClient.interceptors.request.use((request) => {
  console.log(KEY_ACCESS_TOKEN)
  request.headers['Authorization'] = `Bearer ${KEY_ACCESS_TOKEN}`
  

  return request;
});

// axiosClient.interceptors.response.use(
//   (response) => {
//     console.log('axios interceptors response', response)
//     store.dispatch(setloding(false))

//     console.log('yes, I am in')
       
//     return Promise.resolve(response)
//   },
//   (err) => {
//     store.setloding(false)
//     console.error('axios interceptors error', err)
//     return Promise.reject(err)
//   },
// )

// axiosClient.interceptors.response.use(async (response) => {
//   const data = response.data

//   if (data.status === 'ok') {
//     return data
//   }

//   const originalRequest = response.config
//   const statusCode = data.statusCode
//   const error = data.error

//   if ( originalRequest.url === 'http://localhost:4000/auth/refresh') {
//     removeItem(KEY_ACCESS_TOKEN)
//     window.location.request('/login', '_self')
//     return Promise.reject()
//   }

//   if (statusCode === 401 || statusCode===404) {
//     const respon = await axiosClient.get('/auth/refresh')
//     console.log('response from backend ', respon)

//     if (response.status === 'ok') {
//       setItem(KEY_ACCESS_TOKEN, response.result.accessToken)
//       originalRequest.headers[
//         'Authorization'
//       ] = `Bearer ${response.result.accessToken}`

//       return axios(originalRequest)
//     }
//   }
//   return Promise.reject(error);
// })
