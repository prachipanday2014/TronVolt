import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HeaderRightView = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color={'#ccc'} style={{marginRight: 20}}/>
    </TouchableOpacity>
  );

}
const styles = StyleSheet.create({
  
});
export default HeaderRightView;
