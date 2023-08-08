import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.0.85:5000',
  timeout: 10000,
  //headers: { 'X-Custom-Header': 'foobar' },
})
