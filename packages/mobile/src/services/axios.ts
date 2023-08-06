import axios, { AxiosInstance } from 'axios'
import { store } from '../store'

let axiosClient: AxiosInstance

const token = store.getState().persitedReducer.auth.token
const baseURL = process.env.API_URL
console.log(token)

if (token) {
  axiosClient = axios.create({
    baseURL,
    timeout: 1000,
    //headers: { 'X-Custom-Header': 'foobar' },
  })
} else {
  axiosClient = axios.create({
    baseURL,
    headers: { authentication: `Bearer ${token}` },
  })
}

export const api = axiosClient
