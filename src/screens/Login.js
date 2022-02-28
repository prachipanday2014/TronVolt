import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {defaultStyles} from '../styles';

const Login = ({navigation}) => {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate('setting')}>
        <Text>Setting</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('seedConfirm')}>
        <Text>Seed Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
