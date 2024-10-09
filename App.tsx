import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Main from './src/screen/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Screen1 from './src/screen/Screen1';
import CompleteScreen from './src/screen/CompleteScreen';
import PPUScreen from './src/screen/PPUScreen';


const App = () => {
  const Stack = createStackNavigator()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen name='Screen1' component={Screen1} options={{ headerTitle: '' }} />
          <Stack.Screen name='main' component={Main} options={{ headerTitle: '', headerShown: false }} />
          <Stack.Screen name='PPUScreen' component={PPUScreen} options={{ headerTitle: '', headerShown: false }} />
          <Stack.Screen name='CompleteScreen' component={CompleteScreen} options={{ headerShown: false, headerTitle: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  )
}

export default App

const styles = StyleSheet.create({})