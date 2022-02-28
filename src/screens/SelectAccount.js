import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  SectionList,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';
import {AppColors} from '../constants/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {HISTORY, DASHBOARD, LOADING} from '../store/action';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Clipboard from '@react-native-community/clipboard';
import showMessage from '../components/showMessage';
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const SelectAccount = ({route, navigation}) => {
  const {itemData} = route.params;
  const dispatch = useDispatch();

  const [modelOpen, setModelOpen] = useState(false);
  const [onRefreshing, setOnRefreshing] = useState(false);
  const loginToken = useSelector(state => state.login.accessToken);

  const historyData = useSelector(state => state.dashboard.historyData);
  console.log('historyData', historyData);

  const [copiedText, setCopiedText] = useState('');
  const [historyList, setHistoryList] = useState([]);

  const copyText = text => {
    Clipboard.setString(text);
    fetchCopiedText();
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    //showMessage('Copied Address');
  };

  useEffect(() => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    dispatch({
      type: HISTORY,
      payload: {
        data: {historyType: itemData.symbol},
        token: loginToken,
      },
    });
  }, []);

  useEffect(() => {
    if (Object.keys(historyData).length > 0) {
      setHistoryList(historyData.data.result);
      setOnRefreshing(false);
    }
  }, [historyData]);

  const DATA = [
    {
      id: '1',
      title: strings.SendTitle,
      image: require('../assets/sent.png'),
    },
    {
      id: '2',
      title: strings.ReceiveTitle,
      image: require('../assets/recieve.png'),
    },
    {
      id: '3',
      title: strings.ScanTitle,
      image: require('../assets/scan.png'),
    },
    {
      id: '4',
      title: strings.ChargeArr,
      image: require('../assets/CHARGE.png'),
    },
    {
      id: '5',
      title: strings.BuyTitle,
      image: require('../assets/sent.png'),
    },
  ];

  const onSuccess = res => {
    //setSendAddress(res.data);
    setModelOpen(false);
  };

  const DATA1 = [
    {
      title: 'Form1',
      data: [],
    },
    {
      title: 'Form2',
      data: [],
    },
    {
      title: 'Submit',
      data: [],
    },
  ];
  const goBackFunction = () => {
    navigation.goBack();
  };
  const onRefresh = () => {
    console.log('onRefresh');
    setOnRefreshing(true);
    dispatch({
      type: HISTORY,
      payload: {
        data: {historyType: itemData.symbol},
        token: loginToken,
      },
    });
    // setTimeout(()=>{
    //   setOnRefreshing(false)
    // },3000)
  };
  const renderSection = ({section}) => {
    if (section.title == 'Form1') {
      return (
        <View>
          <View
            style={{
              backgroundColor: AppColors().dashboardBlue,
              width: '85%',
              height: 250,
              left: '7%',
              borderRadius: 5,
              borderTopWidth: 5,
              borderTopColor: AppColors().orange,
            }}>
            <View style={styles.dashboard}>
              <View
                style={{
                  marginRight: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={[styles.title]}>
                    {itemData.symbol} {strings.AccountTitle}
                  </Text>
                  <Text
                    style={[
                      styles.subheading,
                      {color: AppColors().subTitle, marginEnd: 20},
                    ]}
                    numberOfLines={1}>
                    {itemData &&
                      itemData.information &&
                      itemData.information[0] &&
                      itemData.information[0].Address}
                  </Text>
                  <Text style={[styles.title, {fontSize: textSize.h1, fontFamily: fontName.NormalFont,}]}>
                    {parseFloat(itemData.totalBalance).toFixed(4).toString()}
                  </Text>
                  <Text
                    style={[
                      styles.details,
                      {
                        color: AppColors().lightBlue,
                        marginVertical: 10,
                      },
                    ]}>
                    ={' '}
                    {parseFloat(itemData.totalUsdBalance).toFixed(2).toString()}{' '}
                    USD
                  </Text>
                  <View></View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    copyText(
                      itemData &&
                        itemData.information &&
                        itemData.information[0] &&
                        itemData.information[0].Address,
                    );
                    showMessage('Coppied');
                  }}>
                  <Image
                    source={require('../assets/copy.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{bottom: '10%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                }}>
                <Text
                  style={[
                    styles.details,
                    {color: AppColors().lightBlue, marginVertical: 10},
                  ]}>
                  {strings.Available}{' '}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {
                      color: AppColors().lightBlue,
                      marginVertical: 10,
                      right: 7,
                    },
                  ]}>
                  {strings.Unconfirmed}{' '}
                </Text>
                <View>
                  <Text>
                    {''} {''}
                    {''} {''}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                }}>
                <Text
                  style={[
                    styles.details,
                    {
                      color: AppColors().lightBlue,
                      fontWeight: '900',
                      fontSize: textSize.h4,
                      fontFamily: fontName.NormalFont,
                    },
                  ]}>
                  0.00
                </Text>
                <Text
                  style={[
                    styles.details,
                    {
                      color: AppColors().lightBlue,
                      fontWeight: '900',
                      fontSize: textSize.h4,
                      fontFamily: fontName.NormalFont,
                    },
                  ]}>
                  0.00
                </Text>

                <View
                  style={{
                    backgroundColor: AppColors().darkBlue2,
                    marginTop: -10,
                    borderRadius: 30,
                    width: 40,
                    height: 40,
                  }}>
                  <Image
                    source={require('../assets/warning.png')}
                    style={{height: 18, width: 18, left: 11, top: 11}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (section.title == 'Form2') {
      return (
        <View style={{marginHorizontal: 10}}>
          <FlatList
            keyExtractor={item => item.id}
            data={DATA}
            horizontal={true}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  switch (index) {
                    case 0: {
                      navigation.navigate('SendAmount1', {
                        itemData: itemData,
                      });
                      break;
                    }
                    case 1: {
                      navigation.navigate('Receive', {
                        itemData: itemData.symbol,
                      });
                      break;
                    }
                    case 2: {
                      setModelOpen(true);
                      break;
                    }
                    case 3: {
                      navigation.navigate('ChargeAmount');
                      break;
                    }
                    case 4: {
                      navigation.navigate('buycrypto2');
                      break;
                    }
                  }
                }}>
                <View
                  style={{
                    height: 70,
                    width: 70,
                    backgroundColor: AppColors().darkBlue2,
                    margin: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: AppColors().white,
                    padding: 5,
                    marginVertical: 20,
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={item.image}
                    style={{
                      height: 22,
                      width: 25,
                      alignSelf: 'center',
                      top: 10,
                    }}
                  />
                  <Text
                    style={{
                      color: AppColors().lightBlue,
                      fontSize: textSize.h6,
                      fontFamily: fontName.NormalFont,
                      paddingVertical: 10,
                      top: 10,
                      alignSelf: 'center',
                    }}>
                    {' '}
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <View>
              <Text style={[styles.title, {color: AppColors().white}]}>
                {' '}
                {strings.Transactions}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../assets/updown.png')}
                style={{height: 20, width: 20, margin: 5}}
              />
              <Image
                source={require('../assets/staticon.png')}
                style={{height: 20, width: 20, margin: 5}}
              />
              <Image
                source={require('../assets/warning.png')}
                style={{height: 20, width: 20, margin: 5}}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={historyList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => <Text>No data</Text>}
          />
        </View>
      );
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 16,
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: AppColors().white,
                  backgroundColor: AppColors().green,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  fontSize: textSize.h6,
                  fontFamily: fontName.NormalFont,
                  borderRadius: 16,
                }}>
                {item.ordertype}
              </Text>
              <Image
                source={require('../assets/tick.png')}
                style={{height: 20, width: 20, marginLeft: 8, marginTop: 4}}
              />
            </View>
            <Text style={[styles.historyText, {color: AppColors().white}]}>
              {strings.Confirmed}
            </Text>
            <Text
              style={[styles.historyTextAddress, {color: AppColors().white}]}
              numberOfLines={1}>
              {strings.From} : {item.paidFrom}
            </Text>
            <Text
              style={[styles.historyTextAddress, {color: AppColors().white}]}
              numberOfLines={1}>
              {strings.To} : {item.paidTo}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: AppColors().white,
                paddingHorizontal: 16,
                paddingVertical: 4,
                fontSize: textSize.h6,
                fontFamily: fontName.NormalFont,
                fontWeight: '700',
              }}>
              {parseFloat(item.amount).toFixed(6).toString()} {item.currency}
            </Text>
            <Text style={[styles.historyDateText, {color: AppColors().white}]}>
              {item.confirmedDate}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <View style={{flex: 1}}>
        {/* <View
          style={{
            paddingHorizontal: 5,
            backgroundColor: AppColors().green,
          }}>
          <Text style={[styles.detailsBlack, {color: AppColors().subHeading}]}>
            {strings.SelectAccountPara}
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{margin: 16, flexDirection: 'row'}}>
            <Image
              source={{
                uri: itemData.image,
              }}
              style={{height: 50, width: 50, top: 10}}
            />
            <View style={{marginHorizontal: 5}}>
              <Text style={[styles.details, {color: AppColors().white}]}>
                {' '}
                {strings.SelectAccount}
              </Text>
              <Text style={[styles.title, {color: AppColors().heading}]}>
                {itemData.symbol} {strings.AccountTitle}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.title, {color: AppColors().white}]}>
                  = {parseFloat(itemData.totalUsdBalance).toFixed(2).toString()}{' '}
                </Text>
                <Text style={[styles.details, {color: AppColors().subHeading}]}>
                  {' '}
                  USD
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', top: 10}}>
            <TouchableOpacity
              style={{top: 20, marginHorizontal: 10}}
              onPress={() => navigation.navigate('SelectAccountInfo', {itemData: itemData})}
              >
              <Icon name="chevron-down-outline" size={24} color={AppColors().white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{top: 20, marginHorizontal: 10}}
              onPress={() => goBackFunction()}>
              <Icon name="arrow-back" size={24} color={AppColors().white} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <SectionList
            sections={DATA1}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => null}
            renderSectionHeader={renderSection}
            refreshControl={
              <RefreshControl refreshing={onRefreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
      <Modal
        visible={modelOpen}
        onRequestClose={() => {
          setModelOpen(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <QRCodeScanner onRead={onSuccess} />
        </View>
      </Modal>
    </View>
  );
};

export default SelectAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  innerView: {},
  title: {
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '800',
  },
  Bluetitle: {
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue,
    fontWeight: '800',
  },
  subheading: {
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '500',
    bottom: 10,
    marginVertical: 10,
  },
  details: {fontSize: textSize.p, fontFamily: fontName.NormalFont, color: 'white', marginVertical: 3},
  detailsBlack: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: 'black',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  boldtitle: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '700',
    marginVertical: 10,
  },
  dashboard: {
    margin: 20,
  },
  icon: {
    height: 20,
    width: 33,
    top: 50,
  },
  historyText: {
    color: AppColors().white,
    fontSize: textSize.p,
    fontFamily: fontName.NormalFont,
    margin: 2,
  },
  historyDateText: {
    color: AppColors().white,
    fontSize: textSize.p,
    fontFamily: fontName.NormalFont,
    margin: 2,
    paddingRight: 12,
  },
  historyTextAddress: {
    color: AppColors().white,
    fontSize: textSize.p,
    fontFamily: fontName.NormalFont,
    marginHorizontal: 2,
  },
});
