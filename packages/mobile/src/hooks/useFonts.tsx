import * as Font from 'expo-font'

export const useFonts = async () => {
  await Font.loadAsync({
    Nunito_Regular: require('../../assets/fonts/Nunito-Regular.ttf'),
    Nunito_Bold: require('../../assets/fonts/Nunito-Bold.ttf'),
  })
}
