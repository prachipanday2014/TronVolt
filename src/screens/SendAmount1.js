import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AppColors} from '../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';
import InputArea from '../components/InputArea';
import Toolbar from '../components/toolbar';
import {LOADING} from '../store/action';
import showMessage from '../components/showMessage';
import {useDispatch, useSelector} from 'react-redux';
import * as config from '../constants/config.json';
import axios from 'axios';
import strings from '../constants/localization';
import Icon from 'react-native-vector-icons/Ionicons';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const SendAmount1 = ({route, navigation}) => {
  const {itemData} = route.params;
  const [account, setAccount] = useState('');

  const image = require('../assets/background.png');
  const dispatch = useDispatch();
  const loginToken = useSelector(state => state.login.accessToken);
  const [amountConvert, setAmountConvert] = useState('');
  const [rate, setRate] = useState('');
  const [selectPercentage, setSelectPercentage] = useState('');
  const [isDotShow, setDotShow] = useState(true);

  useEffect(() => {
    setRate(itemData.rate);
  }, []);

  const setTrx = amount => {
    if (amount === '' || amount == '0') {
      setAmountConvert('0');
    } else {
      const val = parseFloat(amount);
      const amt = parseFloat(val) / parseFloat(rate);
      setAmountConvert(amt.toFixed(2).toString());
    }
  };

  useEffect(() => {
    let amountsplit = account.split('.');
    if (amountsplit.length >= 2) {
      setDotShow(false);
      if (amountsplit[0].length < 8 && amountsplit[1].length < 7) {
      } else {
        setAccount(account.substring(0, account.length - 1));
      }
    } else {
      if (amountsplit[0].length <= 7) {
      } else {
        if (account == '.') {
        } else {
          setAccount(account.substring(0, account.length - 1));
        }
      }
      setDotShow(true);
    }
    setTrx(account);
  }, [account]);

  const getPercentage = percentage => {
    setSelectPercentage(percentage);
    dispatch({
      type: LOADING,
      payload: true,
    });
    axios
      .post(
        'https://api.kinjatoken.com/perentageSwap',
        {
          currency: itemData.symbol,
          percent: percentage,
        },
        {
          headers: {Authorization: `Bearer ${loginToken}`},
        },
      )
      .then(function (response) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        setAccount(response.data.data.rate.toFixed(4).toString());
      })
      .catch(function (error) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        showMessage(error.message);
      });
  };
  const removeNumber = () => {
    setAccount(account.substring(0, account.length - 1));
  };

  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <Toolbar
        title={strings.SendTitle}
        navigation={navigation}
        isBack={true}
        isAdd={false}
      />
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {/* <View
            style={{
              paddingHorizontal: 5,
              backgroundColor: AppColors().green,
            }}>
            <Text style={{fontSize: textSize.h6, fontFamily: fontName.NormalFont, padding: 8}}>
              {strings.SelectAccountPara}
            </Text>
          </View> */}
          <View style={{marginVertical: 20}}>
            <Text style={[styles.label, {color: AppColors().white}]}>
              {' '}
              {strings.From} :{' '}
            </Text>
            <View
              style={{
                width: '90%',
                height: 60,
                margin: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                elevation: 2,
                backgroundColor: AppColors().black,
                borderColor: AppColors().lightBlue2,
                borderWidth: 1,
                borderRadius: 20,
              }}>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: itemData.image,
                  }}
                  style={{height: 30, width: 30, marginHorizontal: '5%'}}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.title,
                    {
                      fontSize: textSize.h5,
                      fontFamily: fontName.NormalFont,
                      marginVertical: -5,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {itemData.information[0].Address}
                </Text>
              </View>
              <View
                style={{
                  width: '40%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={[styles.details, {color: AppColors().white}]}>
                  {strings.Balance}{' '}
                </Text>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: textSize.h6,
                      fontFamily: fontName.NormalFont,
                      marginVertical: -2,
                      color: AppColors().white,
                    },
                  ]}>
                  {parseFloat(itemData.totalBalance).toFixed(6).toString()}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                top: 5,
              }}>
              <ImageBackground
                source={require('../assets/btnborder.png')}
                style={{width: 80, height: 23}}>
                <Text
                  style={[
                    styles.btnText,
                    {color: AppColors().white, marginTop: 3},
                  ]}>
                  {' '}
                  {itemData.symbol}{' '}
                </Text>
              </ImageBackground>
              <Text style={[styles.bluetext, {color: AppColors().white}]}>
                {' '}
                {itemData.selectedCurrency}
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginVertical: 20,
              }}>
              <View>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 4, fontWeight: '600', left: 8},
                  ]}>
                  {' '}
                  {strings.AmountTitle}{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <TextInput
                        editable={false}
                        style={{fontSize: textSize.h2,fontFamily: fontName.NormalFont, color: AppColors().white}}
                        placeholderTextColor={AppColors().white}
                        value={account.toString()}
                        underlineColorAndroid="transparent"
                      />
                      <Text style={{marginTop: 12, color: AppColors().white}}>
                        {itemData.symbol}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.details,
                        {
                          color: AppColors().white,
                          marginVertical: 5,
                        },
                      ]}>
                      {`${parseFloat(amountConvert).toFixed(2).toString()} ${
                        itemData.selectedCurrency
                      }`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 10,
                marginVertical: 15,
              }}>
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
                      getPercentage(25);
                    }}>
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: 14,
                        padding: 10,
                      }}>
                      25%
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: '20%',
                    borderRadius: 20,
                    backgroundColor: AppColors().headerColor,
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: '5%',
                    }}
                    onPress={() => {
                      getPercentage(25);
                    }}>
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: 14,
                        padding: 10,
                      }}>
                      25%
                    </Text>
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
                      getPercentage(50);
                    }}>
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: 14,
                        padding: 10,
                      }}>
                      50%
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: '20%',
                    borderRadius: 20,
                    backgroundColor: AppColors().headerColor,
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: '5%',
                    }}
                    onPress={() => {
                      getPercentage(50);
                    }}>
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: 14,
                        padding: 10,
                      }}>
                      50%
                    </Text>
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
                      getPercentage(75);
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
                <View
                  style={{
                    width: '20%',
                    borderRadius: 20,
                    backgroundColor: AppColors().headerColor,
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: '5%',
                    }}
                    onPress={() => {
                      getPercentage(75);
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
                      getPercentage(100);
                    }}>
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: 14,
                        padding: 10,
                      }}>
                      100%
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: '20%',
                    borderRadius: 20,
                    backgroundColor: AppColors().headerColor,
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: '5%',
                    }}
                    onPress={() => {
                      getPercentage(100);
                    }}>
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: 14,
                        padding: 10,
                      }}>
                      100%
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View> */}

            <View style={{marginHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={() => setAccount(account + '1')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 1 </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAccount(account + '2')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 2 </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAccount(account + '3')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 3 </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                }}>
                <TouchableOpacity onPress={() => setAccount(account + '4')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 4 </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAccount(account + '5')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 5 </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAccount(account + '6')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 6 </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}>
                <TouchableOpacity onPress={() => setAccount(account + '7')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 7 </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAccount(account + '8')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 8 </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setAccount(account + '9')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 9 </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-around',
                }}>
                {isDotShow ? (
                  <TouchableOpacity onPress={() => setAccount(account + '.')}>
                    <View style={styles.keybtnBorder}>
                      <Text style={styles.keybtnText}> . </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.keybtnBorder}></View>
                )}

                <TouchableOpacity onPress={() => setAccount(account + '0')}>
                  <View style={styles.keybtnBorder}>
                    <Text style={styles.keybtnText}> 0 </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeNumber()}>
                  <View style={[styles.keybtnBorder, {alignItems: 'center'}]}>
                    <Icon
                      style={{marginTop: 8}}
                      name="backspace-outline"
                      size={20}
                      color={AppColors().subHeading}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}></View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '12%',
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
                if (account == '' || account < 20) {
                  showMessage(strings.amountValidMsg);
                } else if (itemData.totalBalance > 0) {
                  navigation.navigate('SendAmount2', {
                    itemData: {
                      amount: account,
                      fromAddress: itemData.information[0].Address,
                      symbol: itemData.symbol,
                      currency: itemData.name,
                    },
                  });
                } else {
                  showMessage(strings.balanceValidMsg);
                }
              }}>
              <Text
                style={{
                  color: AppColors().white,
                  fontSize: textSize.h5,
                  fontFamily: fontName.NormalFont,
                  padding: 10,
                }}>
                {strings.next}
              </Text>
              
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

export default SendAmount1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  innerView: {
    alignItems: 'center',
  },
  title: {fontSize: textSize.h2, color: 'white', fontFamily: fontName.NormalFont, margin: 10, fontWeight: '700'},
  details: {fontSize: textSize.p, fontFamily: fontName.NormalFont, color: 'white'},
  boldtitle: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '700',
    marginVertical: 10,
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#424242',
  },
  label: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue2,
    left: '10%',
    top: 10,
  },
  btnText: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: 'white',
    alignSelf: 'center',
  },
  keybtnText: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: 'white',
    alignSelf: 'center',
    top: 12,
  },
  bluetext: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue,
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
