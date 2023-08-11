import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from '../navigation/app/stack.navigation'

export const AppRoutes = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
