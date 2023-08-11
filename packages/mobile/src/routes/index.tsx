import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
//import { isAuth } from '../store/auth/slice'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { RootState } from '../store'
const Stack = createNativeStackNavigator()

const Linking = {
  prefixes: ['exp://192.168.0.66:8081/--/libraryapp'],
  config: {
    screens: {
      Home: {
        path: 'Home',
      },
      Signin: {
        path: 'Signin',
      },
      Signup: {
        path: 'Signup',
      },
    },
  },
}

export const Routes = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isAuth)

  return isLogged ? <AppRoutes /> : <AuthRoutes />
}
