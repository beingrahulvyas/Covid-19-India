import React, {useEffect} from 'react';
import {Text, View, StyleSheet, VirtualizedList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../styles/theme';
import Loading from '../Loading';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchIndiaData,
  fetchWorldData,
  fetchStateData,
} from '../../store/actions/covidActions';
import OverviewHeader from '../OverviewHeader';
import CovidListItem from '../CovidListItem';

const CovidData = ({title, state}) => {
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
    <View>
      <OverviewHeader
        columns={3}
        data={[
          {
            color: 'Orange',
            title: 'Confirmed',
            key: 'overviewTotal-Confirmed-' + 0,
            current:
              title === 'india'
                ? indiaData[0].deltaconfirmed
                : title === 'world'
                ? worldData.Global.NewConfirmed
                : state.deltaconfirmed,
            total:
              title === 'india'
                ? indiaData[0].confirmed
                : title === 'world'
                ? worldData.Global.TotalConfirmed
                : state.confirmed,
          },
          {
            color: 'Green',
            title: 'Recovered',
            key: 'overviewTotal-Recovered-' + 1,
            current:
              title === 'india'
                ? indiaData[0].deltarecovered
                : title === 'world'
                ? worldData.Global.NewRecovered
                : state.deltarecovered,
            total:
              title === 'india'
                ? indiaData[0].recovered
                : title === 'world'
                ? worldData.Global.TotalRecovered
                : state.recovered,
          },
          {
            color: 'Red',
            title: 'Deaths',
            key: 'overviewTotal-Deaths-' + 2,
            current:
              title === 'india'
                ? indiaData[0].deltadeaths
                : title === 'world'
                ? worldData.Global.NewDeaths
                : state.deltadeaths,
            total:
              title === 'india'
                ? indiaData[0].deaths
                : title === 'world'
                ? worldData.Global.TotalDeaths
                : state.deaths,
          },
        ]}
      />
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
          <Icon name="brightness-1" color={colors.covid.Green} size={10} />{' '}
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
              style={[styles.stateHeaderText, {flex: 0.1, textAlign: 'left'}]}>
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
          contentContainerStyle={
            title === 'state' ? {paddingBottom: 470} : {paddingBottom: 695}
          }
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
          maxToRenderPerBatch={12}
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
              return <CovidListItem title={title} item={item} index={index} />;
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  zoneTypes: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CovidData;
