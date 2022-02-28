import React, {useState} from 'react';
import {TextInput, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../constants/appColors';
// placeholder, icon, setValue,value
export const InputArea = ({
  icon,
  placeholder,
  setValue,
  value,
  isPassword,
  keyboardType,
  maxLength,
}) => {
  const [hidePass, setHidePass] = useState(true);
  return (
    <View>
      <View
        style={{
          width: '90%',
          height: 50,
          paddingLeft: 10,
          marginLeft: '5%',
          marginRight: '5%',
          marginTop: '4%',
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: AppColors().lightGray,
          backgroundColor: 'white',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowRadius: 2,
          shadowOpacity: 2,
          shadowColor: 'black',
          elevation: 2,
        }}>
        <Icon name={icon} size={25} color={AppColors().gradientColor2} />
        {isPassword === true ? (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={hidePass ? true : false}
            placeholderTextColor="#8A8A8A"
            onChangeText={text => setValue(text)}
            value={value}
            underlineColorAndroid="transparent"
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPassword}
            placeholderTextColor="#8A8A8A"
            onChangeText={text => setValue(text)}
            value={value}
            keyboardType={keyboardType}
            maxLength={maxLength}
            underlineColorAndroid="transparent"
          />
        )}

        {isPassword === true ? (
          <Icon
            name={hidePass ? 'eye-off' : 'eye'}
            size={25}
            style={{marginRight: 10}}
            color="#787878"
            onPress={() => setHidePass(!hidePass)}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#424242',
    backgroundColor: 'white',
  },
});
