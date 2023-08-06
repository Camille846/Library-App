import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from '../store'

export const api = axios.create({
  baseURL: 'http://192.168.0.85:5000',
  timeout: 10000,
  //headers: { 'X-Custom-Header': 'foobar' },
})
