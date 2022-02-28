import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import Toolbar from '../components/toolbar';
import {AppColors} from '../constants/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {DASHBOARD} from '../store/action';
import {useIsFocused} from '@react-navigation/native';
import strings from '../constants/localization';
import textSize from '../constants/textSize';
import {getDimen} from '../dimensions/dimen';
import {TouchableHighlight} from 'react-native-gesture-handler';
import fontName from '../constants/fontName';
// import { Container } from './styles';

const SelectToken = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [mode, setMode] = useState(true);
  const [selectedItem, setSelectedItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');

  const dashboardData = useSelector(state => state.dashboard.dashboardData);
  const loginToken = useSelector(state => state.login.accessToken);

  const onUpdateValue = (index, value) => {
    const newMode = !mode;
    setMode(newMode);
    filterData.filter(el => {
      if (el.selected == true) {
        el.selected = false;
      }
    });
    setFilterData([...filterData]);
    filterData[index].selected = value;
    setFilterData([...filterData]);
    let selItem = filterData.filter(el => el.selected == true);
    setSelectedItems(selItem);

    dispatch({
      type: DASHBOARD,
      payload: {
        token: loginToken,
      },
    });
    [isFocused];
    navigation.goBack();
  };

  useEffect(() => {
    if (Object.keys(dashboardData).length > 0) {
      setReports(dashboardData.result);
    }
  }, [dashboardData]);

  let [isPress, setIsPress] = React.useState(false);

  let touchProps = {
    activeOpacity: 1,
    underlayColor: AppColors().white,
    style: isPress ? styles.buttonStyle : styles.btnNormal,
    onHideUnderlay: () => setIsPress(true),
    onShowUnderlay: () => setIsPress(true),
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                style={{width: 40, height: 40, marginRight: 5}}
                source={{
                  uri: item.image,
                }}
                resizeMode={'cover'}
              />
              <Text
                style={{
                  color: AppColors().white,
                  marginLeft: 8,
                  fontSize: textSize.h4,
                  fontFamily: fontName.NormalFont,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
            </View>

            <Switch
              trackColor={{
                false: '#767577',
                true: AppColors().gradientColor2,
              }}
              thumbColor={mode ? AppColors().gradientColor3 : AppColors().white}
              ios_backgroundColor="#3e3e3e"
              onChange={item.selected}
              onPress={() => onUpdateValue(index, !item.selected)}
              //value={item.selected ? mode : !mode}
              value={!mode}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Toolbar
        title={strings.SelectToken}
        navigation={navigation}
        isBack={true}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors().background,
          padding: 20,
        }}>
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: AppColors().white,
                borderRadius: 30,
                paddingHorizontal: 20,
                color: AppColors().white,
              }}
              placeholder="Type token name"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={searchInput}
              placeholderTextColor={AppColors().white}
              onChangeText={search => setSearch(search)}
              value={search}
            />
            <Icon
              name="search"
              size={25}
              color="#FFF"
              style={{top: '3%', right: 40}}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.buttonStyle}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={[styles.textStyle, {color: AppColors().white}]}>
                  {strings.All}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight>
              <Text
                style={[
                  styles.textStyle,
                  {color: AppColors().white, margin: 22},
                ]}>
                ETH
              </Text>
            </TouchableHighlight>

            <Text
              style={[
                styles.textStyle,
                {color: AppColors().white, margin: 22},
              ]}>
              TRX
            </Text>
            <Text
              style={[
                styles.textStyle,
                {color: AppColors().white, margin: 22},
              ]}>
              BNB
            </Text>
          </View>

          <FlatList
            style={{marginTop: 20}}
            data={filterData && filterData.length > 0 ? filterData : reports}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectToken;

const styles = StyleSheet.create({
  amount: {
    color: AppColors().lightBlue2,
    fontSize: textSize.h2,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: getDimen(0.05),
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getDimen(0.06),
  },
  textStyle: {
    color: AppColors().black,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textValueStyle: {
    color: AppColors().lightBlue3,
    fontSize: textSize.h1,
    fontFamily: fontName.NormalFont,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: getDimen(0.1),
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getDimen(0.19),
    height: getDimen(0.08),
    marginTop: 20,
    borderWidth: 1,
    borderColor: AppColors().gradientColor2,
    borderRadius: getDimen(0.1),
  },
  btnNormal: {
    color: AppColors.lightBlue2,
  },
  nextView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getDimen(0.5),
    height: getDimen(0.12),
    backgroundColor: AppColors().gradientColor2,
    borderRadius: getDimen(0.1),
  },
});
