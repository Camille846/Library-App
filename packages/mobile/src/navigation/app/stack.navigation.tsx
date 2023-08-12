import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomNavigation } from './bottom.natigation'
import { MyLibrary } from '../../screens/App/MyLibrary'

const Stack = createNativeStackNavigator()

export function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
      <Stack.Screen name='MyLibrary' component={MyLibrary} />
    </Stack.Navigator>
  )
}
