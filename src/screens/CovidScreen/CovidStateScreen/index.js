import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute, useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CovidData from '../../../components/CovidData';
import ScreenLayout from '../../../components/ScreenLayout';

const CovidStateScreen = () => {
  const navigation = useNavigation();
  const {active, state} = useRoute().params.state;
  const {colors} = useTheme();

  return (
    <ScreenLayout>
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
              ? {color: colors.covid.Red}
              : active >= 500
              ? {color: colors.covid.Orange}
              : {color: colors.covid.Green},
          ]}>
          {state}
        </Text>
      </View>
      <CovidData title="state" state={useRoute().params.state} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
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
