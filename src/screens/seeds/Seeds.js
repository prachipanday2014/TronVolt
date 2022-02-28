import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../constants/appColors';
import {getUniqueId} from 'react-native-device-info';
import {GETNEWSEEDPHRASE, REGISTER_DATA} from '../../store/action';
import strings from '../../constants/localization';
import {color} from 'react-native-reanimated';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const Seeds = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();
  const newSeedPhraseData = useSelector(
    state => state.matchSeedPhrase.newSeedPhraseData,
  );
  const registration = useSelector(state => state.login.regis);
  const [seedsToken, setSeedsToken] = useState('');

  const [filterArray, setFilterArray] = useState([]);

  useEffect(() => {
    if (data && data !== undefined) {
      setFilterArray(data);
    }

    if (Object.keys(registration).length > 0) {
      if (
        registration &&
        registration.data &&
        registration.data.seedPhrase.length > 0
      ) {
        setFilterArray(registration.data.seedPhrase);
        setSeedsToken(registration.data.token);
        dispatch({
          type: REGISTER_DATA,
          payload: {},
        });
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(newSeedPhraseData).length > 0) {
      if (
        newSeedPhraseData &&
        newSeedPhraseData.data &&
        newSeedPhraseData.data.menmonic.length > 0
      ) {
        setFilterArray(newSeedPhraseData.data.menmonic);
      }
    }
  }, [newSeedPhraseData]);

  const getNewSeedPhrase = () => {
    dispatch({
      type: GETNEWSEEDPHRASE,
      payload: {
        data: {
          data: {deviceId: getUniqueId()},
          token: seedsToken,
        },
      },
    });
  };
  return (
    <View style={styles.container}>
      {/* note view */}
      <View style={styles.noteParagraphView}>
        <View style={{width: '90%'}}>
          <Text style={styles.noteParagraphText}>
            {strings.seedsNoteParagraph}
          </Text>
        </View>
        <View style={styles.cloneIconView}>
          <Icon name="copy-outline" size={20} color={'#ccc'} />
        </View>
      </View>
      {/* chips View */}
      <View style={styles.chipsParentView}>
        {filterArray.map((item, index) => {
          return (
            <View key={index} style={styles.chipsItemWrapper}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  AppColors().gradientColor1,
                  AppColors().gradientColor2,
                  AppColors().gradientColor3,
                ]}
                style={styles.chipsItemIndexView}>
                <Text style={styles.chipsItemIndex}>{index + 1}</Text>
              </LinearGradient>
              <Text style={{color: '#FFF'}}>&nbsp;{item}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.bottomView}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            AppColors().gradientColor1,
            AppColors().gradientColor2,
            AppColors().gradientColor3,
          ]}
          style={{width: '50%', borderRadius: 20}}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.navigate('SeedMatchPhrase', {data: filterArray})
            }>
            <Text
              style={{
                color: AppColors().white,
                fontSize: textSize.h5,
                fontFamily: fontName.NormalFont,
                padding: 10,
              }}>
              {strings.writtenItDown}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => getNewSeedPhrase()}
          style={styles.getNewSeedView}>
          <Icon name="refresh-outline" size={15} color={'#ccc'} />
          <Text style={[styles.getNewSeedText, {color: AppColors().gray}]}>
            &nbsp;&nbsp;{strings.getNewSeed}
          </Text>
        </TouchableOpacity>
        <View style={styles.getNewSeedParaView}>
          <View style={{width: '10%'}}>
            <Icon name="alert-circle-outline" size={25} color={'#ccc'} />
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.getNewSeedNoteParaText}>
              {strings.seedsNoteParagraph02}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors().background,
    flexDirection: 'column',
  },
  //paragraph
  noteParagraphView: {
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
  },
  noteParagraphText: {
    color: AppColors().white,
    fontSize: textSize.h5,
    fontFamily: fontName.NormalFont,
  },
  cloneIconView: {
    width: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //chips view
  chipsParentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 25,
    marginHorizontal: 10,
  },
  chipsItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: AppColors().white,
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
  },
  chipsItemIndexView: {
    backgroundColor: AppColors().gradientColor1,
    padding: 5,
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  chipsItemIndex: {
    textAlign: 'center',
    fontSize: textSize.p,
    fontFamily: fontName.NormalFont,
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  writtenDownBtnView: {
    backgroundColor: AppColors().gradientColor1,
    height: 50,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  writtenDownBtnText: {
    color: AppColors().white,
    fontSize: textSize.h4,
    fontFamily: fontName.NormalFont,
  },
  getNewSeedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  getNewSeedText: {
    //color: AppColors().gray,
  },
  getNewSeedParaView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  getNewSeedNoteParaText: {
    color: AppColors().gray,
    fontSize: textSize.p,
    fontFamily: fontName.NormalFont,
  },
});
export default Seeds;
