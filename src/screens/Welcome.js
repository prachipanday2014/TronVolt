import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../constants/appColors';
import lightColors from '../constants/color_light.json';
import strings from '../constants/localization';
import {getDimen} from '../dimensions/dimen';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

export let theme = lightColors;

const Welcome = ({navigation, route}) => {
  const image = require('../assets/welcome_bg.png');
  //const whiteBg = require('../assets/whitebg.jpeg');
  //'https://images.unsplash.com/photo-1601662528567-526cd06f6582?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80',

  const [rollPermision, setRollPermission] = useState(null);

  //Device Back Button Action
  const backAction = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      navigation.goBack();
    }
    return true;
  };
  useEffect(() => {
    //Device Back Button Handle
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    (async () => {
      const cam_roll = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      setRollPermission(cam_roll);
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        // source={AppColors().welcomeLightBg}
        source={image}
        resizeMode="cover"
        style={styles.image}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View></View>
          <View style={styles.innerView}>
            <Text style={styles.title}>{strings.welcomeTo}</Text>
            <Text style={styles.title}>Volt wallet</Text>
            <Text style={styles.details}>{strings.welcomeSubTitleText}</Text>
          </View>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              top: getDimen(0.2),
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
                }}
                onPress={() =>
                  navigation.navigate('CreatePin', {routeName: 'login'})
                }>
                <Text
                  style={{
                    color: AppColors().white,
                    fontSize: textSize.h6,
                    fontFamily: fontName.NormalFont,
                    fontWeight: 'bold',
                    padding: 10,
                  }}>
                  {strings.gotItBtnText}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                AppColors().gradientColor1,
                AppColors().gradientColor2,
                AppColors().gradientColor3,
              ]}
              style={{width: '50%', borderRadius: 20, marginTop: 10}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('CreatePin', {routeName: 'wallet'})
                }>
                <Text
                  style={{
                    color: AppColors().white,
                    fontSize: textSize.h6,
                    fontWeight: 'bold',
                    padding: 10,
                    alignSelf: 'center',
                  }}>
                  {strings.restoreWallet}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{alignItems: 'center', marginBottom: 16}}>
            <Text style={styles.versionStyle}>{strings.version}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  innerView: {
    marginHorizontal: '20%',
    // bottom: getDimen(0.009),
    marginTop: getDimen(0.45),
  },
  title: {
    fontSize: textSize.h1,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    fontWeight: '700',
  },
  details: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    marginTop: 20,
    fontWeight: '700',
  },
  versionStyle: {
    color: AppColors().gray,
    fontWeight: '500',
    fontFamily: fontName.NormalFont,
    marginTop: getDimen(0.05),
  },
});

export default Welcome;
