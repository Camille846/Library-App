import { Image, Text, View } from 'react-native'
import libraries from '../../assets/libraries.png'

export function LibraryCard() {
  return (
    <View className='w-full bg-[#7B93E2] flex-2 rounded-xl h-32 p-3 pb-4 flex-row mb-7'>
      <View className='z-10 justify-between'>
        <Text className='font-Nunito_Regular font-bold text-white text-2xl tracking-widest'>Educação e Didáticos</Text>
        <Text>3 livros</Text>
      </View>
      <Image source={libraries} className='object-cover  z-0 flex-1 absolute right-0 bottom-0' />
    </View>
  )
}
