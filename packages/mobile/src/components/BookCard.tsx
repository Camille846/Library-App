import { Image, Text, TouchableOpacity, View } from 'react-native'
import bookImage from '../../assets/book.png'
import { Star } from 'phosphor-react-native'

export function BookCard() {
  return (
    <View className='w-full  h-[264px] rounded-lg flex-row mb-5'>
      <Image source={bookImage} />
      <View className='flex-col ml-4 w-[50%] justify-between items-center'>
        <View>
          <Text className='font-Nunito_Bold text-xl font-bold'>A revolução dos bichos: Um conto de fadas</Text>
          <Text className='text-[#626161] font-Nunito text-sm font-medium'>George Orwell</Text>
          <View className='flex-row justify-between mt-3 w-[100px]'>
            <Star size={15} color='#FDCC0D' weight='fill' />
            <Star size={15} color='#FDCC0D' weight='fill' />
            <Star size={15} color='#FDCC0D' weight='fill' />
            <Star size={15} color='#FDCC0D' weight='fill' />
            <Star size={15} color='#FDCC0D' weight='fill' />
          </View>
        </View>
        <View className='justify-between h-[50px] w-full items-center'>
          <View className='w-[160px] bg-[#626161] h-[1px] justify-center mr-2'>
            <View className='w-3 h-3 bg-[#325BE2] rounded-full absolute ' />
            <View className='w-[50%] bg-[#325BE2] h-[2px]' />
            <View className='w-3 h-3 bg-[#325BE2] rounded-full absolute left-[50%] ' />
            <View className='w-2 h-2 bg-[#626161] rounded-full absolute left-[100%] ' />
          </View>
          <TouchableOpacity className='mb-2 bg-[#99AEF3] w-40 items-center justify-center rounded-2xl h-6'>
            <Text className='font-Nunito_Bold font-bold text-[#F2F5FF]'>Continuar lendo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
