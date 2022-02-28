import React, {useEffect} from 'react';
import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import {AppBgs, AppColors} from '../constants/appColors';
import Images from '../components/Images';
import ImagesBg from '../constants/ImagesBg.json';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('Welcome'), 2000);
  });

  return (
    <View style={{flex: 1, backgroundColor: AppColors().background}}>
      {/* <ImageBackground
      //source={Images[ImagesBg.SLBG]}
      //source={require('../assets/splash_bg.png')}
       style={styles.image}>*/}
      <View style={styles.innerView}>
        <Image
          resizeMode="cover"
          source={require('../assets/splashLines.png')}
          style={styles.image}
        />
        <Image
          style={{height: 200, width: 130, position: 'absolute'}}
          source={require('../assets/logo.png')}
        />
        <ImageBackground
          style={{
            height: 80,
            width: 80,
            alignItems: 'center',
            position: 'absolute',
            bottom: '20%',
          }}
          source={require('../assets/splash_loader.png')}>
          <Text style={{color: AppColors().white, marginTop: 30}}>50%</Text>
        </ImageBackground>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  innerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
