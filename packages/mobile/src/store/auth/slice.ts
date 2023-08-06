import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authInitialState } from './initialState'
import { api } from '../../services/axios'
import { signInWithGoogle } from './thunks'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    signInWithGoogle2: (state, action: PayloadAction<{ idToken: string }>) => {
      state.isAuth = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {}),
      builder.addCase(signInWithGoogle.fulfilled, (state) => {
        state.isAuth = true
      })
  },
})

// Action creators are generated for each case reducer function
export const { signInWithGoogle2 } = authSlice.actions

export const isAuth = (state) => state.auth.isAuth

export default authSlice.reducer
