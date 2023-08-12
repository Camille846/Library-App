import { FunnelSimple, MagnifyingGlass } from 'phosphor-react-native'
import { TextInput, View } from 'react-native'

export function SearchInput({ onSearch }) {
  return (
    <View className='flex-row items-center w-full mt-[34px] max-w-full'>
      <View className='bg-[#F2F5FF] h-[42px] rounded-2xl px-3 items-center flex-row flex-1'>
        <MagnifyingGlass size={24} color='#6C85D7' weight='bold' />
        <TextInput
          onChangeText={onSearch}
          className='ml-2 font-Nunito_Bold w-full h-10'
          placeholderTextColor={'#646363'}
          placeholder='Pesquisar livros'
        />
      </View>
      <View className='w-10 h-10 bg-[#6C85D7] items-center justify-center rounded-lg ml-2'>
        <FunnelSimple size={32} color='#ffff' />
      </View>
    </View>
  )
}
