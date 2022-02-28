import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Alert,
  Button,
  Modal,
  StyleSheet,
  LogBox,
} from 'react-native';
import Toolbar from '../../components/toolbar';
import {AppColors} from '../../constants/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {useDispatch, useSelector} from 'react-redux';
import {DASHBOARD, LOADING} from '../../store/action';
import {useIsFocused} from '@react-navigation/native';
import strings from '../../constants/localization';
import {AppState} from 'react-native';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const Portfolio = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [searchInput, setSearchInput] = useState('');
  const [reports, setReports] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [modalVisible, setModalVisible] = useState(false);
  const [amontVisible, setAmontVisible] = useState(false);
  const [saveSOrt, setSaveSOrt] = useState('RELVANCE');

  LogBox.ignoreLogs(['EventEmitter.removeListener']);

  const dashboardData = useSelector(state => state.dashboard.dashboardData);
  const loginToken = useSelector(state => state.login.accessToken);
  console.log('dashboardData', dashboardData);
  useEffect(() => {
    // if(rollPermision){
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
    // }
  }, []);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      navigation.navigate('ReEnterBG');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  //Device Back Button Action
  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    } else {
      navigation.goBack();
    }
    return true;
  };
  useEffect(() => {
    dispatch({
      type: DASHBOARD,
      payload: {
        token: loginToken,
      },
    });
    //Device Back Button Handle
    if (route.name === 'Portfolio') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);

  useEffect(() => {
    setReports(dashboardData.result);
  }, [dashboardData]);

  const images = [
    {
      id: '101',
      image:
        'https://i.gadgets360cdn.com/large/bitcoin_image_1626263439264.jpg?downsize=950:*',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      id: '102',
      image:
        'https://www.slashgear.com/wp-content/uploads/2018/01/tron23523.jpg',
      desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
    {
      id: '103',
      image:
        'https://cdn.arstechnica.net/wp-content/uploads/2019/01/etc-800x534.jpeg',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      id: '104',
      image:
        'https://static01.nyt.com/images/2013/11/25/business/Bitcoin/Bitcoin-tmagArticle.jpg',
      desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
    {
      id: '105',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo5M5iINTLJXyCsq87CZz3mypUlnfiDL6JErxoz8dtmK9B0LmC_Yvm23G_6PmjqSwoJS8&usqp=CAU',
      desc: 'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
  ];

  const searchText = e => {
    setSearchInput(e);
    const text = e.charAt(0).toUpperCase() + e.slice(1);
    let filterData = dashboardData.result
      .filter(function (item) {
        return (
          item.name.includes(text) ||
          item.totalBalance == text ||
          item.totalUsdBalance == text
        );
      })
      .map(function ({
        name,
        image,
        totalBalance,
        totalUsdBalance,
        information,
      }) {
        return {name, image, totalBalance, totalUsdBalance, information};
      });
    if (filterData.length == 0) {
      setReports(dashboardData.result);
    } else {
      setReports(filterData);
    }
  };

  const dynamicSort = property => {
    var sortOrder = 1;

    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };
  const sortName = () => {
    setSaveSOrt('NAME');
    setModalVisible(!modalVisible);
    const filterData = dashboardData.result.sort(dynamicSort('name'));
    if (filterData.length == 0) {
      setReports(dashboardData.result);
    } else {
      setReports(filterData);
    }
  };

  const sortAmount = () => {
    setSaveSOrt('AMOUNT');
    setModalVisible(!modalVisible);
    let filterData = dashboardData.result
      .sort(function (item) {
        const convertSTR = item.totalBalance.toString();
        dynamicSort(convertSTR);
      })
      .map(function ({
        name,
        image,
        totalBalance,
        totalUsdBalance,
        information,
      }) {
        return {name, image, totalBalance, totalUsdBalance, information};
      });
    if (filterData.length == 0) {
      setReports(dashboardData.result);
    } else {
      setReports(filterData);
    }
  };

  const sortRelevence = () => {
    setSaveSOrt('RELEVENCE');
    setModalVisible(!modalVisible);
    dispatch({
      type: DASHBOARD,
      payload: {
        token: loginToken,
      },
    });
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SelectAccount', {itemData: item})
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 8,
            }}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 40, height: 40}}
                  source={{
                    uri: item.image,
                  }}
                  resizeMode={'cover'}
                />
                <View style={{width: '40%'}}>
                  <Text
                    style={{
                      color: AppColors().title,
                      marginLeft: 16,
                      fontSize: textSize.h4,
                      fontFamily: fontName.NormalFont,
                      fontWeight: '700',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: AppColors().title,
                      marginLeft: 16,
                      fontSize: textSize.h4,
                      fontFamily: fontName.NormalFont,
                      fontWeight: '700',
                    }}>
                    {null}
                  </Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text
                    style={{
                      color: AppColors().title,
                      fontSize: textSize.h6,
                      fontFamily: fontName.NormalFont,
                      fontWeight: '500',
                    }}>
                    $
                    {parseFloat(item.rate).toFixed(2).toString() == 'NaN'
                      ? '0.00'
                      : parseFloat(item.rate).toFixed(2).toString()}
                  </Text>
                  <Text
                    style={{
                      color: AppColors().red,
                      fontSize: textSize.h6,
                      fontFamily: fontName.NormalFont,
                      fontWeight: '400',
                    }}>
                    -1.28%
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: AppColors().title,
                  fontSize: textSize.h6,
                  fontFamily: fontName.NormalFont,
                  fontWeight: '600',
                }}>
                {''}
              </Text>
              <Text
                style={{
                  color: 'red',
                  fontFamily: fontName.NormalFont,
                  fontSize: textSize.h6,
                }}>
                {''}
              </Text>
            </View>
            {amontVisible ? (
              <Text
                style={{
                  color: AppColors().heading,
                  fontSize: textSize.h2,
                  fontWeight: 'bold',
                  marginHorizontal: 4,
                  fontFamily: fontName.NormalFont,
                }}>
                *****
              </Text>
            ) : (
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{
                    color: AppColors().title,
                    fontSize: textSize.h6,
                    fontFamily: fontName.NormalFont,
                    fontWeight: '400',
                  }}>
                  {parseFloat(item.totalBalance).toFixed(4).toString()}
                </Text>
                <Text
                  style={{
                    color: AppColors().subTitle,
                    fontFamily: fontName.NormalFont,
                    fontSize: textSize.h6,
                  }}>
                  = {parseFloat(item.totalUsdBalance).toFixed(4).toString()}{' '}
                  {strings.USD}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Toolbar
        title={strings.Portfolio}
        navigation={navigation}
        isBack={false}
        isAdd={true}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors().background,
          padding: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                color: AppColors().title,
                fontSize: textSize.h4,
                fontWeight: 'bold',
                fontFamily: fontName.NormalFont,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: AppColors().subTitle,
                fontSize: textSize.h6,
                marginVertical: 4,
                fontFamily: fontName.NormalFont,
              }}>
              15 {strings.Account} /24 {strings.Crypto}
            </Text>
          </View>
          <Icon
            style={{margin: 10}}
            name={amontVisible ? 'md-eye' : 'md-eye-off'}
            size={24}
            color={AppColors().borderColor}
            onPress={() => setAmontVisible(!amontVisible)}
          />
        </View>
        <View
          style={{flexDirection: 'row', marginVertical: 4, marginBottom: 20}}>
          {amontVisible ? null : (
            <FontAwesome
              style={{marginTop: 5}}
              name="dollar"
              size={18}
              color={AppColors().white}
            />
          )}
          <Text
            style={{
              color: AppColors().heading,
              fontSize: textSize.h2,
              fontWeight: 'bold',
              marginHorizontal: 4,
              fontFamily: fontName.NormalFont,
            }}>
            {amontVisible
              ? '*****'
              : parseFloat(dashboardData.totalUsdBalance)
                  .toFixed(2)
                  .toString() == 'NaN'
              ? '0.00'
              : parseFloat(dashboardData.totalUsdBalance).toFixed(2).toString()}
          </Text>
        </View>
        <FlatListSlider
          data={images}
          height={120}
          width={300}
          timer={3000}
          onPress={item => alert(images[item].id)}
          indicatorActiveWidth={20}
          contentContainerStyle={{paddingRight: 20, borderRadius: 28}}
        />
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <TextInput
            style={{
              width: '70%',
              borderWidth: 1,
              borderColor: AppColors().borderColor,
              borderRadius: 30,
              paddingHorizontal: 20,
              color: AppColors().title,
            }}
            placeholder="Search"
            placeholderTextColor={AppColors().borderColor}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={searchInput}
            placeholderTextColor={AppColors().white}
            onChangeText={e => searchText(e)}
          />
          <View
            style={{width: '30%', flexDirection: 'row', paddingHorizontal: 6}}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View
                style={{
                  padding: 4,
                  backgroundColor: AppColors().headerColor,
                  borderRadius: 24,
                  marginRight: 4,
                }}>
                <Icon
                  style={{margin: 10}}
                  name="list"
                  size={20}
                  color={AppColors().iconColor}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                padding: 4,
                backgroundColor: AppColors().headerColor,
                borderRadius: 25,
                marginLeft: 4,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SelectToken')}>
                <Icon
                  style={{margin: 10}}
                  name="options-outline"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          style={{marginTop: 16}}
          // data={dashboardData.result}
          data={filterData && filterData.length > 0 ? filterData : reports}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {modalVisible == true ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{backgroundColor: AppColors().white, top: '65%'}}>
            <View
              style={{
                backgroundColor: AppColors().white,
                height: '12%',
                width: '100%',
                alignItems: 'center',
                // bottom: '3%',
                borderTopColor: AppColors().gray,
                borderTopWidth: 5,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={defaultStyles.Subtitle}>
                  Sorted By: {saveSOrt}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors().white,
                height: '12%',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: AppColors().gray,
              }}
              onPress={() => sortRelevence()}>
              <Text style={defaultStyles.title}>RELEVENCE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors().white,
                height: '12%',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: AppColors().gray,
              }}
              onPress={() => sortName()}>
              <Text style={defaultStyles.title}>NAME</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors().white,
                height: '12%',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderBottomColor: AppColors().gray,
              }}
              onPress={() => sortAmount()}>
              <Text style={defaultStyles.title}>AMOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors().white,
                height: '10%',
                width: '100%',
                alignItems: 'center',
                //bottom: '53%',
                borderTopColor: AppColors().gray,
                borderTopWidth: 5,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={defaultStyles.title}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Portfolio;

const defaultStyles = StyleSheet.create({
  Subtitle: {
    color: 'grey',
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
    top: 10,
    fontWeight: '900',
  },
  title: {
    fontSize: textSize.h4,
    fontWeight: '700',
    top: 10,
    color: '#5559e0',
    fontFamily: fontName.NormalFont,
  },
});
