import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {AppColors} from '../constants/appColors';
import LinearGradient from 'react-native-linear-gradient';

export const GradientButton = ({onPress, text, style}) => {
  return (
    <View style={style}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          AppColors().gradientColor1,
          AppColors().gradientColor2,
          AppColors().gradientColor3,
        ]}
        style={{
          width: '50%',
          borderRadius: 20,
          margin: 5,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
          }}
          onPress={onPress}>
          <Text
            style={{
              color: AppColors().white,
              fontSize: 14,
              padding: 10,
              marginHorizontal: 20,
            }}>
            {text}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({});
