import { createAsyncThunk } from '@reduxjs/toolkit'
import { IGoogleSignInPayload, ISignInWithEmailAndPasswordPayload } from './interfaces/ISignInPayload'
import { api } from '../../services/axios'

export const signInWithGoogle = createAsyncThunk('auth/signWithGoogle', async ({ idToken }: IGoogleSignInPayload, { rejectWithValue }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }

  try {
    const response = await api.post('/users/oauth/google', {}, config)
    const token = response.data.token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log(response.data)
    return token
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }

  //return rejectWithValue('awds')*/
})

export const signInWithEmailAndPassword = createAsyncThunk(
  'auth/signWithGoogle',
  async ({ email, password }: ISignInWithEmailAndPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password,
      })
      const { token, refresh_token } = response.data

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return {
        token,
        refresh_token,
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

    //return rejectWithValue('awds')*/
  }
)

export const signUpWithEmailAndPassword = createAsyncThunk(
  'auth/signWithGoogle',
  async ({ email, password }: ISignInWithEmailAndPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password,
      })
      const { token, refresh_token } = response.data

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return {
        token,
        refresh_token,
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

    //return rejectWithValue('awds')*/
  }
)
