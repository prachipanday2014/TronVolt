import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toolbar from '../../components/toolbar';
import {AppColors} from '../../constants/appColors';
import {getDimen} from '../../dimensions/dimen';
import textSize from '../../constants/textSize';
import strings from '../../constants/localization';
import fontName from '../../constants/fontName';

const ChargeAmount = ({navigation}) => {
  const [text, onChangeText] = useState('0');
  return (
    <View style={{flex: 1, backgroundColor: AppColors().background}}>
      <Toolbar
        title={strings.ChargeTitle}
        navigation={navigation}
        isBack={true}
        isAdd={false}
      />
      <View
        style={{
          flex: 0.95,
          backgroundColor: AppColors().background,
          padding: 20,
        }}>
        <Text style={styles.amount}>{strings.AmountTitle}</Text>
        <View style={styles.viewStyle}>
          <View
            style={[
              styles.buttonStyle,
              {
                borderWidth: 1,
                borderColor: AppColors().gradientColor2,
                borderRadius: getDimen(0.1),
              },
            ]}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.textStyle, {color: AppColors().lightBlue3}]}>
                {strings.BTC}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.textStyle, {color: AppColors().lightBlue3}]}>
                {strings.USD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          autoFocus={true}
          style={styles.textValueStyle}
          onChangeText={onChangeText}
          value={text}
          keyboardType="numeric"
        />

        <Text
          style={[
            styles.textStyle,
            {color: AppColors().lightBlue2, marginTop: getDimen(0.06)},
          ]}>
          {strings.AmountParagraph}
        </Text>
        <Text
          style={[
            styles.textStyle,
            {marginTop: getDimen(0.009)},
            {color: AppColors().lightBlue2},
          ]}>
          0.0 {strings.USD}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: 20,
        }}>
        <View style={styles.nextView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChargeDescription');
            }}>
            <Text style={styles.textStyle}> {strings.next}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChargeAmount;

const styles = StyleSheet.create({
  amount: {
    color: AppColors().lightBlue2,
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: getDimen(0.05),
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getDimen(0.06),
  },
  textStyle: {
    color: AppColors().black,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textValueStyle: {
    color: AppColors().lightBlue3,
    fontSize: textSize.h1,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: getDimen(0.1),
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getDimen(0.25),
    height: getDimen(0.09),
  },
  nextView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getDimen(0.5),
    height: getDimen(0.12),
    backgroundColor: AppColors().gradientColor2,
    borderRadius: getDimen(0.1),
  },
});
