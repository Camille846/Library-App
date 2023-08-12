import React from 'react'
import { View, Text } from 'react-native'

interface IHeader {
  text?: string
  children?: React.ReactNode
  [x: string]: any
}

export function Header({ children, text, ...rest }: IHeader) {
  return (
    <View className='mt-[27px] flex-row w-full justify-between items-center ' {...rest}>
      <View>
        {children}
        <Text className='font-Nunito_Bold text-[28px] font-bold'>{text}</Text>
      </View>
      <View className='bg-gray-600 w-[60px] h-[60px] rounded-full' />
    </View>
  )
}
