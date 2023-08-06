import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'

import books from '../../../assets/books.png'
import google from '../../../assets/google.png'
import facebook from '../../../assets/facebook.png'

const Signup: React.FC = () => {
  const { control, handleSubmit } = useForm()

  return (
    <SafeAreaView className='flex bg-[#6C85D7] flex-1'>
      <ScrollView>
        <View className='flex items-center'>
          <Image source={books} />
        </View>
        <View className='bg-white flex-1  rounded-t-[50px]'>
          <Text className='mt-16 ml-8 font-Nunito_Bold text-3xl'>Registre-se</Text>
          <View className='flex flex-col items-center p-8 flex-1'>
            <View className='w-[347px] flex'>
              <Controller
                control={control}
                name='name'
                render={({ field: { onChange } }) => (
                  <TextInput onChange={onChange} placeholder='Nome' className='bg-[#F2F5FF] h-[60px] rounded-[50px] px-6 font-Nunito_Bold' />
                )}
              />
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange } }) => (
                  <TextInput onChange={onChange} placeholder='Email' className='bg-[#F2F5FF] h-[60px] rounded-[50px] px-6 font-Nunito_Bold mt-7' />
                )}
              />
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange } }) => (
                  <TextInput
                    onChange={onChange}
                    secureTextEntry={true}
                    className='bg-[#F2F5FF] h-[60px] rounded-[50px] px-6 font-Nunito_Bold mt-7'
                    placeholder='Senha'
                  />
                )}
              />
            </View>
            <View className='flex items-end w-full mt-2'>
              <TouchableOpacity>
                <Text className='text-[#325BE2] font-Nunito_Bold text-xl'>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className='w-full items-center justify-center h-[60px] bg-[#6C85D7] rounded-3xl mt-12'>
              <Text className='font-Nunito_Bold text-2xl text-white'>Entrar</Text>
            </TouchableOpacity>
            <Text className='mt-5 text-[#646363] mb-4 font-Nunito_Regular'>ou entre com</Text>
            <View className='flex flex-row gap-10 w-full items-center justify-center'>
              <Image className='w-12 h-12' source={google} />
              <Image className='w-12 h-12' source={facebook} />
            </View>
            <View className='flex flex-row mt-4'>
              <Text className='text-[#646363] font-Nunito_Bold'>Não tem uma conta ainda?</Text>
              <TouchableOpacity>
                <Text className='text-[#6C85D7] font-Nunito_Bold'>Registe-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup
