import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import books from '../../../assets/books.png'
import google from '../../../assets/google.png'
import facebook from '../../../assets/facebook.png'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { googleSignInConfig } from '../../config/google'

import { useDispatch } from 'react-redux'
import { signInWithEmailAndPassword, signInWithGoogle } from '../../store/auth/thunks'
import { AppDispatch } from '../../store'

googleSignInConfig

const Signin: React.FC = () => {
  const signInSchema = zod.object({
    email: zod.string({ required_error: 'Você deve informar um email válido!' }).email('Você deve informar um email válido!').min(1),
    password: zod.string({ required_error: 'Você deve informar uma senha!' }).min(1, { message: 'Você deve informar uma senha!' }),
  })
  type IsignIn = zod.infer<typeof signInSchema>

  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IsignIn>({ resolver: zodResolver(signInSchema) })

  function handleSignInWithEmailAndPassword(data: IsignIn) {
    dispatch(signInWithEmailAndPassword(data))
  }

  async function handleSignInWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices()

      const userInfo = await GoogleSignin.signIn()
      const { idToken } = userInfo
      if (idToken) dispatch(signInWithGoogle({ idToken }))
    } catch (error) {
      console.log(error)
    }
  }

  /*async function handleSignInWithFacebook() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }*/
  return (
    <SafeAreaView className='flex bg-[#6C85D7] flex-1'>
      <View className='flex items-center'>
        <Image source={books} />
      </View>
      <View className='bg-white flex-1  rounded-t-[50px]'>
        <Text className='mt-16 ml-8 font-Nunito_Bold text-3xl'>Entrar agora</Text>
        <View className='flex flex-col items-center  p-8 flex-1'>
          <View className='w-[347px] flex justify-between h-40'>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange } }) => (
                <TextInput
                  onChangeText={onChange}
                  placeholder='Email'
                  className={`bg-[#F2F5FF] h-[60px] rounded-[50px] px-6 font-Nunito_Bold ${errors.email && 'border-red-500 border-2'}`}
                />
              )}
            />
            <Text className='text-red-500 font-Nunito_Bold'>{errors.email && String(errors.email.message)}</Text>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange } }) => (
                <TextInput
                  onChangeText={onChange}
                  secureTextEntry={true}
                  className={`bg-[#F2F5FF] h-[60px] rounded-[50px] px-6 font-Nunito_Bold ${errors.password && 'border-red-500 border-2'}`}
                  placeholder='Senha'
                />
              )}
            />
            <Text className='text-red-500 font-Nunito_Bold'>{errors.password && String(errors.password.message)}</Text>
          </View>
          <View className='flex items-end w-full mt-2'>
            <TouchableOpacity>
              <Text className='text-[#325BE2] font-Nunito_Bold text-xl'>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleSubmit(handleSignInWithEmailAndPassword)}
            className='w-full items-center justify-center h-[60px] bg-[#6C85D7] rounded-3xl mt-12'
          >
            <Text className='font-Nunito_Bold text-2xl text-white'>Entrar</Text>
          </TouchableOpacity>
          <Text className='mt-5 text-[#646363] mb-4 font-Nunito_Regular'>ou entre com</Text>
          <View className='flex flex-row gap-10 w-full items-center justify-center'>
            <TouchableOpacity onPress={handleSignInWithGoogle}>
              <Image className='w-12 h-12' source={google} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image className='w-12 h-12' source={facebook} />
            </TouchableOpacity>
          </View>
          <View className='flex flex-row mt-4'>
            <Text className='text-[#646363] font-Nunito_Bold'>Não tem uma conta ainda?</Text>
            <TouchableOpacity>
              <Text className='text-[#6C85D7] font-Nunito_Bold'> Registre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Signin
