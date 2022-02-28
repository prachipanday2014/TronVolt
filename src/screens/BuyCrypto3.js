import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from '../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';
import Toolbar from '../components/toolbar';
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';
const BuyCrypto3 = ({navigation}) => {
  const [account, setAccount] = useState('');
  const image = require('../assets/background.png');
  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <ScrollView>
        <Toolbar
          title="Buy Crypto 3 "
          navigation={navigation}
          isBack={true}
          isAdd={false}
        />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: AppColors().headerColor,
              height: 70,
              width: '100%',
              paddingTop: 25,
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                color: AppColors().white,
                fontSize: 25,
                fontWeight: '900',
              }}>
              {' '}
              BUY CRYPTO
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{flexDirection: 'row', paddingTop: 5}}>
                <Text style={{color: AppColors().white}}>Step 3/4 </Text>
                <Image
                  source={require('../assets/backarrow.png')}
                  style={{height: 20, width: 35, marginHorizontal: 10}}
                />
              </View>
            </TouchableOpacity>
          </View> */}

          <View style={{marginVertical: 20}}>
            <Text style={styles.label}> {strings.To} </Text>
            <View
              style={{
                width: '90%',
                height: 40,
                margin: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                elevation: 2,
                backgroundColor: AppColors().black,
                borderColor: AppColors().lightBlue2,
                borderWidth: 1,
                borderRadius: 20,
              }}>
              <TextInput
                style={styles.input}
                placeholder={'BTC MAIN Account'}
                placeholderTextColor={AppColors().white}
                onChangeText={account => setAccount(account)}
                value={account}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View></View>
          <View style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View
                style={{
                  backgroundColor: AppColors().lightBlue3,
                  width: '25%',
                  height: 40,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../assets/copy.png')}
                  style={{height: 20, width: 20, alignSelf: 'center', top: 10}}
                />
              </View>
              <View
                style={{
                  backgroundColor: AppColors().lightBlue3,
                  width: '25%',
                  height: 40,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../assets/copy.png')}
                  style={{height: 20, width: 20, alignSelf: 'center', top: 10}}
                />
              </View>
              <View
                style={{
                  backgroundColor: AppColors().lightBlue3,
                  width: '25%',
                  height: 40,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../assets/scan.png')}
                  style={{height: 20, width: 20, alignSelf: 'center', top: 10}}
                />
              </View>
            </View>

            <View></View>
            <View></View>
          </View>

          <View></View>
          <View></View>
          <View></View>
        </View>
        <View
          style={{
            marginTop: '70%',
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
              onPress={() => navigation.navigate('SendAmount')}>
              <Text
                style={{
                  color: AppColors().white,
                  fontSize: textSize.h5,
                  fontFamily: fontName.NormalFont,
                  padding: 10,
                }}>
                {strings.ProceedToCheckout}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View>
            <Text> {''}</Text>
          </View>
          <Text style={styles.details}> {strings.Redirected}</Text>
          <Text style={styles.details}>{strings.paymentSecurity}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyCrypto3;
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
});
