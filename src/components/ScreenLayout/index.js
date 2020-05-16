import React from 'react';
import {View, StyleSheet} from 'react-native';

const ScreenLayout = ({children}) => {
  return <View style={styles.screenLayout}>{children}</View>;
};

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default ScreenLayout;
