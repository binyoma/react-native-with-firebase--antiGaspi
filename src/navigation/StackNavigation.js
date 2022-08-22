import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'

const StackNavigation = () => {
    const stack = createNativeStackNavigator()
  return (
    <stack.Navigator>
        <stack.Screen name='home' component={Home}/>
    </stack.Navigator>
  )
}

export default StackNavigation