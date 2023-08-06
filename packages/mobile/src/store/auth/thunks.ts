import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IGoogleSignInPayload } from './interfaces/IGoogleSignInPayload'

export const signInWithGoogle = createAsyncThunk('auth/register', async ({ idToken }: IGoogleSignInPayload, { rejectWithValue }) => {
  console.log(idToken)
  //return rejectWithValue('awds')
})
