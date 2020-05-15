import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../../../styles/globalStyle';
import {theme} from '../../../styles/theme';
import CovidData from '../../../components/CovidData';

const CovidStateScreen = () => {
  const navigation = useNavigation();
  const {active, state} = useRoute().params.state;

  return (
    <View style={globalStyles.screen}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="keyboard-backspace"
          size={30}
          color="#000"
        />
        <Text
          style={[
            styles.headerTxt,
            active >= 1000
              ? {color: theme.red}
              : active >= 500
              ? {color: theme.orange}
              : {color: theme.green},
          ]}>
          {state}
        </Text>
      </View>
      <CovidData title="state" state={useRoute().params.state} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {},
  header: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTxt: {
    fontSize: 18,
    marginLeft: 30,
  },
});

export default CovidStateScreen;
