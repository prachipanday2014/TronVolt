import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {AppColors} from '../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';
import Toolbar from '../components/toolbar';
import strings from '../constants/localization';
import {useDispatch, useSelector} from 'react-redux';
import { DASHBOARD } from '../store/action';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const Success = ({route, navigation}) => {
  const dispatch = useDispatch();
  const loginToken = useSelector(state => state.login.accessToken);

  const navigateToDash = () => {
    dispatch({
      type: DASHBOARD,
      payload: {
        token: loginToken,
      },
    });
    navigation.navigate('News');
  }
  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <Toolbar
        title="Transaction"
        navigation={navigation}
        isBack={true}
        isAdd={false}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: AppColors().green,
        }}>
        <View></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '5%',
            alignContent: 'space-between',
          }}>
          <Text style={{fontSize: textSize.h3, fontFamily: fontName.NormalFont, margin: 6, color: AppColors().white}}>
            Success
          </Text>
          <Image
            style={{height: 300, width: 300}}
            source={require('../assets/1.png')}
          />
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
                navigateToDash()
              }}>
              <Text
                style={{
                  color: AppColors().white,
                  fontSize: textSize.h5,
                  fontFamily: fontName.NormalFont,
                  padding: 10,
                }}>
                {strings.Continue}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default Success;

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
  viewStyle: {
    width: '90%',
    height: 45,
    margin: 2,
    padding: 5,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 2,
    backgroundColor: AppColors().darkBlue3,
    // borderColor: AppColors().lightBlue2,
    borderWidth: 1,
  },
});
