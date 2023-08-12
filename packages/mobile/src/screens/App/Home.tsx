import { Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BookCard } from '../../components/BookCard'
import { Header } from '../../components/Header'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/auth/slice'
import { SearchInput } from '../../components/SearchInput'
import { useEffect, useState } from 'react'
interface IHomeProps {
  navigation: NativeStackNavigationProp<any, any>
}

export const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    console.log(searchInput)
  }, [searchInput])

  const dispach = useDispatch()
  return (
    <SafeAreaView className='bg-white flex-1 px-5'>
      <TouchableOpacity onPress={() => dispach(signOut())}>
        <Text>aaaa</Text>
      </TouchableOpacity>
      <Header>
        <Text className='font-Nunito_Bold text-[50px] text-[#FDCC0D]'>Olá!</Text>
      </Header>
      <SearchInput onSearch={setSearchInput} />
      <FlatList
        className='mt-[34px]'
        data={[
          { number: 1, title: 'teste1' },
          { number: 2, title: 'teste2' },
          { number: 3, title: 'teste3' },
        ]}
        renderItem={({ item }) => <BookCard />}
        keyExtractor={(item) => item.title}
      />
      {/* /*<View className='mt-[34px] justify-between'> */}
      {/* <BookCard />qqqqqqqqqqqqq/// */}
      {/* <BookCard /> */}
      {/* <BookCard /> */}
      {/* </View>*/}
    </SafeAreaView>
  )
}
