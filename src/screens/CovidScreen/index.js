import React, {useState} from 'react';
import {Text, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyle';
import {theme} from '../../styles/theme';
import CovidData from '../../components/CovidData';
import {useTheme} from '@react-navigation/native';

const CovidScreen = () => {
  const [activeNav, setActiveNav] = useState('india');

  const colors = useTheme().colors;

  const indiaNavBtnViewFlat = StyleSheet.flatten([
    styles.navBtnView,
    {
      backgroundColor:
        activeNav === 'india' ? colors.covid.Red : colors.background,
    },
  ]);

  const worldNavBtnViewFlat = StyleSheet.flatten([
    styles.navBtnView,
    {
      backgroundColor:
        activeNav === 'world' ? colors.covid.Red : colors.background,
    },
  ]);

  const indiaNavBtnTextFlat = StyleSheet.flatten([
    styles.navBtnText,
    {
      color: activeNav === 'india' ? colors.background : colors.covid.Red,
    },
  ]);

  const worldNavBtnTextFlat = StyleSheet.flatten([
    styles.navBtnText,
    {
      color: activeNav === 'world' ? colors.background : colors.covid.Red,
    },
  ]);

  return (
    <View style={globalStyles.screen}>
      <View>
        <View style={[styles.nav, globalStyles.container]}>
          <TouchableWithoutFeedback
            style={styles.navBtn}
            onPress={() => setActiveNav('india')}
            accessibilityRole="button">
            <View style={indiaNavBtnViewFlat}>
              <Text style={indiaNavBtnTextFlat}>India</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={styles.navBtn}
            onPress={() => setActiveNav('world')}
            accessibilityRole="button">
            <View style={worldNavBtnViewFlat}>
              <Text style={worldNavBtnTextFlat}>World</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.sourceTxt}>
          Source:{' '}
          {activeNav === 'india'
            ? 'https://www.covid19india.org/'
            : 'https://api.covid19api.com/summary'}
        </Text>
        <CovidData title={activeNav} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navBtn: {},
  navBtnView: {
    elevation: 10,
    flex: 0.48,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navBtnText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  sourceTxt: {
    fontSize: 6,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default CovidScreen;
