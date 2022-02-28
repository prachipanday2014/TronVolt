import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../../constants/appColors';
import fontName from '../../constants/fontName';
import textSize from '../../constants/textSize';
import {COINS} from '../../store/action';
const SelectAccountInfo = ({route, navigation}) => {
  const {itemData} = route.params;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const loginToken = useSelector(state => state.login.accessToken);
  const coinData = useSelector(state => state.news.coinData);
  const dashboardData = useSelector(state => state.dashboard.dashboardData);

  useEffect(() => {
    dispatch({
      type: COINS,
      payload: {
        token: loginToken,
      },
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors().background,
        flexDirection: 'column',
      }}>
      <View style={[styles.inputWrapper,{backgroundColor: AppColors().background,borderColor: AppColors().borderColor, borderWidth: 1}]}>
        <View style={{width: '90%'}}>
          <TextInput
            keyboardType={'default'}
            style={styles.input}
            placeholder={'Search coin'}
            placeholderTextColor="#8A8A8A"
            onChangeText={text => setSearchText(text)}
            value={searchText}
            underlineColorAndroid="transparent"
          />
        </View>
        <Icon name={'search'} size={25} color={AppColors().white} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
        }}>
        <Image
          source={require('../../assets/newsmenu.png')}
          style={{height: 50, width: 50, margin: 10, top: 20}}
        />
        <View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={dashboardData && dashboardData.result && dashboardData.result}
            horizontal={true}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SelectAccount', {itemData: item})
                }>
                <View style={{marginHorizontal: 10}}>
                  <View
                    style={{
                      backgroundColor: AppColors().background,
                      marginVertical: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: AppColors().white,
                      padding: 10,
                      //   height: '0%',
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      style={{
                        color: AppColors().white,
                        fontSize: textSize.h6,
                        fontFamily: fontName.NormalFont,
                        paddingVertical: 10,
                        top: 5,
                        alignSelf: 'center',
                      }}>
                      {' '}
                      {item.symbol}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <ScrollView>
        {/* {itemData && itemData.map((item)=>{
            return( */}
        <View style={[styles.coinCardView,{backgroundColor: AppColors().cardBackground}]}>
          <View style={styles.leftCoinCardView}>
            <Text style={styles.coinNameText}>
              {itemData.symbol} Main Account
            </Text>
            <Text style={styles.coinDetailsText}>{itemData.name}</Text>
            <Text style={styles.coinDetailsText}>
              {itemData.information[0].Address}
            </Text>
          </View>
          <View style={styles.rightCoinCardView}>
            <Text style={styles.coinNameText}>
              {itemData.totalBalance} {itemData.symbol}
            </Text>
          </View>
        </View>
        {/* ) */}
        {/* }) */}
        {/* } */}
      </ScrollView>
    </View>
  );
};
export default SelectAccountInfo;
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors().white,
  },
  input: {
    paddingLeft: 10,
  },
  coinCardView: {
    width: '95%',
    backgroundColor: AppColors().background,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: AppColors().borderColor
  },
  leftCoinCardView: {
    width: '80%',
  },
  rightCoinCardView: {
    width: '20%',
  },
  coinNameText: {
    color: AppColors().white,
    fontSize: textSize.h3,
    fontFamily: fontName.NormalFont,
  },
  coinDetailsText: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
  },
});
