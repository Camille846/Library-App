import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile } from '../screens/App/Profile'
import { Home } from '../screens/App/Home'
import { StackNavigation } from '../navigation/app/stack.navigation'
import { BottomNavigation } from '../navigation/app/bottom.natigation'

export const AppRoutes = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
