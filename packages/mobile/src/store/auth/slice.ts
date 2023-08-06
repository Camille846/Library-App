import { createSlice } from '@reduxjs/toolkit'
import { authInitialState } from './initialState'
import { signInWithGoogle } from './thunks'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    signInWithGoogle2: (state) => {
      state.isAuth = false
    },
    signOut: (state) => {
      state.isAuth = false
      state.token = ''
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(signInWithGoogle.pending, (state) => {}),
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      // const teste = action.meta.arg.idToken
      // console.log(teste, state.isAuth)
      state.isAuth = true
      state.token = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { signInWithGoogle2, signOut } = authSlice.actions

export const isAuth = (state: any) => state.auth.isAuth

export default authSlice.reducer
