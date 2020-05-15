import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import CityScreen from '../screens/SearchScreen/CityScreen';

const SearchStack = createStackNavigator();
const SearchNavigator = () => {
  return (
    <SearchStack.Navigator headerMode="none">
      <SearchStack.Screen name="search" component={SearchScreen} />
      <SearchStack.Screen name="city screen" component={CityScreen} />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
