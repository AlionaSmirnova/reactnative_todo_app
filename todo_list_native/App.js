/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState} from 'react';
import { connect } from "react-redux";
import { Provider } from 'react-redux';
import { Store } from './src/store/store';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from 'react-navigation';

import HomeScreen from './src/components/HomeScreen';
import AddTask from './src/components/AddTask';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <Provider store={Store}> 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main"  options={{ title:'Головна', headerTitleAlign:'center'}} component={HomeScreen} />
        <Stack.Screen name="Create"  options={{ title: 'Створити',headerTitleAlign:'center'}}  component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


export default App;
