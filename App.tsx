import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Main from './src/screen/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Screen1 from './src/screen/Screen1';
import CompleteScreen from './src/screen/CompleteScreen';
import PPUScreen from './src/screen/PPUScreen';
import FirstScreen from './src/screen/FirstScreen';
import ChineseCompleteScreen from './src/screen/ChineseScreen/ChineseCompleteScreen';
import ChineseMainScreen from './src/screen/ChineseScreen/ChineseMainScreen';
import ChinesePPUScreen from './src/screen/ChineseScreen/ChinesePPUScreen';
import ChineseScreen1 from './src/screen/ChineseScreen/ChineseScreen1';
import CompletePPUScreen from './src/screen/CompletePPUScreen';
import ChinesePPUCompleteScreen from './src/screen/ChineseScreen/ChinesePPUCompleteScreen';


const App = () => {
  const Stack = createStackNavigator()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen name='FirstScreen' component={FirstScreen} options={{ headerTitle: '',headerShown: false }} />
          <Stack.Screen name='Screen1' component={Screen1} options={{ headerTitle: '',headerShown: false }} />
          <Stack.Screen name='main' component={Main} options={{ headerTitle: '', headerShown: false }} />
          <Stack.Screen name='PPUScreen' component={PPUScreen} options={{ headerTitle: '', headerShown: false }} />
          <Stack.Screen name='CompleteScreen' component={CompleteScreen} options={{ headerShown: false, headerTitle: '' }} />
          <Stack.Screen name='ChineseCompleteScreen' component={ChineseCompleteScreen} options={{ headerShown: false, headerTitle: '' }} />
          <Stack.Screen name='ChineseMainScreen' component={ChineseMainScreen} options={{ headerShown: false, headerTitle: '' }}  />
          <Stack.Screen name='ChinesePPUScreen' component={ChinesePPUScreen} options={{headerShown:false, headerTitle:''}} />
          <Stack.Screen name='ChineseScreen1' component={ChineseScreen1} options={{headerShown:false, headerTitle:''}} />
          <Stack.Screen name='CompletePPUScreen' component={CompletePPUScreen} options={{headerShown:false, headerTitle:''}}/>
          <Stack.Screen name='ChinesePPUCompleteScreen' component={ChinesePPUCompleteScreen} options={{headerShown:false, headerTitle:''}} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  )
}

export default App

const styles = StyleSheet.create({})