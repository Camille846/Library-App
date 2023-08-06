import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { signInWithGoogle2 } from '../store/auth/slice'

export const Profile: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => dispatch(signInWithGoogle2())}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
