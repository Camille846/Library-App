import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Profile } from '../../screens/App/Profile'
import { TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Home } from '../../screens/App/Home'
import { LibraryAddIcon } from '../../components/LibraryAddIcon'
import { BookBookmark, TextAlignLeft } from 'phosphor-react-native'
import { Libraries } from '../../screens/App/Libraries'

const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View className='flex-row justify-around h-[70px] w-full bg-white items-center flex text-center'>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }
        const iconsColor = isFocused ? '#E2E2E2' : '#707070'
        const classNameBorder = twMerge('border-[3px] p-2 border-[#E2E2E2] rounded-full', !isFocused && 'border-[#707070]')
        const classNameIcon = twMerge('fill-[#E2E2E2] ', !isFocused && 'fill-[#707070]')

        return (
          <TouchableOpacity
            key={route.key}
            className={twMerge(' items-center justify-center', isFocused && 'bg-slate-50')}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {route.name === 'Home' && <BookBookmark color={iconsColor} weight='bold' />}
            {route.name === 'Home3' && (
              <View className={classNameBorder}>
                <LibraryAddIcon className={classNameIcon} />
              </View>
            )}
            {route.name === 'Libraries' && <TextAlignLeft color={iconsColor} weight='bold' />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Home3' component={Profile} />
      <Tab.Screen name='Libraries' component={Libraries} />
    </Tab.Navigator>
  )
}
