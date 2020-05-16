import React, {memo} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useTheme} from '@react-navigation/native';

const CovidListItem = ({title, item, index}) => {
  const navigation = useNavigation();
  const colors = useTheme().colors;

  const onStatePress = state => {
    navigation.navigate('covid state', {
      state,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        title === 'india' && item.confirmed > 0 ? onStatePress(item) : null
      }>
      <View
        style={styles.stateBody}
        key={
          title === 'india'
            ? item.state + '-' + item.statecode
            : title === 'world'
            ? item.Country + '' + item.CountryCode
            : index
        }>
        {title === 'state' ? (
          <View style={[styles.stateBodyItem, {flex: 0.1}]}>
            <Icon
              name="brightness-1"
              color={item.zone ? colors.covid[item.zone] : colors.background}
            />
          </View>
        ) : null}
        <View
          style={[styles.stateBodyItem, {flex: title === 'state' ? 0.4 : 0.5}]}>
          <Text style={[styles.stateText, {textAlign: 'left'}]}>
            {title === 'india'
              ? item.state
              : title === 'world'
              ? item.Country
              : item.district}
          </Text>
        </View>
        <View style={styles.stateBodyItem}>
          <Text style={styles.stateText}>
            {title === 'india'
              ? item.confirmed
              : title === 'world'
              ? item.TotalConfirmed
              : item.confirmed}
          </Text>
          <Text style={[styles.stateText, {color: colors.covid.Red}]}>
            [+
            {title === 'india'
              ? item.deltaconfirmed
              : title === 'world'
              ? item.NewConfirmed
              : item.delta.confirmed}
            ]
          </Text>
        </View>
        <View style={styles.stateBodyItem}>
          <Text style={styles.stateText}>
            {title === 'india'
              ? item.recovered
              : title === 'world'
              ? item.TotalRecovered
              : item.recovered}
          </Text>
          <Text style={[styles.stateText, {color: colors.covid.Green}]}>
            [+
            {title === 'india'
              ? item.deltarecovered
              : title === 'world'
              ? item.NewRecovered
              : item.delta.recovered}
            ]
          </Text>
        </View>
        <View style={styles.stateBodyItem}>
          <Text style={styles.stateText}>
            {title === 'india'
              ? item.deaths
              : title === 'world'
              ? item.TotalDeaths
              : item.deceased}
          </Text>
          <Text style={[styles.stateText, {color: colors.covid.Red}]}>
            [+
            {title === 'india'
              ? item.deltadeaths
              : title === 'world'
              ? item.NewDeaths
              : item.delta.deceased}
            ]
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  stateBody: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginHorizontal: 8,
    paddingVertical: 4,
    elevation: 10,
    borderRadius: 4,
    marginBottom: 8,
    height: 40,
    alignItems: 'center',
    marginTop: 2,
  },
  stateBodyItem: {
    flex: 0.25,
  },
  stateText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#000',
  },
});

export default memo(CovidListItem);
