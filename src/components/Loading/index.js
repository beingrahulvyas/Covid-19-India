import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Loading = () => {
  const {colors} = useTheme();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 150,
  },
});

export default Loading;
