import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  VirtualizedList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CovidTopCard from '../CovidTopCard';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyle';
import Loading from '../Loading';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchIndiaData,
  fetchWorldData,
  fetchStateData,
} from '../../store/actions/covidActions';

const CovidData = ({title, state}) => {
  const navigation = useNavigation();
  const colors = useTheme().colors;
  const dispatch = useDispatch();

  const indiaData = useSelector(state => state.indiaCases.statewise);
  const worldData = useSelector(state => state.worldCases);
  const stateData = useSelector(state => state.state_district_wise);
  const zoneData = useSelector(state => state.zones);

  useEffect(() => {
    if (title === 'india' && indiaData === null) {
      dispatch(fetchIndiaData());
    }
    if (title === 'world' && worldData === null) {
      dispatch(fetchWorldData());
    }
    if (title === 'state' && state && stateData === null) {
      dispatch(fetchStateData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, indiaData, worldData, stateData]);

  const onStatePress = state => {
    navigation.navigate('covid state', {
      state,
    });
  };

  const getItem = (data, index) => {
    if (title === 'state') {
      return {
        ...data[index],
        zone: zoneData.filter(value => {
          return data[index].district === value.district;
        })[0]
          ? zoneData.filter(value => {
              return data[index].district === value.district;
            })[0].zone
          : '',
      };
    } else {
      return {...data[index]};
    }
  };

  if (
    (title === 'india' && !indiaData) ||
    (title === 'world' && !worldData) ||
    (title === 'state' && (!stateData || !zoneData))
  ) {
    return <Loading />;
  }

  return (
    <>
      <View>
        <View style={[styles.topCard, globalStyles.container]}>
          <CovidTopCard
            color="orange"
            label="Confirmed"
            currentCases={
              title === 'india'
                ? indiaData[0].deltaconfirmed
                : title === 'world'
                ? worldData.Global.NewConfirmed
                : state.deltaconfirmed
            }
            cases={
              title === 'india'
                ? indiaData[0].confirmed
                : title === 'world'
                ? worldData.Global.TotalConfirmed
                : state.confirmed
            }
          />
          <CovidTopCard
            color="green"
            label="Recovered"
            currentCases={
              title === 'india'
                ? indiaData[0].deltarecovered
                : title === 'world'
                ? worldData.Global.NewRecovered
                : state.deltarecovered
            }
            cases={
              title === 'india'
                ? indiaData[0].recovered
                : title === 'world'
                ? worldData.Global.TotalRecovered
                : state.recovered
            }
          />
          <CovidTopCard
            color="red"
            label="Deaths"
            currentCases={
              title === 'india'
                ? indiaData[0].deltadeaths
                : title === 'world'
                ? worldData.Global.NewDeaths
                : state.deltadeaths
            }
            cases={
              title === 'india'
                ? indiaData[0].deaths
                : title === 'world'
                ? worldData.Global.TotalDeaths
                : state.deaths
            }
          />
        </View>
        {title === 'state' ? (
          <Text style={styles.zoneTypes}>
            <Icon name="brightness-1" color={colors.covid.Red} size={10} /> Red
            zone
            {'   '}
            <Icon
              name="brightness-1"
              color={colors.covid.Orange}
              size={10}
            />{' '}
            Orange zone
            {'   '}
            <Icon
              name="brightness-1"
              color={colors.covid.Green}
              size={10}
            />{' '}
            Green zone
          </Text>
        ) : null}
        <Text style={styles.lastUpdatedTimeTxt}>
          Last updated time:{' '}
          {title === 'state'
            ? state.lastupdatedtime
            : title === 'india'
            ? indiaData[0].lastupdatedtime
            : title === 'world'
            ? worldData.Date
            : null}
        </Text>
        <View>
          <View style={styles.stateHeader}>
            {title === 'state' ? (
              <Text
                style={[
                  styles.stateHeaderText,
                  {flex: 0.1, textAlign: 'left'},
                ]}>
                Zone
              </Text>
            ) : null}
            <Text
              style={[
                styles.stateHeaderText,
                {flex: title === 'state' ? 0.4 : 0.5, textAlign: 'left'},
              ]}>
              {title === 'india'
                ? 'State'
                : title === 'world'
                ? 'Country'
                : 'District'}
            </Text>
            <Text style={styles.stateHeaderText}>Confirmed</Text>
            <Text style={styles.stateHeaderText}>Recovered</Text>
            <Text style={styles.stateHeaderText}>Deaths</Text>
          </View>
          <VirtualizedList
            contentContainerStyle={[
              styles.listContentStyle,
              title === 'state' ? {paddingBottom: 374} : {paddingBottom: 625},
            ]}
            data={
              title === 'india'
                ? indiaData.sort((a, b) => b.confirmed - a.confirmed)
                : title === 'world'
                ? worldData.Countries.sort(
                    (a, b) => b.TotalConfirmed - a.TotalConfirmed,
                  )
                : stateData
                    .filter(value => {
                      return value.statecode === state.statecode;
                    })[0]
                    .districtData.sort((a, b) => b.confirmed - a.confirmed)
            }
            maxToRenderPerBatch={5}
            keyExtractor={(item, index) => {
              return title === 'india'
                ? item.state + '-' + item.statecode
                : title === 'world'
                ? item.Country + '' + item.CountryCode
                : index + '';
            }}
            getItemCount={item => item.length}
            getItem={getItem}
            getItemLayout={(data, index) => ({
              length: 40,
              offset: 40 * index,
              index,
            })}
            renderItem={({item, index}) => {
              if (
                (title === 'india' && index !== 0) ||
                title === 'world' ||
                title === 'state'
              ) {
                return (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      title === 'india' && item.confirmed > 0
                        ? onStatePress(item)
                        : null
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
                            color={
                              item.zone
                                ? colors.covid[item.zone]
                                : colors.background
                            }
                          />
                        </View>
                      ) : null}
                      <View
                        style={[
                          styles.stateBodyItem,
                          {flex: title === 'state' ? 0.4 : 0.5},
                        ]}>
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
                        <Text style={[styles.stateText, {color: theme.red}]}>
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
                        <Text style={[styles.stateText, {color: theme.green}]}>
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
                        <Text style={[styles.stateText, {color: theme.red}]}>
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
              }
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  stateHeader: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    height: 30,
    marginHorizontal: 8,
  },
  stateHeaderText: {
    flex: 0.25,
    color: '#000',
    textTransform: 'uppercase',
    fontSize: 8,
    textAlign: 'center',
    fontWeight: '700',
  },
  lastUpdatedTimeTxt: {
    fontSize: 10,
    color: theme.red,
    paddingRight: 8,
    textAlign: 'right',
  },
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
  listContentStyle: {
    paddingBottom: 580,
  },
  zoneTypes: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CovidData;
