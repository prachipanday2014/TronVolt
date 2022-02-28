import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import stringsoflanguages from '../constants/localization';
import Icon from 'react-native-vector-icons/Ionicons';
import Line from '../components/Line';
import Toolbar from '../components/toolbar';
import {useDispatch, useSelector} from 'react-redux';
import {THEME_TYPE} from '../store/action';
import {CURRENCY, PREFERRED_CURRENCY} from '../store/action';
import strings from '../constants/localization';
import {SetColors, AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import fontName from '../constants/fontName';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState(true);
  const defaultTheme = useSelector(state => state.theme.isDarkTheme);
  const ChooseLanguage = useSelector(state => state.theme.selectLanguage);

  useEffect(() => {
    stringsoflanguages.setLanguage(ChooseLanguage.languageId);
  }, [ChooseLanguage]);

  useEffect(() => {
    setMode(defaultTheme);
  }, []);

  const toggleSwitch = () => {
    const newMode = !mode;
    setMode(newMode);
    SetColors(newMode);
    dispatch({
      type: THEME_TYPE,
      payload: newMode,
    });
  };

  const [selectcurrency, setSelectCurrency] = useState('USD');
  const currencyData = useSelector(state => state.currency.currencyData);
  const loginToken = useSelector(state => state.login.accessToken);

  const preferredcurrency = useSelector(
    state => state.preferredcurrency.preferredcurrencyData,
  );
  useEffect(() => {
    dispatch({
      type: CURRENCY,
      payload: {
        token: loginToken,
      },
    });
  }, []);

  const Preferredcurrency = () => {
    dispatch({
      type: PREFERRED_CURRENCY,
      payload: {
        token: loginToken,
        data: {
          preference: selectcurrency,
        },
      },
    });
  };

  const [coindata, setCoindata] = useState([]);
  useEffect(() => {
    if (Object.keys(currencyData).length > 0) {
      setCoindata(currencyData.data.result);
    }
  }, [currencyData]);

  useEffect(() => {
    if (Object.keys(preferredcurrency).length > 0) {
      let coin = preferredcurrency.data.preferredCurrency;
    }
  }, [preferredcurrency]);

  const displayModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectCurrency(item.alpha3);
          setModalVisible(!modalVisible);
          Preferredcurrency();
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: AppColors().white,
            justifyContent: 'center',
          }}>
          <Image source={{uri: item.icon}} style={{height: 50, width: 50}} />
          <Text
            style={{
              fontWeight: 'bold',
              color: AppColors().lightBlue3,
              fontSize: textSize.h3,
              fontFamily: fontName.NormalFont,
              padding: 10,
            }}>
            {' '}
            {item.alpha3}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: AppColors().background}}>
      <Toolbar
        title={strings.Setting}
        navigation={navigation}
        isBack={false}
        isAdd={false}
      />
      <ScrollView>
        <View style={{backgroundColor: AppColors().background, flex: 1}}>
          <View style={{margin: 20, marginTop: 0}}>
            <Text
              style={[
                [defaultStyles.Subtitle, {color: AppColors().white}],
                {color: AppColors().lightBlue2},
              ]}>
              {' '}
              {strings.Wallet}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={defaultStyles.settingOptions}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/addressbook.png')}
                    style={defaultStyles.Iconimg}
                  />
                  <Text
                    style={[defaultStyles.label, {color: AppColors().white}]}>
                    {strings.Address_book}
                  </Text>
                </View>
                <Icon
                  style={{marginTop: 5}}
                  name="chevron-forward-outline"
                  size={25}
                  color={AppColors().white}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{margin: 20, marginTop: 0}}>
            <TouchableOpacity onPress={() => {}}>
              <View style={defaultStyles.settingOptions}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/invitefriend.png')}
                    style={defaultStyles.Iconimg}
                  />
                  <Text
                    style={[defaultStyles.label, {color: AppColors().white}]}>
                    {strings.Invite_Friends}
                  </Text>
                </View>
                <Icon
                  style={{marginTop: 5}}
                  name="chevron-forward-outline"
                  size={25}
                  color={AppColors().white}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{margin: 20, marginTop: 0}}>
            <TouchableOpacity onPress={() => {}}>
              <View style={defaultStyles.settingOptions}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/theme.png')}
                    style={defaultStyles.Iconimg}
                  />
                  <Text
                    style={[defaultStyles.label, {color: AppColors().white}]}>
                    {strings.Buy_Crypto}
                  </Text>
                </View>
                <Icon
                  style={{marginTop: 5}}
                  name="chevron-forward-outline"
                  size={25}
                  color={AppColors().white}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{margin: 20, marginTop: 0}}>
            <TouchableOpacity onPress={() => {}}>
              <View style={defaultStyles.settingOptions}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/addressbook.png')}
                    style={defaultStyles.Iconimg}
                  />
                  <Text
                    style={[defaultStyles.label, {color: AppColors().white}]}>
                    {!mode ? strings.Light_Theme : strings.Dark_Theme}
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: AppColors().gradientColor1,
                  }}
                  thumbColor={
                    mode ? AppColors().gradientColor3 : AppColors().white
                  }
                  ios_backgroundColor="#3e3e3e"
                  onChange={toggleSwitch}
                  value={mode}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Line />

          <View style={{margin: 20, marginTop: 0}}>
            <Text
              style={[defaultStyles.Subtitle, {color: AppColors().lightBlue2}]}>
              {strings.Localization}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChooseLanguage');
                }}>
                <View style={defaultStyles.settingOptions}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/language.png')}
                      style={defaultStyles.Iconimg}
                    />
                    <Text
                      style={[defaultStyles.label, {color: AppColors().white}]}>
                      {strings.Language}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: AppColors().lightBlue2,
                        top: 5,
                        marginRight: 4,
                      }}>
                      {ChooseLanguage.languageName}
                    </Text>
                    <Icon
                      style={{marginTop: 5}}
                      name="chevron-forward-outline"
                      size={25}
                      color={AppColors().white}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginVertical: 20}}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={defaultStyles.settingOptions}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/currency.png')}
                      style={defaultStyles.Iconimg}
                    />
                    <Text
                      style={[defaultStyles.label, {color: AppColors().white}]}>
                      Currency
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: AppColors().lightBlue2, top: 5}}>
                      {selectcurrency}{' '}
                    </Text>
                    <Icon
                      style={{marginTop: 5}}
                      name="chevron-forward-outline"
                      size={25}
                      color={AppColors().white}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={{backgroundColor: AppColors().white, top: '50%'}}>
                <View
                  style={{
                    backgroundColor: AppColors().white,
                    height: '7%',
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: AppColors().gray,
                  }}>
                  <Text
                    style={[
                      defaultStyles.title,
                      {color: AppColors().headerColor},
                    ]}>
                    {strings.ChooseCurrency}
                  </Text>
                </View>
                <FlatList
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => (
                    <View style={defaultStyles.FlatListHeaderView}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: AppColors().white,
                            fontSize: textSize.h4,
                            fontFamily: fontName.NormalFont,
                            paddingVertical: 10,
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  data={coindata}
                  renderItem={renderItem}
                />

                <View
                  style={{
                    backgroundColor: AppColors().white,
                    height: '10%',
                    width: '100%',
                    alignItems: 'center',
                    bottom: '53%',
                    borderTopColor: AppColors().gray,
                    borderTopWidth: 4,
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text
                      style={[
                        defaultStyles.title,
                        {color: AppColors().lightBlue3},
                      ]}>
                      {strings.Cancel}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <Line />
          <View style={{margin: 20, marginTop: 0}}>
            <Text
              style={[defaultStyles.Subtitle, {color: AppColors().lightBlue2}]}>
              {strings.Security}
            </Text>
            <View>
              <TouchableOpacity onPress={() => {}}>
                <View style={defaultStyles.settingOptions}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../assets/backup.png')}
                      style={defaultStyles.Iconimg}
                    />
                    <Text
                      style={[defaultStyles.label, {color: AppColors().white}]}>
                      {strings.BackupWallet}
                    </Text>
                  </View>
                  <Icon
                    style={{marginTop: 5}}
                    name="chevron-forward-outline"
                    size={25}
                    color={AppColors().white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors().white,
  },
  buttonView: {
    width: '30%',
    height: '4%',
    backgroundColor: AppColors().gradientColor2,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    color: AppColors().white,
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    alignSelf: 'center',
    top: 5,
  },
  settingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // right: '40%',
  },
  Subtitle: {
    color: AppColors().gradientColor1,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    marginVertical: 25,
    fontWeight: 'bold',
  },
  label: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    fontWeight: '700',
    margin: 10,
    bottom: 5,
  },
  Iconimg: {
    height: 30,
    width: 30,
  },
  FlatListHeaderView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors().white,
    height: '100%',
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: AppColors().lightGray,
    backgroundColor: 'red',
    // height: '100%',
    // width: '100%',
    height: 700,
    width: 200,
    borderTopWidth: 0.6,
    borderTopColor: AppColors().white,
  },
  title: {
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
    fontWeight: '700',
    top: 10,
    // color: AppColors().white,
  },
});
