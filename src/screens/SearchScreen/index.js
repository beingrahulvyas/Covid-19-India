import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  VirtualizedList,
  Alert,
} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import {fetchResources} from '../../store/actions/covidActions';

const SearchScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const resourcesData = useSelector(state => state.resources);

  const [isStateOptionShow, setIsStateOptionShow] = useState(false);
  const [isCityOptionShow, setIsCityOptionShow] = useState(false);
  const [searchData, setSearchData] = useState({
    state: '',
    city: '',
  });

  useEffect(() => {
    if (!resourcesData) {
      dispatch(fetchResources());
    }
  }, [dispatch, resourcesData]);

  const getOptionsItem = (item, index) => {
    return {...item};
  };

  const getCityOptionsItem = (item, index) => {
    return {...item};
  };

  const onOptionHandler = name => {
    setIsStateOptionShow(!isStateOptionShow);
    setIsCityOptionShow(false);
  };

  const onOptionTouchedHandler = async (item, index) => {
    setSearchData({city: '', state: item});
    setIsStateOptionShow(false);
  };

  const onCityOptionTouchedHandler = (item, index) => {
    setSearchData({...searchData, city: item});
    setIsCityOptionShow(false);
  };

  const onCityOptionHandler = () => {
    setIsCityOptionShow(!isCityOptionShow);
  };

  const onSearchHandler = () => {
    searchData.state
      ? searchData.city
        ? navigation.navigate('city screen', {
            city: searchData.city,
            state: searchData.state,
          })
        : Alert.alert(
            'Required',
            'Please select any city from your selected state',
          )
      : Alert.alert('Required', 'Please select any state and city');
  };

  if (!resourcesData) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.searchBox}>
        <Text style={[styles.titleTxt, {color: colors.text}]}>
          Find details about Corona cases and services for your city
        </Text>
        <Text style={[styles.sourceTxt, {color: colors.text}]}>
          Source: https://www.covid19india.org/
        </Text>
        <View style={styles.stateContainer}>
          <TouchableWithoutFeedback onPress={() => onOptionHandler('state')}>
            <View
              style={[
                styles.selectTxtView,
                {borderColor: colors.text, backgroundColor: colors.background},
              ]}>
              <Text style={styles.selectTxt}>
                {searchData.state ? searchData.state : 'State'}
              </Text>
              <Icon name="md-arrow-dropdown" size={20} />
            </View>
          </TouchableWithoutFeedback>
          {isStateOptionShow ? (
            <View
              style={[
                styles.optionListView,
                {backgroundColor: colors.background},
              ]}>
              <VirtualizedList
                data={[...new Set(resourcesData.map(item => item.state))]}
                style={styles.optionList}
                getItem={getOptionsItem}
                getItemCount={item => item.length}
                keyExtractor={(item, index) => item[index]}
                renderItem={({item, index}) => (
                  <View style={styles.optionsView}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        onOptionTouchedHandler(item[index], index)
                      }>
                      <Text
                        style={[
                          styles.optionTxt,
                          {
                            backgroundColor:
                              searchData.state === item[index]
                                ? colors.primary
                                : index % 2 === 0
                                ? colors.background
                                : colors.grey1,
                            color:
                              searchData.state === item[index]
                                ? colors.background
                                : colors.text,
                          },
                        ]}>
                        {item[index]}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                )}
              />
            </View>
          ) : null}
        </View>
        <View style={styles.cityContainer}>
          <TouchableWithoutFeedback onPress={onCityOptionHandler}>
            <View
              style={[
                styles.selectTxtView,
                {borderColor: colors.text, backgroundColor: colors.background},
              ]}>
              <Text style={styles.selectTxt}>
                {searchData.city ? searchData.city : 'City'}
              </Text>
              <Icon name="md-arrow-dropdown" size={20} />
            </View>
          </TouchableWithoutFeedback>
          {isCityOptionShow && searchData.state ? (
            <View
              style={[
                styles.optionListView,
                {backgroundColor: colors.background},
              ]}>
              <VirtualizedList
                data={[
                  ...new Set(
                    resourcesData
                      .filter(value => value.state === searchData.state)
                      .map(value => value.city),
                  ),
                ]}
                style={styles.optionList}
                getItem={getCityOptionsItem}
                getItemCount={item => item.length}
                keyExtractor={(item, index) => item[index]}
                renderItem={({item, index}) => (
                  <View style={styles.optionsView}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        onCityOptionTouchedHandler(item[index], index)
                      }>
                      <Text
                        style={[
                          styles.optionTxt,
                          {
                            backgroundColor:
                              searchData.city === item[index]
                                ? colors.primary
                                : index % 2 === 0
                                ? colors.background
                                : colors.grey1,
                            color:
                              searchData.city === item[index]
                                ? colors.background
                                : colors.text,
                          },
                        ]}>
                        {item[index]}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                )}
              />
            </View>
          ) : null}
        </View>
        <View />
        <View style={styles.searchBtnView}>
          <TouchableWithoutFeedback
            style={styles.searchBtn}
            onPress={onSearchHandler}>
            <Text style={[styles.searchBtnTxt, {color: colors.primary}]}>
              Search
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'center',
  },
  searchBox: {
    paddingHorizontal: 8,
    position: 'relative',
  },
  titleTxt: {
    marginBottom: 36,
    maxWidth: 240,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
  },
  sourceTxt: {
    textAlign: 'center',
    fontSize: 8,
    marginBottom: 36,
  },
  stateContainer: {
    marginBottom: 8,
  },
  selectTxtView: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
  },
  selectTxt: {
    fontSize: 14,
  },
  optionListView: {
    height: 200,
    elevation: 24,
    paddingVertical: 8,
    borderRadius: 4,
    position: 'absolute',
    width: '100%',
    top: 42,
    zIndex: 90,
  },
  optionList: {
    zIndex: 99,
    position: 'relative',
    backgroundColor: '#fff',
  },
  optionTxt: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    position: 'relative',
  },
  searchBtnView: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 16,
    elevation: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  searchBtnTxt: {
    textAlign: 'center',
    paddingVertical: 8,
    fontWeight: '700',
  },
});

export default SearchScreen;
