import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

const CovidTopCard = ({color, label, cases, currentCases}) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.cardText, {color: '#000'}]}>{label}</Text>
      <Text style={[styles.cardText, {color: theme.red, letterSpacing: 1}]}>
        [+{currentCases}]
      </Text>
      <Text
        style={[
          styles.cardText,
          {color: theme[color], fontSize: 16, letterSpacing: 1},
        ]}>
        {cases}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    elevation: 10,
    flexBasis: '30%',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  cardText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default CovidTopCard;
