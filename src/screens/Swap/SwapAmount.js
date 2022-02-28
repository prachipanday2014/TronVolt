import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {AppColors} from '../../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';
import Toolbar from '../../components/toolbar';
import strings from '../../constants/localization';
import showMessage from '../../components/showMessage';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const SwapAmount = ({route, navigation}) => {
  const {itemData} = route.params;
  const [toAddress, setToAddress] = useState('');
  const nextButtonAction = () => {
    if (toAddress == '') {
      showMessage('Enter address');
    } else {
      navigation.navigate('Transaction', {
        itemData: {
          amount: parseFloat(itemData.amount).toFixed(6),
          fromAddress: itemData.fromAddress,
          toAddress: toAddress,
          symbol: itemData.symbol,
          currency: itemData.currency,
          willReceiveValue: itemData.willReceiveValue,
        },
      });
    }
  };

  const sendTransaction = () => {
    if (toAddress == '') {
      showMessage('Enter address');
    } else {
      dispatch({
        type: LOADING,
        payload: true,
      });
      axios
        .post(
          'https://api.kinjatoken.com/validate',
          {
            currency: itemData.symbol,
            address: toAddress,
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

          // showMessage(response.data.message);
          console.log('validate ResponseData: ', response.data);
          if (response.data.code === 200) {
            nextButtonAction();
          } else {
            showMessage(response.data.message);
          }
        })
        .catch(function (error) {
          dispatch({
            type: LOADING,
            payload: false,
          });
          console.log('Transaction Error', error);
          showMessage(error.message);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <Toolbar
        title={strings.SEND}
        // title="SEND 2"
        navigation={navigation}
        isBack={true}
        isAdd={false}
      />
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
           <View
            style={{
              paddingHorizontal: 5,
              backgroundColor: AppColors().green,
            }}>

            <Text style={{fontSize: textSize.p}}>{strings.SEND_HEADER_PARA}</Text>
          </View>
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={[
                  styles.details,
                  {marginVertical: 10, fontWeight: '600', left: 8},
                ]}>
                {strings.Amount}
              </Text>
              <View>
                <Text style={{fontSize: textSize.h3, fontFamily: fontName.NormalFont, color: AppColors().white}}>
                  {parseFloat(itemData.amount).toFixed(6).toString()}
                </Text>
                <Text style={{marginTop: 10, color: AppColors().white}}>
                  {itemData.symbol}
                </Text>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <Text style={[styles.label, {color: AppColors().subTitle}]}>
                {' '}
                {strings.To} :{' '}
              </Text>
              <View
                style={{
                  width: '90%',
                  height: 60,
                  margin: 10,
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                  elevation: 2,
                  backgroundColor: AppColors().black,
                  borderColor: AppColors().borderColor,
                  borderWidth: 1,
                }}>
                <TextInput
                  style={{
                    fontSize: textSize.h3,
                    fontFamily: fontName.NormalFont,
                    color: AppColors().white,
                    marginHorizontal: 16,
                  }}
                  placeholder={strings.Use_address}
                  placeholderTextColor={AppColors().subTitle}
                  onChangeText={account => setToAddress(account)}
                  value={toAddress}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 100,
                  height: 44,
                  backgroundColor: AppColors().headerColor,
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={{height: 24, width: 24, marginVertical: 10}}
                    source={require('../../assets/addressbook1.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 100,
                  height: 44,
                  backgroundColor: AppColors().headerColor,
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Share.share({
                      message: 'data',
                    });
                  }}>
                  <Image
                    style={{height: 24, width: 22, marginVertical: 10}}
                    source={require('../../assets/copy_white.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 100,
                  height: 44,
                  backgroundColor: AppColors().headerColor,
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Share.share({
                      message: 'data',
                    });
                  }}>
                  <Image
                    style={{height: 24, width: 22, marginVertical: 10}}
                    source={require('../../assets/scan.png')}
                  />
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
                sendTransaction();
              }}>
              <Text
                style={{
                  color: AppColors().white,
                  fontSize: textSize.h5,
                  fontFamily: fontName.NormalFont,
                  padding: 10,
                }}>
                {strings.Send_btn}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* </ImageBackground> */}
      </ScrollView>
    </View>
  );
};

export default SwapAmount;

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
  title: {fontSize: textSize.h2, fontFamily: fontName.NormalFont, color: 'white', margin: 10, fontWeight: '700'},
  details: {fontSize: textSize.h6, fontFamily: fontName.NormalFont, color: 'white'},
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
});
