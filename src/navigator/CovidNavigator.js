import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CovidScreen from '../screens/CovidScreen';
import CovidStateScreen from '../screens/CovidScreen/CovidStateScreen';

const Stack = createStackNavigator();

const CovidNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="covid" component={CovidScreen} />
      <Stack.Screen name="covid state" component={CovidStateScreen} />
    </Stack.Navigator>
  );
};

export default CovidNavigator;
