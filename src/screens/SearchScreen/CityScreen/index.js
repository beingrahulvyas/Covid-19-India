import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchStateData} from '../../../store/actions/covidActions';
import OverviewHeader from '../../../components/OverviewHeader';

const CityScreen = () => {
  const navigation = useNavigation();
  const {state, city} = useRoute().params;
  const colors = useTheme().colors;
  const dispatch = useDispatch();

  const resourceData = useSelector(state => state.resources);
  const state_district_wise = useSelector(state => state.state_district_wise);
  const zones = useSelector(state => state.zones);

  const [cityResources, setCityResources] = useState(null);
  const [cityCurrentData, setCityCurrentData] = useState(null);
  const [zone, setZone] = useState(null);

  const resourceBodyTxtViewFlat = StyleSheet.flatten([
    styles.resourceHeaderTxtView,
    {
      paddingVertical: 8,
    },
  ]);

  // get city resources
  useEffect(() => {
    let cityData = resourceData.filter(value => {
      return value.state === state && value.city === city;
    });
    setCityResources(cityData);
  }, [city, resourceData, state]);

  // get current day city cases
  useEffect(() => {
    if (!state_district_wise) {
      dispatch(fetchStateData());
    } else {
      let currentStateData = state_district_wise.filter(value => {
        return value.state === state;
      });
      let currentCityData =
        currentStateData[0] &&
        currentStateData[0].districtData.filter(
          value => value.district === city,
        )[0];
      setCityCurrentData(currentCityData);
    }
  }, [city, dispatch, state, state_district_wise]);

  useEffect(() => {
    if (zones && !zone) {
      let currentZone = zones.filter(value => value.district === city)[0];
      let currentCityZone = currentZone && currentZone.zone;
      setZone(currentCityZone);
    }
  }, [city, zone, zones]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="keyboard-backspace"
          size={30}
          color="#000"
        />
        <Text style={[styles.headerTxt, {color: colors.primary}]}>{city}</Text>
      </View>
      <ScrollView>
        {zone && (
          <Text style={styles.zoneText}>
            <Text>Zone: </Text>
            <Text style={{color: colors.covid[zone]}}>{zone}</Text>
          </Text>
        )}
        {cityCurrentData && (
          <OverviewHeader
            columns={3}
            data={[
              {
                key: 'city-confirmed-0',
                title: 'confirmed',
                current: cityCurrentData.delta.confirmed,
                total: cityCurrentData.confirmed,
                color: 'Orange',
              },
              {
                key: 'city-recovered-1',
                title: 'Recovered',
                current: cityCurrentData.delta.recovered,
                total: cityCurrentData.recovered,
                color: 'Green',
              },
              {
                key: 'city-death-1',
                title: 'Deaths',
                current: cityCurrentData.delta.deceased,
                total: cityCurrentData.deceased,
                color: 'Red',
              },
              {
                key: 'city-active-1',
                title: 'Active',
                total: cityCurrentData.active,
                color: 'Red',
              },
            ]}
          />
        )}
        {cityResources && (
          <View style={styles.resourcesView}>
            <Text style={styles.resourceTitleTxt}>Resources</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.resourceContainer}>
                <View
                  style={[
                    styles.resourceHeaderView,
                    {backgroundColor: colors.grey1},
                  ]}>
                  <View style={[styles.resourceHeaderTxtView, {width: 100}]}>
                    <Text style={[styles.resourceHeaderTxt]}>Category</Text>
                  </View>
                  <View style={[styles.resourceHeaderTxtView, {width: 100}]}>
                    <Text style={styles.resourceHeaderTxt}>Organisation</Text>
                  </View>
                  <View style={[styles.resourceHeaderTxtView, {width: 300}]}>
                    <Text style={styles.resourceHeaderTxt}>Description</Text>
                  </View>
                  <View style={[styles.resourceHeaderTxtView, {width: 100}]}>
                    <Text style={styles.resourceHeaderTxt}>Phone</Text>
                  </View>
                </View>
                {cityResources.map((value, index) => {
                  return (
                    <View
                      key={value.nameoftheorganisation + '-' + index}
                      style={[
                        styles.resourceBodyView,
                        {backgroundColor: colors.background},
                      ]}>
                      <View style={[resourceBodyTxtViewFlat, {width: 100}]}>
                        <Text style={[styles.resourceBodyTxt]}>
                          {value.category}
                        </Text>
                      </View>
                      <View style={[resourceBodyTxtViewFlat, {width: 100}]}>
                        <Text style={styles.resourceBodyTxt}>
                          {value.nameoftheorganisation}
                        </Text>
                      </View>
                      <View style={[resourceBodyTxtViewFlat, {width: 300}]}>
                        <Text style={styles.resourceBodyTxt}>
                          {value.descriptionandorserviceprovided}
                        </Text>
                      </View>
                      <View style={[resourceBodyTxtViewFlat, {width: 100}]}>
                        <Text style={styles.resourceBodyTxt}>
                          {value.phonenumber}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 8,
    flex: 1,
  },
  header: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTxt: {
    fontSize: 18,
    marginLeft: 30,
  },
  zoneText: {
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 10,
  },
  resourceTitleTxt: {
    fontSize: 16,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  resourceContainer: {
    paddingHorizontal: 8,
  },
  resourceHeaderView: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginBottom: 4,
  },
  resourceHeaderTxtView: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  resourceHeaderTxt: {
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  resourceBodyView: {
    flexDirection: 'row',
    minHeight: 30,
    alignItems: 'center',
    elevation: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  resourceBodyTxt: {
    fontSize: 8,
  },
});

export default CityScreen;
