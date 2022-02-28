import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import showMessage from '../components/showMessage';
import Toolbar from '../components/toolbar';
import {AppColors} from '../constants/appColors';
import stringsoflanguages from '../constants/localization';
import {SELECT_LANGUAGE} from '../store/action';
import {useIsFocused} from '@react-navigation/native';

const ChooseLanguage = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItems] = useState([]);
  const [listData, setListData] = useState([
    {
      alpha3: 'AUS',
      currencyId: 'AUD',
      currencyName: 'Australian dollar',
      currencySymbol: '$',
      id: 'en-US',
      name: 'English',
      icon: 'https://countryflags.io/AU/shiny/64.png',
    },
    {
      alpha3: 'IND',
      currencyId: 'INR',
      currencyName: 'Indian rupee',
      currencySymbol: '₹',
      id: 'IN',
      name: 'Hindi',
      icon: 'https://countryflags.io/IN/shiny/64.png',
    },
  ]);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('is focuss browser')
  }, [isFocused]);
  const renderItem = ({item, index}) => (
    <View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 8,
          padding: 8,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={{uri: item.icon}}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 14,
              color: AppColors().white
            }}>
            {item.name}
          </Text>
        </View>
        <View>
          <CheckBox
            checkedIcon={
              <Icon name="ellipse" size={16} color={AppColors().white} />
            }
            uncheckedIcon={
              <Icon
                name="ellipse-outline"
                size={16}
                color={AppColors().white}
              />
            }
            checked={item.selected}
            onPress={() => onUpdateValue(index, !item.selected)}
          />
        </View>
      </View>
      <View style={{backgroundColor: '#c0c0c0', height: 0.5}} />
    </View>
  );

  const onUpdateValue = (index, value) => {
    listData.filter(el => {
      if (el.selected == true) {
        el.selected = false;
      }
    });
    setListData([...listData]);
    listData[index].selected = value;
    setListData([...listData]);
    let selItem = listData.filter(el => el.selected == true);
    setSelectedItems(selItem);
    stringsoflanguages.setLanguage(selItem[0].id);
    dispatch({
      type: SELECT_LANGUAGE,
      payload: {languageId: selItem[0].id, languageName: selItem[0].name},
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors().background}}>
      <View style={{flex: 1}}>
        <Toolbar
          navigation={navigation}
          title="Choose Language"
          isMenu={false}
          isBack={true}
          isFilter={false}
          isSttingFromHome={false}
          isUser={false}
        />
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: AppColors().background,
  },
  title: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: AppColors().buttonColor,
    borderRadius: 6,
    marginLeft: '6%',
    marginRight: '6%',
  },
  title2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-end',
    textAlign: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: AppColors().buttonColor,
  },
  baseText: {
    color: 'white',
  },
});
