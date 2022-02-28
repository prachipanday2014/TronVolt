import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Toolbar from '../components/toolbar';
import {GET_ADDRESS} from '../store/action';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import showMessage from '../components/showMessage';
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const Receive = ({route, navigation}) => {
  const {itemData} = route.params;
  const dispatch = useDispatch();
  const addressData = useSelector(state => state.address.addressData);
  const loginToken = useSelector(state => state.login.accessToken);
  
  useEffect(() => {
    dispatch({
      type: GET_ADDRESS,
      payload: {
        token: loginToken,
        data: {
          currency: itemData,
        },
      },
    });
  }, []);

  const [address, setAddress] = useState('');
  const [qrimage, setQrImage] = useState('');

  useEffect(() => {
    if (Object.keys(addressData).length > 0) {
      setAddress(addressData.data.accounts[0].address);
      setQrImage(addressData.data.accounts[0].qrCode);
    }
  }, [addressData]);

  const [copiedText, setCopiedText] = useState('');

  const image = require('../assets/welcome_bg.png');
  const copyText = text => {
    Clipboard.setString(text);
    fetchCopiedText();
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    //showMessage('Copied Address');
  };

  return (
    <View style={{flex: 1}}>
      <Toolbar
        title={strings.Recieve}
        navigation={navigation}
        isBack={true}
        isAdd={false}
      />
      <View style={{flex: 1, backgroundColor: AppColors().background}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: AppColors().background,
          }}>
          <View style={styles.innerView}>
            <Image style={styles.image} source={require('../assets/btc.png')} />
            <Text style={styles.title}>
              {itemData} {strings.MainAccount}
            </Text>
            <Text style={[styles.details, {color: AppColors().white}]}>
              {address}
            </Text>
          </View>
          <View style={styles.innerView}>
            <Image
              style={styles.qrimage}
              source={{uri: qrimage}}
              //source={require('../assets/qrcode.png')}
            />

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                width: 250,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 100,
                  height: 44,
                  backgroundColor: AppColors().headerColor,
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    copyText(address);
                    showMessage('Copied');
                  }}>
                  <Image
                    style={{height: 24, width: 24, marginVertical: 10}}
                    source={require('../assets/copy_white.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 100,
                  height: 44,
                  backgroundColor: AppColors().headerColor,
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Share.share({
                      message: address,
                    });
                  }}>
                  <Image
                    style={{height: 24, width: 22, marginVertical: 10}}
                    source={require('../assets/share.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{alignContent: 'center', alignItems: 'center'}}></View>

          <View></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 20,
    height: 60,
    width: 60,
  },
  qrimage: {
    height: 250,
    width: 250,
  },
  innerView: {
    marginHorizontal: '10%',
    alignItems: 'center',
  },
  title: {
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
    color: AppColors().headerColor,
    marginTop: 20,
    fontWeight: 'bold',
  },
  details: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    marginTop: 10,
  },
});

export default Receive;
