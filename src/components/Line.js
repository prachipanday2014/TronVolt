import React from 'react';
import {View} from 'react-native';
import {AppColors} from '../constants/appColors';
// import { Container } from './styles';

const Line = () => {
  return (
    <View
      style={{
        backgroundColor: AppColors().lightBlue,
        width: '90%',
        height: 0.5,
        marginHorizontal: 10,
        alignSelf: 'center',
      }}></View>
  );
};

export default Line;
