import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

const OverviewHeader = ({
  columns,
  data = [
    {
      key: 0,
      title: 'title',
      current: 0,
      total: 0,
      textAlign: null,
      color: null,
    },
  ],
}) => {
  const {colors} = useTheme();

  const cardItemFlat = StyleSheet.flatten([
    styles.cardItem,
    {
      backgroundColor: colors.background,
      flexBasis: 100 / columns - 3 + '%',
    },
  ]);

  return (
    <View style={[styles.overview]}>
      {data.map(value => {
        return (
          <View style={cardItemFlat} key={value.key}>
            <Text
              style={[
                styles.cardTxt,
                {
                  textAlign: value.textAlign ? value.textAlign : 'center',
                  color: colors.text,
                },
              ]}>
              {value.title}
            </Text>
            {value.current ? (
              <Text
                style={[
                  styles.cardTxt,
                  {
                    textAlign: value.textAlign ? value.textAlign : 'center',
                    color: value.color
                      ? colors.covid['light' + value.color]
                      : colors.text,
                  },
                ]}>
                [+{value.current}]
              </Text>
            ) : null}
            <Text
              style={[
                styles.cardTxt,
                {
                  textAlign: value.textAlign ? value.textAlign : 'center',
                  color: value.color ? colors.covid[value.color] : colors.text,
                  letterSpacing: 1,
                  fontSize: 16,
                },
              ]}>
              {value.total}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

OverviewHeader.defaultProps = {
  columns: 3,
};

const styles = StyleSheet.create({
  overview: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  cardItem: {
    elevation: 10,
    paddingHorizontal: 2,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  cardTxt: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default OverviewHeader;
