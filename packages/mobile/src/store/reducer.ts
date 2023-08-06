import { combineReducers } from '@reduxjs/toolkit'
import AuthReducer from './auth/slice'

export const rootReducer = combineReducers({ auth: AuthReducer })
