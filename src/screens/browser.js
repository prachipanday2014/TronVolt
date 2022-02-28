import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Toolbar from '../components/toolbar';
import {AppColors} from '../constants/appColors';
import strings from '../constants/localization';
import {useIsFocused} from '@react-navigation/native';

const Browser = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('is focuss browser')
  }, [isFocused]);
  return (
    <View style={{flex: 1, backgroundColor: AppColors().background}}>
      <Toolbar
        title={strings.Browser}
        navigation={navigation}
        isBack={false}
        isAdd={false}
      />

      <Text style={{color: AppColors().white}}>{strings.Browser}</Text>
    </View>
  );
};

export default Browser;
