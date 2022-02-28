import React from 'react';
import {Modal, View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export const Loading = () => {
  const loading = useSelector(state => state.common.loading);
  
  return (
    <Modal
      visible={loading}
      presentationStyle="overFullScreen"
      transparent={true}>
      <View style={styles.popupWrapper}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{color: '#fff'}}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
