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
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const BuyCrypto2 = ({navigation}) => {
  const [account, setAccount] = useState('');
  const image = require('../assets/background.png');
  return (
    <View style={{flex: 1, backgroundColor: AppColors().black}}>
      <ScrollView>
        <Toolbar
          title="Buy Crypto "
          navigation={navigation}
          isBack={true}
          isAdd={false}
        />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{marginVertical: 20}}>
            <Text style={styles.label}>{strings.To} : </Text>
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
              <Image
                source={require('../assets/btcn.png')}
                style={{height: 30, width: 30, marginHorizontal: '3%'}}
              />
              <TextInput
                style={styles.input}
                placeholder={strings.BuyCrypto2Placeholder}
                placeholderTextColor={AppColors().white}
                onChangeText={account => setAccount(account)}
                value={account}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity>
                <Image
                  source={require('../assets/downarrow.png')}
                  style={{
                    height: 10,
                    width: 15,
                    marginHorizontal: '3%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                top: 5,
              }}>
              <ImageBackground
                source={require('../assets/btnborder.png')}
                style={{width: 70, height: 20}}>
                <Text style={styles.btnText}> {strings.BTC} </Text>
              </ImageBackground>
              <Text style={styles.bluetext}> {strings.USD}</Text>

              <Text style={styles.bluetext}> + </Text>
            </View>

            <View></View>
            <View></View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginVertical: 20,
              }}>
              <View style={{}}>
                <Text
                  style={[
                    styles.details,
                    {marginVertical: 10, fontWeight: '600', left: 8},
                  ]}>
                  {' '}
                  {strings.AmountTitle}{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={[
                          styles.title,
                          {fontSize: textSize.h2, fontFamily: fontName.NormalFont, marginVertical: -5},
                        ]}>
                        0
                      </Text>
                      <Text
                        style={[styles.details, {fontWeight: '600', right: 5}]}>
                        {' '}
                        {strings.BTC}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.details,
                        {
                          color: AppColors().lightBlue2,
                          marginVertical: 5,
                          left: 15,
                        },
                      ]}>
                      0 {strings.USD}
                    </Text>
                    <Text
                      style={[
                        styles.details,
                        {
                          color: AppColors().lightBlue2,
                        },
                      ]}>
                      ({strings.BuyCrypto2Para})
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View></View>
            <View></View>

            <View style={{margin: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 1 </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 2 </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 3 </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                }}>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 4 </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 5 </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 6 </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 5,
                }}>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 7 </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 8 </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 9 </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> 0 </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../assets/keypadbg.png')}
                    style={{width: 95, height: 45}}>
                    <Text style={styles.keybtnText}> </Text>
                  </ImageBackground>
                </TouchableOpacity>
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
              onPress={() => navigation.navigate('buycrypto3')}>
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
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyCrypto2;
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
  btnText: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue3,
    alignSelf: 'center',
  },
  keybtnText: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue,
    alignSelf: 'center',
    top: 12,
  },
  bluetext: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().lightBlue2,
  },
});
