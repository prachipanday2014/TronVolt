import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackgroundBase,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColors} from '../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';
import {GradientButton} from '../components/GradientButton';
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const SeedConfirmAgain = ({navigation}) => {
  const image = require('../assets/background.png');
  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View></View>
          <View style={styles.innerView}>
            <Image
              source={require('../assets/security.png')}
              style={{
                height: 150,
                width: 150,
                marginVertical: 20,
              }}
            />
            <Text style={styles.title}>{strings.willNeverAsk}</Text>
            <View style={{marginVertical: 10}}>
              <Text style={styles.title}>{strings.forYourSeed}</Text>
            </View>
            <Text style={styles.subheading}>{strings.impNotice}</Text>
            <View
              style={{margin: 20, alignItems: 'center', marginVertical: 30}}>
              <Text style={styles.details}>{strings.seedConAgainPara01}</Text>
              <Text style={styles.details}>{strings.seedConAgainPara02}</Text>
              <Text style={styles.details}>
                {strings.seedConAgainPara03}
              </Text>
              <Text style={styles.details}>
                {strings.seedConAgainPara04}
              </Text>
              <Text style={styles.details}>{strings.seedConAgainPara05}</Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[AppColors().gradientColor1, AppColors().gradientColor3]}
              style={{width: '50%', borderRadius: 20}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('News')}>
                <Text
                  style={{
                    color: AppColors().white,
                    fontSize: textSize.h5,
                    fontFamily: fontName.NormalFont,
                    padding: 10,
                  }}>
                  {strings.gotItBtnText}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* <GradientButton
              text=" Okay, I Got it "
              onPress={() => navigation.navigate('setting')}
            /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SeedConfirmAgain;
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
    marginVertical: '10%',
  },
  title: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: 'white',
    marginHorizontal: 10,
    fontWeight: '800',
  },
  subheading: {
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '500',
    bottom: 10,
  },
  details: {fontSize: textSize.h6, fontFamily: fontName.NormalFont, color: 'white', marginVertical: 3},
  boldtitle: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '700',
    marginVertical: 10,
  },
});
