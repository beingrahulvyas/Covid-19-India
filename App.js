/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
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

export default App;
