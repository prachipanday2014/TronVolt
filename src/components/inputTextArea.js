import React, { useState } from 'react';
import { TextInput, View, Image, StyleSheet } from 'react-native';
// placeholder, icon, setValue,value
export const InputTextArea = ({ placeholder, setValue, value, keyboardType, secureTextEntry, onSubmitEditing, maxLength }) => {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8A8A8A"
        onChangeText={text => setValue(text)}
        value={value}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 0.5,
  },
});
