import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import {useDispatch, useSelector} from 'react-redux';
import {REGISTER, REGISTER_DATA} from '../../store/action';
import DeviceInfo from 'react-native-device-info';
import strings from '../../constants/localization';
import {AppColors} from '../../constants/appColors';

const image = require('../../assets/pingenrate_bg.png');
import AsyncStorage from '@react-native-community/async-storage';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const ReEnterPin = ({route, navigation}) => {
  const pinView = useRef(null);
  const {FirstPin, routeName} = route.params;
  const dispatch = useDispatch();
  const deviceId = DeviceInfo.getUniqueId();

  const [enteredPin, setEnteredPin] = useState('');
  const registration = useSelector(state => state.login.regis);
  const deviceType = DeviceInfo.getSystemName();

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
        navigation.navigate('RestoreWallet', {
          FirstPin: FirstPin,
          confirmMPin: enteredPin,
        });
      } else {
        dispatch({
          type: REGISTER,
          payload: {
            data: {
              deviceId: deviceId,
              device: deviceType,
              mpin: FirstPin,
              confirmMPin: enteredPin,
            },
          },
        });
      }
    }
  }, [enteredPin]);

  useEffect(() => {
    if (Object.keys(registration).length > 0) {
      if (registration.code === 401) {
        navigation.goBack();
      }
      if (registration.status == 'successful') {
        navigation.navigate('Seeds', {
          data: [],
        });
      } else {
      }
    }
  }, [registration]);

  const backToNewPin = () => {
    navigation.navigate('CreatePin');
    //pinView.current.clearAll()
  };

  return (
    <>
      <View style={{backgroundColor: AppColors().background, flex: 1}}>
        <View style={{flex: 0.4, flexDirection: 'row'}}>
          <View style={{width: '90%'}}>
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
              {strings.reEnterPin}{' '}
            </Text>
          </View>
          <TouchableOpacity
            style={{width: '10%'}}
            onPress={() => backToNewPin()}>
            <Icon
              name="ios-arrow-back"
              size={30}
              color={'#c8c9ef'}
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
        </View>
        <ReactNativePinView
          inputSize={12}
          ref={pinView}
          pinLength={6}
          style={{flex: 0.5}}
          buttonSize={110}
          onValueChange={value => setEnteredPin(value)}
          //onComplete={onComplete}
          //onSuccess={ ()=>{alert("SUCCESS")} }
          //onFailure={ ()=>{alert("FAILURE")} }
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
            margin: 20,
          }}
          inputViewFilledStyle={{
            backgroundColor: '#c8c9ef',
            margin: 20,
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: '#FFF',
            borderRadius: 22,
            height: 50,
            //width:200
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
          }}
          customRightButton={
            <Icon name="backspace-outline" size={30} color={'#c8c9ef'} />
          }
          customRightButtonViewStyle={styles.customButton}
          customLeftButtonSize={110}
          customLeftButton={<View></View>}
          customLeftButtonViewStyle={styles.customButton}
        />
      </View>
    </>
  );
};
export default ReEnterPin;
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
