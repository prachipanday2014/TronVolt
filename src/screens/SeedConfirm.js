import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import strings from '../constants/localization';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const SeedConfirm = ({navigation}) => {
  const [mode, setMode] = useState(true);

  const toggleSwitch = () => {
    const newMode = !mode;
    setMode(newMode);
  };

  const image = require('../assets/background.png');
  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: AppColors().headerColor,
              height: 70,
              width: '100%',
              paddingTop: 30,
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                color: AppColors().white,
                fontSize: textSize.h1,
                fontFamily: fontName.NormalFont,
                fontWeight: '900',
              }}>
              {' '}
              {strings.seedConfirmTitle}
            </Text>
            <TouchableOpacity>
              <Image
                source={require('../assets/backarrow.png')}
                style={{height: 20, width: 35}}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, marginVertical: '20%'}}>
            <View style={styles.innerView}>
              <Image
                source={require('../assets/security.png')}
                style={{
                  height: 150,
                  width: 150,
                }}
              />
              <Text style={styles.title}>{strings.securityAlert}</Text>
              <Text style={styles.details}>{strings.stayTune} </Text>
              <View
                style={{margin: 20, alignItems: 'center', marginVertical: 20}}>
                <Text style={styles.details}>
                  {' '}
                  {strings.seedConParagraph01}
                </Text>
                <Text style={styles.details}>{strings.seedConParagraph02}</Text>
                <Text style={styles.boldtitle}> {strings.never} </Text>
              </View>
            </View>
            <View></View>
            <View style={{}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: AppColors().gradientColor1,
                  }}
                  thumbColor={
                    mode ? AppColors().gradientColor3 : AppColors().white
                  }
                  ios_backgroundColor="#3e3e3e"
                  onChange={toggleSwitch}
                  value={mode}
                />
                <View>
                  <Text style={styles.details}> {strings.privacyText01}</Text>
                  <Text style={styles.details}> {strings.privacyText02}</Text>
                </View>
              </View>
            </View>

            <View></View>

            <View style={{alignItems: 'center', top: '5%'}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  AppColors().gradientColor1,
                  AppColors().gradientColor2,
                  AppColors().gradientColor3,
                ]}
                style={{width: '50%', borderRadius: 20}}>
                {mode ? (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('seedconfirmagain')}>
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
                ) : (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
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
                  </View>
                )}
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SeedConfirm;
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
    color: 'white',
    margin: 10,
    fontWeight: '700',
  },
  details: {fontSize: textSize.h6, fontFamily: fontName.NormalFont, color: 'white'},
  boldtitle: {
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    color: 'white',
    fontWeight: '700',
    marginVertical: 10,
  },
});
