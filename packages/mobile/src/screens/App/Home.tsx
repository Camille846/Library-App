import { Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MagnifyingGlass, FunnelSimple } from 'phosphor-react-native'
import { BookCard } from '../../components/BookCard'
import { Header } from '../../components/Header'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/auth/slice'
interface IHomeProps {
  navigation: NativeStackNavigationProp<any, any>
}

export const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const dispach = useDispatch()
  return (
    <SafeAreaView className='bg-white flex-1 px-5'>
      <Header>
        <Text className='font-Nunito_Bold text-[50px] text-[#FDCC0D]'>Olá!</Text>
        <TouchableOpacity onPress={() => dispach(signOut())}>
          <Text>aaaa</Text>
        </TouchableOpacity>
      </Header>
      <View className='flex-row items-center w-full  mt-[34px]'>
        <View className='bg-[#F2F5FF] h-[42px] w-[317px] rounded-2xl px-3 items-center flex-row'>
          <MagnifyingGlass size={24} color='#6C85D7' weight='bold' />
          <TextInput className='ml-2 font-Nunito_Bold w-full h-10' placeholderTextColor={'#646363'} placeholder='Pesquisar livros' />
        </View>
        <View className='w-10 h-10 bg-[#6C85D7] items-center justify-center rounded-lg ml-2'>
          <FunnelSimple size={32} color='#ffff' />
        </View>
      </View>
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
