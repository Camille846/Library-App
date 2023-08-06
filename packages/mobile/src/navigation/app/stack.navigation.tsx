import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../../screens/App/Home'
import { BottomNavigation } from './bottom.natigation'

const Stack = createNativeStackNavigator()

export function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
    </Stack.Navigator>
  )
}
