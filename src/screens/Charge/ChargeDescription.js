import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Toolbar from '../../components/toolbar';
import {AppColors} from '../../constants/appColors';
import {getDimen} from '../../dimensions/dimen';
import textSize from '../../constants/textSize';
import strings from '../../constants/localization';
import fontName from '../../constants/fontName';

const ChargeDescription = ({navigation}) => {
  const [text, onChangeText] = useState('');
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
        <View style={styles.textValueStyle}>
          <Text style={styles.label}>{strings.ChargeDiscription}  </Text>
          <TextInput
            // autoFocus={true}
            placeholder= {strings.ChargePlaceholder}
            placeholderTextColor={AppColors().lightBlue2}
            style={styles.placeholder}
            onChangeText={onChangeText}
            value={text}
            keyboardType="default"
          />
        </View>
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
            <Text style={styles.textStyle}>{strings.next}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChargeDescription;

const styles = StyleSheet.create({
  textValueStyle: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: getDimen(0.1),
    borderWidth: getDimen(0.0025),
    borderColor: AppColors().lightBlue2,
    height: getDimen(0.5),
    borderRadius: getDimen(0.1),
    paddingLeft: getDimen(0.04),
  },
  textInputStyle: {
    color: AppColors().lightBlue2,
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  nextView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getDimen(0.5),
    height: getDimen(0.12),
    backgroundColor: AppColors().gradientColor2,
    borderRadius: getDimen(0.1),
  },
  textStyle: {
    color: AppColors().black,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    color: AppColors().lightBlue2,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    paddingTop: getDimen(0.04),
    paddingLeft: getDimen(0.04),
    fontWeight: '900',
  },
  placeholder: {
    color: AppColors().black,
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
    paddingTop: getDimen(0.04),
    paddingLeft: getDimen(0.04),
  },
});
