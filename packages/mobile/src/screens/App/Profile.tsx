import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { signInWithGoogle2, signOut } from '../../store/auth/slice'
import { api } from '../../services/axios'

export const Profile: React.FC = () => {
  const dispatch = useDispatch()

  async function teste() {
    try {
      await api.post('/libraries/new', {
        name: 'teste 1438',
      })
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        dispatch(signOut())
      }
      console.log(JSON.stringify(error.response.data))
    }
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={teste}>
        <Text>Profile2</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
