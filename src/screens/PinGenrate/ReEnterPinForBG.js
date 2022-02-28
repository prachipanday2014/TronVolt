import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../../constants/appColors';
import showMessage from '../../components/showMessage';
import {ACCESS_TOKEN, LOGIN, USER_LOGIN} from '../../store/action';
import DeviceInfo from 'react-native-device-info';
import strings from '../../constants/localization';
import AsyncStorage from '@react-native-community/async-storage';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const ReEnterPinForBG = ({route, navigation}) => {
  const pinView = useRef(null);
  const [enteredPin, setEnteredPin] = useState('');
  const deviceId = DeviceInfo.getUniqueId();
  const image = require('../../assets/pingenrate_bg.png');
  const userLogin = useSelector(state => state.login.loginData);

  useEffect(() => {
    if (enteredPin.length === 6) {
      getData();
    }
  }, [enteredPin]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('enteredPin');
      if (value !== null) {
        if (value == enteredPin) {
          navigation.goBack();
        } else {
          pinView.current.clearAll();
          showMessage('Incorrect Password!!');
        }
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <>
      <View style={{backgroundColor: AppColors().black, flex: 1}}>
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
          onValueChange={text => setEnteredPin(text)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#c8c9ef',
            margin: 20,
          }}
          inputViewFilledStyle={{
            backgroundColor: '#c8c9ef',
            margin: 20,
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: '#c8c9ef',
            borderRadius: 22,
            height: 50,
          }}
          buttonTextStyle={{
            color: '#c8c9ef',
            fontSize: textSize.h4,
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
            <Icon name="backspace-outline" size={30} color={'#c8c9ef'} />
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
export default ReEnterPinForBG;

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
    color: '#c8c9ef',
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
  },
  minititle: {
    paddingTop: 30,
    color: '#c8c9ef',
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
  },
  customButton: {
    borderWidth: 1,
    borderColor: '#c8c9ef',
    borderRadius: 22,
    height: 50,
    width: 110,
  },
});
