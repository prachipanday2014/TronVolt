import React from 'react';
import {ToastAndroid, AlertIOS} from 'react-native';

const showMessage = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  } else {
    AlertIOS.alert(msg);
  }
};

export default showMessage;
