import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../constants/appColors';
import {getUniqueId} from 'react-native-device-info';
import {
  ACCESS_TOKEN,
  MATCHSEEDPHRASE,
  MATCHSEEDPHRASE_DATA,
} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import showMessage from '../../components/showMessage';
import DeviceInfo from 'react-native-device-info';
import strings from '../../constants/localization';
import textSize from '../../constants/textSize';
import fontName from '../../constants/fontName';

const SeedMatchPhrase = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();
  const deviceId = DeviceInfo.getUniqueId();

  const matchPhraseData = useSelector(
    state => state.matchSeedPhrase.matchSeedPhraseData,
  );

  useEffect(() => {
    shuffleArray(data);
  }, []);
  const shuffleArray = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setFilterArray(array);
    return array;
  };
  const [filterArray, setFilterArray] = useState([]);
  const [showArray, setShowArray] = useState([]);

  const addElementInArray = chips => {
    let filterVal = filterArray.filter(value => value !== chips);
    setFilterArray(filterVal);
    setShowArray(prevState => [...prevState, chips]);
  };
  const removeElementInArray = chips => {
    let filterVal = showArray.filter(value => value !== chips);
    setShowArray(filterVal);
    setFilterArray(prevState => [...prevState, chips]);
  };

  const saveMatchPhrase = () => {
    dispatch({
      type: MATCHSEEDPHRASE,
      payload: {
        data: {
          phrase: showArray,
          deviceId: deviceId,
        },
      },
    });
    if (Object.keys(matchPhraseData).length > 0) {
      if (matchPhraseData.status == 'successful') {
        navigation.navigate('seedconfirm');
      } else {
        showMessage(matchPhraseData.data.message);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(matchPhraseData).length > 0) {
      if (matchPhraseData.code === 200) {
        dispatch({
          type: ACCESS_TOKEN,
          payload: matchPhraseData.data.accessToken,
        });
        dispatch({
          type: MATCHSEEDPHRASE_DATA,
          payload: {},
        });
        navigation.navigate('seedconfirm');
      } else {
        showMessage(matchPhraseData.data.message);
      }
    }
  }, [matchPhraseData]);

  return (
    <View style={styles.container}>
      <View style={styles.noteParagraphView}>
        <View style={{width: '90%'}}>
          <Text style={styles.noteParagraphText}>
            {strings.seedsMatchNotepara}
          </Text>
        </View>
        <View style={styles.cloneIconView}>
          <Icon name="clone" size={20} color={'#ccc'} />
        </View>
      </View>
      {/* selected */}
      {showArray.length > 0 ? (
        <View style={styles.selectedChipsParentView}>
          {showArray.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => removeElementInArray(item)}
                style={styles.phraseItemWrapper}>
                <Text style={{color: AppColors().white}}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      {/* initial */}
      <View style={styles.chipsParentView}>
        {filterArray.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => addElementInArray(item)}
              style={styles.chipsItemWrapper}>
              <Text style={{color: AppColors().white}}>{item}</Text>
            </TouchableOpacity>
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
            onPress={() => saveMatchPhrase()}>
            <Text
              style={{
                color: AppColors().white,
                fontSize: textSize.h5,
                fontFamily: fontName.NormalFont,
                padding: 10,
              }}>
              {strings.verify}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
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
  selectedChipsParentView: {
    backgroundColor: AppColors().headerColor,
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 20,
  },
  chipsParentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    margin: 10,
  },
  phraseItemWrapper: {
    margin: 5,
  },
  chipsItemWrapper: {
    padding: 10,
    borderColor: AppColors().white,
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
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
});
export default SeedMatchPhrase;
