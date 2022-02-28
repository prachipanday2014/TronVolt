import React, {useState} from 'react';
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
import Toolbar from '../components/toolbar';
import {LOADING, SWAP} from '../store/action';
import showMessage from '../components/showMessage';
import {useDispatch, useSelector} from 'react-redux';
import * as config from '../constants/config.json';
import axios from 'axios';
import moment from 'moment';
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const SendTransaction = ({route, navigation}) => {
  const {itemData} = route.params;
  const image = require('../assets/background.png');
  const loginToken = useSelector(state => state.login.accessToken);

  const dispatch = useDispatch();

  const sendTransaction = () => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    axios
      .post(
        'https://api.kinjatoken.com/users/withdrawal',
        {
          currency: itemData.currency,
          amount: itemData.amount,
          from_address: itemData.fromAddress,
          to_address: itemData.toAddress,
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
        if (response.data.statuscode === 200) {
          navigation.navigate('Success');
        } else {
          showMessage(response.data);
        }
      })
      .catch(function (error) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        showMessage(error.message);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <Toolbar
        title={strings.SendTransactionTitle}
        navigation={navigation}
        isBack={true}
        isAdd={false}
      />
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
          <View style={{flex: 1, backgroundColor: AppColors().black}}>
            <View style={{marginVertical: 16}}>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.From}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  {itemData.fromAddress}
                </Text>
              </View>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.To}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  {itemData.toAddress}
                </Text>
              </View>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.AmountTitle}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  {parseFloat(itemData.amount).toFixed(6).toString()}
                </Text>
              </View>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.Currency}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  {itemData.currency}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: AppColors().white,
                fontSize: textSize.h5,
                fontFamily: fontName.NormalFont,
                padding: 10,
                marginLeft: 20,
              }}>
              {strings.FeeDetails}
            </Text>
            <View style={{marginVertical: 0}}>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.FeeOption}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  -
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: AppColors().white,
                fontSize: textSize.h5,
                fontFamily: fontName.NormalFont,
                padding: 10,
                marginLeft: 20,
              }}>
              {strings.TransactionDetail}
            </Text>
            <View style={{marginVertical: 0}}>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.Time}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  {moment().format('l, HH:mm:ss')}
                </Text>
              </View>
            </View>
            <View style={{marginVertical: 0}}>
              <View
                style={[
                  styles.viewStyle,
                  {backgroundColor: AppColors().headerColor},
                ]}>
                <Text
                  style={[
                    styles.details,
                    {
                      marginVertical: 10,
                      fontWeight: '600',
                      left: 8,
                      color: AppColors().subTitle,
                    },
                  ]}>
                  {strings.TransactionType}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', right: 8},
                  ]}>
                  {strings.SendTitle}
                </Text>
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
      </ScrollView>
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
              {strings.SubmitTransaction}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default SendTransaction;

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
  title: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    margin: 10,
    fontWeight: '700',
  },
  details: {fontSize: textSize.p, fontFamily: fontName.NormalFont, color: AppColors().white},
  boldtitle: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
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
    color: AppColors().white,
    alignSelf: 'center',
  },
  keybtnText: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    alignSelf: 'center',
    top: 12,
  },
  bluetext: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue,
  },
  viewStyle: {
    width: '90%',
    height: 45,
    margin: 4,
    padding: 5,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 2,
    borderWidth: 1,
  },
});
