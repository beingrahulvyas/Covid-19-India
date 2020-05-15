/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {Provider} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './src/navigator/HomeNavigator';
import {lightTheme} from './src/assets/Theme/lightTheme';
import store from './src/store';

const App = () => {
  return (
    <NavigationContainer theme={lightTheme}>
      <Provider store={store}>
        <HomeNavigator />
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
