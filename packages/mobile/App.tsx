import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { Routes } from './src/routes'
import { useCallback, useEffect, useState } from 'react'
import { useFonts } from './src/hooks/useFonts'
import { View, Text } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts()
      } catch (e) {
        console.warn(e)
      } finally {
        console.log(true)
        setIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <>
      <View onLayout={onLayoutRootView}></View>
      <StatusBar style='light' />
      <Routes />
    </>
  )
}
