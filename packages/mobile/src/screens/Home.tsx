import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import library from '../../assets/library.png'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IHomeProps {
  navigation: NativeStackNavigationProp<any, any>
}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  return (
    <SafeAreaView className='bg-[#6C85D7] flex flex-1'>
      <View className='mt-36 w-full p-2 flex items-center z-2'>
        <Text className='font-Nunito_Bold text-4xl leading-[49px] text-slate-50'>Junte-se a nós e sinta-se em casa.</Text>
      </View>
      <View className='flex flex-col px-10 mt-[107px] h-[166px] justify-between'>
        <TouchableOpacity className='bg-slate-50 w-[347px] h-[60px] items-center justify-center' onPress={() => navigation.navigate('Signin')}>
          <Text className='font-Nunito_Bold text-2xl text-[#1E1E1E]'>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-[#8A9EDF] w-[347px] h-[60px] items-center justify-center border-[#1e1e1e4d] border-1'
          onPress={() => navigation.navigate('Signup')}
        >
          <Text className='font-Nunito_Bold text-2xl text-[#1E1E1E]'>Registre-se</Text>
        </TouchableOpacity>
      </View>
      <Image className='flex-1 flex z-1 rounded-lg' source={library} />
    </SafeAreaView>
  )
}

export default Home
