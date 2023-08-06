import React from 'react'
import { View, Text } from 'react-native'

interface IHeader {
  text?: string
  children: React.ReactNode
}

export function Header({ children, text }: IHeader) {
  return (
    <View className='mt-[27px] flex-row w-full justify-between items-center'>
      <View>
        {children}
        <Text>{text}</Text>
      </View>
      <View className='bg-gray-600 w-[60px] h-[60px] rounded-full' />
    </View>
  )
}
