import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import { Profile } from '../screens/Profile'
import Signin from '../screens/Signin'
import Signup from '../screens/Signup'

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
  return (
    <NavigationContainer linking={Linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Signin' component={Signin} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
