import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import CovidNavigator from './CovidNavigator';
import SearchNavigator from './SearchNavigator';

const TabLayout = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabView}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tabLabelStyle = StyleSheet.flatten([
          styles.tabLabel,
          {
            color: isFocused ? '#32a6a8' : '#000000',
          },
        ]);

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={route.key}
            style={styles.tabBtn}>
            <Text style={tabLabelStyle}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: '#ffffff',
  },
  tabBtn: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontWeight: '700',
  },
});

const Tab = createBottomTabNavigator();
const HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabLayout {...props} />}
      initialRouteName="covid">
      <Tab.Screen
        name="covid"
        component={CovidNavigator}
        options={{title: <Icon name="md-home" size={20} />}}
      />
      <Tab.Screen
        name="search"
        component={SearchNavigator}
        options={{title: <Icon name="md-search" size={20} />}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
