import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../../constants/appColors';
import showMessage from '../../components/showMessage';
import {
  ACCESS_TOKEN,
  LOGIN,
  REGISTER_DATA,
  USER_LOGIN,
} from '../../store/action';
import DeviceInfo from 'react-native-device-info';
import strings from '../../constants/localization';
import AsyncStorage from '@react-native-community/async-storage';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const CreatePin = ({route, navigation}) => {
  const {routeName} = route.params;

  const dispatch = useDispatch();
  const pinView = useRef(null);
  const [enteredPin, setEnteredPin] = useState('');
  const deviceId = DeviceInfo.getUniqueId();
  // const image = require('../../assets/pingenrate_bg.png');
  const userLogin = useSelector(state => state.login.loginData);
  console.log('userLogin',userLogin)
  const storeData = async enteredPin => {
    try {
      await AsyncStorage.setItem('enteredPin', enteredPin);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (enteredPin.length == 6) {
      storeData(enteredPin);
      if (routeName == 'wallet') {
        navigation.navigate('ReEnterPin', {
          FirstPin: enteredPin,
          routeName: routeName,
        });
      } else {
        dispatch({
          type: LOGIN,
          payload: {
            data: {
              deviceId: deviceId,
              mpin: enteredPin,
            },
          },
        });
        // showMessage(userLogin.message);
        // navigation.navigate('ReEnterPin', {
        //   FirstPin: enteredPin,
        // });
      }
    } else {
    }
  }, [enteredPin]);

  useEffect(() => {
    if (Object.keys(userLogin).length > 0) {
      if (userLogin.code === 200) {
        showMessage(userLogin.message);
        dispatch({
          type: ACCESS_TOKEN,
          payload: userLogin.accessToken,
        });
        dispatch({
          type: USER_LOGIN,
          payload: {},
        });
        navigation.navigate('News');
      }
      if (userLogin.code === 202) {
        dispatch({type: REGISTER_DATA, payload: userLogin});
        dispatch({
          type: USER_LOGIN,
          payload: {},
        });
        navigation.navigate('Seeds', {
          data: userLogin.data.seedPhrase,
        });
      }
      if (userLogin.code == 404) {
        dispatch({
          type: USER_LOGIN,
          payload: {},
        });
        navigation.navigate('ReEnterPin', {
          FirstPin: enteredPin,
        });
      }
      if (userLogin.code == 406) {
        pinView.current.clearAll();
        showMessage(userLogin.message);
      }
    }
  }, [userLogin]);

  return (
    <>
      <View style={{backgroundColor: AppColors().background, flex: 1}}>
        <View style={{flex: 0.4}}>
          <Text style={[styles.minititle, {color: AppColors().subTitle}]}>
            {' '}
            {strings.securityCheck}{' '}
          </Text>
          <Text
            style={[
              styles.title,
              {color: AppColors().title, fontWeight: '700'},
            ]}>
            {' '}
            {strings.enterNewPin}{' '}
          </Text>
        </View>
        <ReactNativePinView
          inputSize={12}
          ref={pinView}
          pinLength={6}
          style={{flex: 0.5}}
          buttonSize={110}
          onValueChange={value => setEnteredPin(value)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: AppColors().white,
            margin: 20,
          }}
          inputViewFilledStyle={{
            backgroundColor: AppColors().white,
            margin: 20,
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: AppColors().white,
            borderRadius: 22,
            height: 50,
          }}
          buttonTextStyle={{
            color: AppColors().white,
            fontSize: textSize.h5,
            fontFamily: fontName.NormalFont,
          }}
          onButtonPress={key => {
            if (key === 'custom_left') {
            }
            if (key === 'custom_right') {
              pinView.current.clear();
            }
            if (key === 'three') {
            }
          }}
          customRightButton={
            <Icon
              name="backspace-outline"
              size={30}
              color={AppColors().white}
            />
          }
          customRightButtonViewStyle={styles.customButton}
          customLeftButton={<View></View>}
          customLeftButtonSize={110}
          customLeftButtonViewStyle={styles.customButton}
        />
      </View>
    </>
  );
};
export default CreatePin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    paddingTop: 10,
    paddingBottom: 48,
    color: AppColors().white,
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
  },
  minititle: {
    paddingTop: 30,
    color: AppColors().white,
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
  },
  customButton: {
    borderWidth: 1,
    borderColor: AppColors().white,
    borderRadius: 22,
    height: 50,
    width: 110,
  },
});
