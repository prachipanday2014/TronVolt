import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SectionList,
  Linking,
} from 'react-native';
import Toolbar from '../../components/toolbar';
import {AppColors} from '../../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {NEWS, COINS} from '../../store/action';
import strings from '../../constants/localization';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';
import {useIsFocused} from '@react-navigation/native';

const News = ({navigation}) => {
  const dispatch = useDispatch();
  const newsData = useSelector(state => state.news.newsData);
  const coinData = useSelector(state => state.news.coinData);
  const [allnewsdata, setAllnewsdata] = useState([]);
  const loginToken = useSelector(state => state.login.accessToken);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('is focuss browser');
  }, [isFocused]);

  useEffect(() => {
    dispatch({
      type: NEWS,
      payload: {
        token: loginToken,
        data: {
          page: '1',
        },
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: COINS,
      payload: {
        token: loginToken,
      },
    });
  }, []);

  useEffect(() => {
    if (Object.keys(newsData).length > 0) {
      const usefulldata = JSON.stringify(newsData);
      const allnewsdata1 = newsData && newsData.data && newsData.data.articles;
      setAllnewsdata(allnewsdata1);
    }
  }, [newsData]);

  const usefulldata = JSON.stringify(newsData);

  const DATA1 = [
    {
      title: 'View1',
      data: [],
    },
    {
      title: 'View2',
      data: [],
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item.url)}
        style={{
          backgroundColor: AppColors().cardBackground,
          borderRadius: 10,
          marginVertical: 4,
        }}>
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: item.urlToImage}}
            style={{
              height: 75,
              width: 75,
              borderRadius: 50,
              // top: 10,
              margin: 30,
              alignSelf: 'center',
            }}
          />
          <View style={{marginHorizontal: 40, padding: 10}}>
            <Text style={[styles.newstitle, {color: AppColors().headerColor}]}>
              {' '}
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  styles.subheading,
                  {color: AppColors().white, fontWeight: '700'},
                ]}>
                {item.source_id}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              style={[styles.detailsblack, {color: AppColors().headerColor}]}>
              {item.description}
            </Text>
            <Text style={styles.newsDate1}> {item.publishedAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem1 = item => {
    return (
      <View
        style={{
          backgroundColor: AppColors().white,
          borderRadius: 10,
          margin: 4,
          width: 200,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item.image_url}}
            style={{height: 40, width: 40, alignSelf: 'center'}}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={[styles.newstitle, {color: AppColors().white}]}>
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.detailsblack, {color: AppColors().white}]}>
              {item.description}
            </Text>
            <Text style={styles.newsDate}> {item.pubDate}</Text>
            <Text
              numberOfLines={2}
              style={[
                styles.subheading,
                {color: AppColors().white, fontWeight: '700'},
              ]}>
              {item.source_id}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSection = ({section}) => {
    if (section.title == 'View1') {
      return (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 100,
          }}>
          <Image
            source={require('../../assets/newsmenu.png')}
            style={{height: 50, width: 50, margin: 10, top: 20}}
          />
          <View style={{}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={coinData && coinData.coins}
              horizontal={true}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    if (index === 0) {
                    } else if (index === 1) {
                    } else if (index === 2) {
                    } else if (index === 3) {
                    }
                  }}>
                  <View style={{marginHorizontal: 10}}>
                    <View
                      style={{
                        backgroundColor: AppColors().background,
                        marginVertical: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: AppColors().white,
                        padding: 10,
                        height: '80%',
                      }}>
                      <Image
                        source={{uri: item.imageUrl}}
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
      );
    } else if (section.title == 'View2') {
      return (
        <View>
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text style={styles.title}> {strings.Featured} </Text>
          </View>
          <FlatList
            data={allnewsdata}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Toolbar
        title={strings.News}
        navigation={navigation}
        isBack={false}
        isAdd={false}
      />

      <View
        style={{flex: 1, padding: 10, backgroundColor: AppColors().background}}>
        <View>
          <SectionList
            progressViewOffset={2}
            refreshing={true}
            sections={DATA1}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => null}
            renderSectionHeader={renderSection}
          />
        </View>
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    fontWeight: '800',
  },
  subheading: {
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    fontWeight: '500',
  },
  details: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().gray,
  },
  detailsblack: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    //bottom: 5,
    top: 5,
  },
  newstitle: {
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
    top: 15,
    letterSpacing: 0.5,
  },
  newsDate: {
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
    color: AppColors().white,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  newsDate1: {
    fontSize: textSize.h6,
    fontFamily: fontName.NormalFont,
    color: AppColors().gray,
    marginVertical: 7,
    letterSpacing: 0.5,
    right: 5,
  },
  icon: {
    height: 20,
    width: 33,
    top: 50,
  },
});
