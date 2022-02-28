import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import showMessage from './showMessage';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../constants/appColors';
import fontName from '../constants/fontName';
import textSize from '../constants/textSize';

const Toolbar = ({navigation, title, isBack, isAdd, isMenu}) => {
  const dispatch = useDispatch();
  return (
    <View style={[styles.HeaderView,{backgroundColor: AppColors().background}]}>
      <View>
        {isMenu ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="md-menu" size={24} color={AppColors().white} />
          </TouchableOpacity>
        ) : null}

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: AppColors().white,
              marginLeft: 8,
              fontWeight: 'bold',
              fontSize: textSize.h2,
              fontFamily: fontName.NormalFont,
            }}>
            {title}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        {isBack ? (
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={AppColors().white} />
          </TouchableOpacity>
        ) : null}
        {isAdd ? (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={() => navigation.goBack()}>
              <Icon name="pie-chart" size={20} color={AppColors().white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={() => navigation.goBack()}>
              <Icon name="add" size={24} color={AppColors().white} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '8.6%',
    padding: 8,
    flexDirection: 'row',
  },
  iconStyle: {
    marginHorizontal: 4,
  },
});

export default Toolbar;
