import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/Header'
import { SearchInput } from '../../components/SearchInput'
import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { LibraryCard } from '../../components/LibraryCard'
import { Plus } from 'phosphor-react-native'

export function Libraries({ navigation }) {
  const [searchInput, setSearchInput] = useState('')

  return (
    <SafeAreaView className='bg-white flex-1 px-5'>
      <Header text='Suas bibliotecas' />
      <SearchInput onSearch={setSearchInput} />
      <View className='mt-3 flex-1'>
        <TouchableOpacity className='flex-2 items-center justify-end flex-row mt-[38px]'>
          <Plus size={24} color='#325BE2' weight='bold' />
          <Text className='text-[#626161] font-Nunito_Regular'>Adicionar biblioteca</Text>
        </TouchableOpacity>
        <Text className='font-Nunito_Regular text-xl text-[#626161]'>
          <Text className='font-bold text-black'>5</Text> bibliotecas
        </Text>

        <FlatList
          data={[
            { number: 1, title: 'teste1' },
            { number: 2, title: 'teste2' },
            { number: 3, title: 'teste3' },
          ]}
          renderItem={({ item }) => <LibraryCard />}
          keyExtractor={(item) => item.title}
        />
      </View>
    </SafeAreaView>
  )
}
