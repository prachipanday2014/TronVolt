import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../constants/appColors';
import {RESTOREWALLET} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import showMessage from '../../components/showMessage';
import DeviceInfo from 'react-native-device-info';
import strings from '../../constants/localization';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const RestoreWallet = ({navigation, route}) => {
  const {FirstPin, confirmMPin} = route.params;
  const dispatch = useDispatch();
  const deviceId = DeviceInfo.getUniqueId();
  const deviceType = DeviceInfo.getSystemName();
  const [inputPhrease, onChangeInputPhrease] = React.useState('');
  const restoreWallData = useSelector(
    state => state.matchSeedPhrase.restoreWallet,
  );
  const restoreWalletApi = () => {
    dispatch({
      type: RESTOREWALLET,
      payload: {
        data: {
          deviceId: deviceId,
          device: deviceType,
          mpin: FirstPin,
          confirmMPin: confirmMPin,
          seedPhrase: inputPhrease,
        },
      },
    });
  };
  useEffect(() => {
    if (Object.keys(restoreWallData).length > 0) {
      if (restoreWallData.code == 200) {
        navigation.navigate('News');
      } else {
        showMessage(restoreWallData.message);
      }
    }
  }, [restoreWallData]);
  return (
    <View style={styles.container}>
      {/* Input box */}
      <View>
        <TextInput
          placeholder={strings.restoreWalletPlaceholder}
          multiline
          numberOfLines={5}
          style={styles.input}
          onChangeText={onChangeInputPhrease}
          value={inputPhrease}
        />
      </View>
      <View style={styles.bottomView}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            AppColors().gradientColor1,
            AppColors().gradientColor2,
            AppColors().gradientColor3,
          ]}
          style={styles.restoreBtnView}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => restoreWalletApi()}>
            <Text
              style={{
                color: AppColors().white,
                fontSize: textSize.h5,
                fontFamily: fontName.NormalFont,
                padding: 10,
              }}>
              {strings.restore}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      {/* note paragraph */}
      <View style={styles.noteParagraphView}>
        <Text style={styles.noteParagraphText}>
          {strings.restoreWalletParagraph}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors().background,
    flexDirection: 'column',
  },
  input: {
    padding: 10,
    borderRadius: 5,
    width: '90%',
    borderColor: AppColors().white,
    color: AppColors().white,
    borderWidth: 1,
    marginTop: '20%',
    marginHorizontal: 20,
  },
  bottomView: {
    alignItems: 'center',
    marginVertical: 10,
  },
  restoreBtnView: {
    width: '90%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteParagraphView: {
    width: '90%',
    marginHorizontal: 20,
    marginTop: 10,
  },
  noteParagraphText: {
    color: AppColors().white,
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
  },
});
export default RestoreWallet;
