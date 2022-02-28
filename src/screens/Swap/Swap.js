import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  RefreshControl
} from 'react-native';
import {AppColors, SetColors} from '../../constants/appColors';
import {getDimen} from '../../dimensions/dimen';
import textSize from '../../constants/textSize';
import DropDownPicker from 'react-native-dropdown-picker';
import Toolbar from '../../components/toolbar';
import {useDispatch, useSelector} from 'react-redux';
import {
  SWAP,
  DASHBOARD,
  PERCENTAGESWAP,
  FIATCURRENCIES,
  CHECKSWAPRATE,
  PERCENTAGESWAP_DATA,
} from '../../store/action';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../../constants/localization';
import {AppState} from 'react-native';
import showMessage from '../../components/showMessage';
import Icon from 'react-native-vector-icons/Ionicons';
import fontName from '../../constants/fontName';

const Swap = ({navigation}) => {
  const [text, onChangeText] = useState('1');
  const [number, onChangeNumber] = useState(0.0);
  const [getValue, setGetVAlue] = useState(0.0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [totalUsdBalance, setTotalUsdBalance] = useState(null);
  const [comfromValue, setComFromValue] = useState(null);
  const [comToValue, setComToValue] = useState(null);
  const [percentageValue, setPercentageValue] = useState(null);
  const [items, setItems] = useState('');
  const [items1, setItems1] = useState('');
  const [next, setNext] = useState();
  const [isDotShow, setDotShow] = useState(true);
  const [onRefreshing, setOnRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [selectPercentage, setSelectPercentage] = useState('');

  const fiatCurrenciesData = useSelector(
    state => state.swap.fiatCurrenciesData,
  );
  const swapData = useSelector(state => state.swap.swapData);
  const checkSwapRateData = useSelector(state => state.swap.checkSwapRateData);
  const percentageSwapData = useSelector(
    state => state.swap.percentageSawpData,
  );
  const loginToken = useSelector(state => state.login.accessToken);

  const removeNumber = () => {
    if (text.length > 1) {
      onChangeText(text.substring(0, text.length - 1));
      changedRateValue(text.substring(0, text.length - 1));
    } else {
      onChangeText('');
      changedRateValue('');
      setGetVAlue('0');
    }
  };

  const percentApi = percentageValue => {
    setSelectPercentage(percentageValue);
    dispatch({
      type: PERCENTAGESWAP,
      payload: {
        data: {
          currency: value,
          percent: percentageValue,
        },
        token: loginToken,
      },
    });
  };
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      setFromValue('');
      onChangeText('');
      setValue1('');
      AppState.removeEventListener('change', handleAppStateChange);
    };
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

  useEffect(() => {
    if (text === '') {
      showMessage('Plesae enter value.');
    } else {
      dispatch({
        type: CHECKSWAPRATE,
        payload: {
          data: {
            from: value,
            to: value1,
            amount: text,
          },
          token: loginToken,
        },
      });
    }
  }, [value]);

  useEffect(() => {
    setGetVAlue(checkSwapRateData && checkSwapRateData.swap_amount);
  }, [checkSwapRateData]);

  useEffect(() => {
    if (Object.keys(percentageSwapData).length > 0) {
      onChangeText(
        percentageSwapData &&
          percentageSwapData.data.rate.toFixed(6).toString(),
      );
      changedRateValue(
        percentageSwapData &&
          percentageSwapData.data.rate.toFixed(6).toString(),
      );

      dispatch({type: PERCENTAGESWAP_DATA, payload: {}});
    }
  }, [percentageSwapData]);

  const dashboardData = useSelector(state => state.dashboard.dashboardData);

  var SampleArray = [];
  var SampleArray1 = [];
  dashboardData &&
    dashboardData.result &&
    dashboardData.result.map((symbols, i) => {
      let val = {
        label: `${symbols.symbol}`,
        value: `${symbols.symbol}`,
        icon: () => (
          <Image
            source={{uri: symbols.image}}
            style={{height: 30, width: 30}}
          />
        ),
      };
      SampleArray.push(val);
      SampleArray1.push(val);
    });

  const changedRateValue = text => {
    let amountsplit = text.split('.');
    if (amountsplit.length >= 2) {
      setDotShow(false);
      if (amountsplit[0].length < 8 && amountsplit[1].length < 7) {
        calculateValue(text);
      } else {
        onChangeText(text.substring(0, text.length - 1));
        changedRateValue(text.substring(0, text.length - 1));
      }
    } else {
      if (amountsplit[0].length < 8) {
        calculateValue(text);
      } else {
        if (text == '.') {
          calculateValue(text);
        } else {
          onChangeText(text.substring(0, text.length - 1));
          changedRateValue(text.substring(0, text.length - 1));
        }
      }
      setDotShow(true);
    }
  };

  const calculateValue = text => {
    onChangeText(text);
    const val = parseFloat(text);
    const amt =
      parseFloat(val) *
      parseFloat(checkSwapRateData && checkSwapRateData.swap_amount);
    onChangeNumber(amt.toFixed(2).toString());
    // setGetVAlue('')
    setGetVAlue(amt);

    //new add
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
  const onRefresh = () => {
    console.log('onRefresh');
    setOnRefreshing(true);
    dispatch({
      type: CHECKSWAPRATE,
      payload: {
        data: {
          from: value,
          to: value1,
          amount: text,
        },
        token: loginToken,
      },
    });
    setTimeout(()=>{setOnRefreshing(false)},3000)
  } 
  const renderSection = ({section}) => {
    if (section.title == 'Form1') {
      return (
        <View>
          <View>
            <View style={styles.titleViewStyle}>
              <Text style={[styles.textTitleStyle, {color: AppColors().white}]}>
                {strings.YOU_PAY}
              </Text>
              <Text style={[styles.textTitleStyle, {color: AppColors().white}]}>
                {strings.YOU_GET}
              </Text>
              <Text style={[styles.textTitleStyle, {color: AppColors().white}]}>
                AVAILABLE
              </Text>
              <Text style={[styles.textTitleStyle, {color: AppColors().white}]}>
                0 REEF
              </Text>
            </View>

            <View style={[styles.titleViewStyle, {margin: 0}]}>
              <View style={{width: '24%'}}>
                <Text
                  style={[styles.textValueStyle, {color: AppColors().white}]}>
                  {text.toString()}
                </Text>
              </View>
              <View style={{width: '24%'}}>
                <Text
                  style={[
                    styles.textRightValueStyle,
                    {color: AppColors().white},
                  ]}>
                  {value &&
                    value1 &&
                    parseFloat(getValue).toFixed(2).toString()}
                </Text>
              </View>
              <View style={{width: '24%'}}>
                <Text
                  style={[styles.textValueStyle, {color: AppColors().white}]}>
                  0.00
                </Text>
              </View>
              <View style={{width: '24%'}}>
                <Text
                  style={[styles.textValueStyle, {color: AppColors().white}]}>
                  0.00
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (section.title == 'Form2') {
      return (
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '6%',
                paddingRight: '6%',
                marginTop: 20,
              }}>
              <View style={{width: getDimen(0.41)}}>
                <DropDownPicker
                  zIndex={3000}
                  zIndexInverse={3000}
                  open={open}
                  value={value}
                  items={SampleArray}
                  setOpen={setOpen}
                  setValue={setValue}
                  onChangeItem={item => {
                  }}
                  placeholder="Select"
                  onChangeValue={(values, index) => {
                    setComFromValue(values);
                    // if(comToValue == values){
                    //   // showMessage('Duplicate selection')
                    //   return
                    // }
                    if(dashboardData && dashboardData.result){
                    for (let i = 0; i < dashboardData.result.length; i++) {
                      if (dashboardData.result[i].symbol === values) {
                        setFromValue(
                          dashboardData.result[i].information[0].Address,
                        );
                      }
                    }
                  }
                  }}
                />
              </View>

              <View style={{width: getDimen(0.41)}}>
                <DropDownPicker
                  // style={{ backgroundColor: AppColors().black, borderColor: AppColors().white }}
                  //textStyle={{ color: 'white' }}
                  zIndex={3000}
                  zIndexInverse={3000}
                  open={open1}
                  value={value1}
                  items={SampleArray1}
                  setOpen={setOpen1}
                  setValue={setValue1}
                  placeholder="Select"
                  onChangeValue={(values, index) => {
                    setComToValue(values);
                    // if(comfromValue == values){
                    //   // showMessage('Duplicate selection')
                    //   return
                    // }
                    if(dashboardData && dashboardData.result){
                    for (let i = 0; i < dashboardData.result.length; i++) {
                      if (dashboardData.result[i].symbol == values) {
                        setToValue(dashboardData.result[i].totalBalance);
                        setTotalUsdBalance(dashboardData.result[i].totalUsdBalance)
                      }
                    }
                  }
                  }}
                />
              </View>
            </View>
            <Text
              style={[
                styles.textStyle,
                {color: AppColors().headerColor, marginTop: 20},
              ]}>
              {strings.Enter_how_much_you_want_to_swap}
            </Text>
             <Text
              style={[
                styles.textStyle,

                {color: AppColors().white, marginTop: 10},
              ]}>  
              {getValue< toValue || getValue>20 ? 'Minimum value is '+parseFloat(totalUsdBalance).toFixed(4).toString()+ ' '+value : strings.token_not_available}
            </Text>
          </View>
          {/* <View style={styles.viewStyle}>
            {selectPercentage == '25' ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  AppColors().gradientColor1,
                  AppColors().gradientColor2,
                  AppColors().gradientColor3,
                ]}
                style={{width: '20%', borderRadius: 20}}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: '5%',
                  }}
                  onPress={() => {
                    percentApi('25');
                  }}>
                  <Text
                    style={{
                      color: AppColors().white,
                      fontSize: 14,
                      padding: 10,
                    }}>
                    25 %
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <View style={styles.viewButtonStyle}>
                <TouchableOpacity
                  onPress={() => {
                    percentApi('25');
                  }}>
                  <Text style={styles.textStyle}>25 %</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectPercentage == '50' ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  AppColors().gradientColor1,
                  AppColors().gradientColor2,
                  AppColors().gradientColor3,
                ]}
                style={{width: '20%', borderRadius: 20}}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: '5%',
                  }}
                  onPress={() => {
                    percentApi('50');
                  }}>
                  <Text
                    style={{
                      color: AppColors().white,
                      fontSize: 14,
                      padding: 10,
                    }}>
                    50 %
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <View style={styles.viewButtonStyle}>
                <TouchableOpacity
                  onPress={() => {
                    percentApi('50');
                  }}>
                  <Text style={styles.textStyle}>50 %</Text>
                </TouchableOpacity>
              </View>
            )}

            {selectPercentage == '75' ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  AppColors().gradientColor1,
                  AppColors().gradientColor2,
                  AppColors().gradientColor3,
                ]}
                style={{width: '20%', borderRadius: 20}}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: '5%',
                  }}
                  onPress={() => {
                    percentApi('75');
                  }}>
                  <Text
                    style={{
                      color: AppColors().white,
                      fontSize: 14,
                      padding: 10,
                    }}>
                    75%
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <View style={styles.viewButtonStyle}>
                <TouchableOpacity
                  onPress={() => {
                    percentApi('75');
                  }}>
                  <Text style={styles.textStyle}>75 %</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectPercentage == '100' ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  AppColors().gradientColor1,
                  AppColors().gradientColor2,
                  AppColors().gradientColor3,
                ]}
                style={{width: '20%', borderRadius: 20}}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: '5%',
                  }}
                  onPress={() => {
                    percentApi('100');
                  }}>
                  <Text
                    style={{
                      color: AppColors().white,
                      fontSize: 14,
                      padding: 10,
                    }}>
                    100 %
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <View style={styles.viewButtonStyle}>
                <TouchableOpacity
                  onPress={() => {
                    percentApi('100');
                  }}>
                  <Text style={styles.textStyle}>100 %</Text>
                </TouchableOpacity>
              </View>
            )}
          </View> */}

          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => changedRateValue(text + '1')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color: AppColors().white}]}> 1 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '2')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color: AppColors().white}]}> 2 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '3')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color: AppColors().white}]}> 3 </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={() => changedRateValue(text + '4')}>
                <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color: AppColors().white}]}> 4 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '5')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> 5 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '6')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> 6 </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 5,
              }}>
              <TouchableOpacity onPress={() => changedRateValue(text + '7')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> 7 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '8')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> 8 </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '9')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> 9 </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => changedRateValue(text + '.')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> . </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changedRateValue(text + '0')}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25}}>
                  <Text style={[styles.keybtnText,{color:AppColors().white}]}> 0 </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeNumber()}>
              <View
                  style={{width: 95, height: 45, backgroundColor: AppColors().background, borderColor: AppColors().borderColor, borderWidth: 1, borderRadius: 25, alignItems: 'center',}}>
                  <Icon
                    style={{marginTop: 8}}
                    name="backspace-outline"
                    size={25}
                    color={AppColors().white}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: 20,
              }}></View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '5%',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                AppColors().gradientColor1,
                AppColors().gradientColor2,
                AppColors().gradientColor3,
              ]}
              style={{width: '50%', borderRadius: 20}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingHorizontal: '5%',
                }}
                onPress={() => {
                  if (!text) {
                    showMessage(strings.validAmtMsg);
                    return;
                  }
                  if (comToValue === comfromValue) {
                    showMessage(strings.duplicateSelection);
                    return;
                  }
                  if(getValue < toValue || getValue < 20){
                    showMessage(strings.token_not_available);
                    return;
                  }
                  navigation.navigate('SwapAmount', {
                    itemData: {
                      amount: text,
                      fromAddress: fromValue,
                      symbol: value,
                      currency: value1,
                      willReceiveValue: getValue,
                    },
                  });
                }}>
                <Text
                  style={{
                    color: AppColors().white,
                    fontSize: textSize.h5,
                    fontFamily: fontName.NormalFont,
                    padding: 10,
                  }}>
                  {strings.Next}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: AppColors().background, flex: 1}}>
      <Toolbar
        title={strings.Swap}
        navigation={navigation}
        isBack={false}
        isAdd={false}
      />
      <View style={{backgroundColor: AppColors().background, marginTop: 10}}>
        <View>
          <SectionList
            sections={DATA1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => null}
            renderSectionHeader={renderSection}
            refreshControl={
              <RefreshControl refreshing={onRefreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Swap;

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '6%',
    paddingRight: '6%',
    marginTop: 20,
    width: '100%',
  },
  titleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingLeft: '6%',
    // paddingRight: '6%',
    margin: 10,
    width: '97%',
  },
  keybtnText: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: 'white',
    alignSelf: 'center',
    top: 12,
  },
  textStyle: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textTitleStyle: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textValueStyle: {
    color: AppColors().white,
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  textRightValueStyle: {
    color: AppColors().white,
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    textAlign: 'right',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  textButtonStyle: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: 'red',
  },
  viewButtonStyle: {
    height: getDimen(0.1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: getDimen(0.2),
    backgroundColor: AppColors().headerColor,
    borderRadius: getDimen(0.1),
  },
  nextView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getDimen(0.5),
    height: getDimen(0.12),
    backgroundColor: AppColors().headerColor,
    borderRadius: getDimen(0.1),
  },
  keybtnBorder: {
    width: 90,
    height: 42,
    backgroundColor: AppColors().buttonColor1,
    borderColor: AppColors().borderColor,
    borderRadius: 20,
    borderWidth: 1,
  },
});
