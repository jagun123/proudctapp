import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, FlatList, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import store from '../redux/store';
import { addToCart } from './redux/action';
import CartScreen from '../screen/CartScreen';
import HomeScreen from '../screen/HomeScreen';

const Stack = createNativeStackNavigator();
const NavigationScreen = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Shopping"   component={HomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    </NavigationContainer> 
    </Provider>
  )
}

export default NavigationScreen