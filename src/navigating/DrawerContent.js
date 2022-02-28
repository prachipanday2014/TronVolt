import React from 'react';
import {View, StyleSheet, Image, SafeAreaView, Alert} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Coin} from '../assets/Coin';
import {ChangeLanguageIcon} from '../assets/ChangeLanguageIcon';
import {ChooseCurrencyIcon} from '../assets/ChooseCurrencyIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import {DASHBOARD_DATA, LOGOUT_DATA, USER_LOGIN} from '../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../constants/appColors';

export function DrawerContent({props, navigation}) {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.login.loginData);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors().bottomTabColor}}>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              {userToken.data ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 30,
                    alignItems: 'center',
                    height: 80,
                  }}>
                  <Avatar.Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                    }}
                    size={60}
                  />
                  <View style={{marginLeft: 15, flexDirection: 'column'}}>
                    <Title style={styles.title}>{userToken.data.name}</Title>
                    <Text style={styles.caption} numberOfLines={1}>
                      {userToken.data.email}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home" color="black" size={size} />
                )}
                label="Home"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="key" color="black" size={size} />
                )}
                label="API Key List"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('ApiKey');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <ChooseCurrencyIcon
                    height={size}
                    width={size}
                    color="black"
                  />
                )}
                label="Choose Currency"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('CommingSoon');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <ChangeLanguageIcon
                    height={size}
                    width={size}
                    color="black"
                  />
                )}
                label="Change Language"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('CommingSoon');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Coin height={size} width={size} color="black" />
                )}
                label="Coin acceptance setting"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('AutoConvert');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="md-settings" color="black" size={size} />
                )}
                label="Account Setting"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('AccountSetting');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="information-circle" color="black" size={size} />
                )}
                label="About Us"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  navigation.navigate('AppAboutUs');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="power" color="black" size={size} />
                )}
                label="Sign Out"
                labelStyle={{color: 'black'}}
                onPress={() => {
                  Alert.alert(
                    'Logout',
                    'Are you sure want to logout',
                    [
                      {
                        text: 'Yes',
                        onPress: () => {
                          dispatch({
                            type: USER_LOGIN,
                            payload: {},
                          }),
                            dispatch({type: LOGOUT_DATA});
                        },
                      },
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    },
                  );
                  navigation.closeDrawer();
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 30,
                alignItems: 'center',
              }}>
              <View style={{marginHorizontal: 8, flexDirection: 'column'}}>
                <Title
                  style={{
                    fontSize: 12,
                    color: 'white',
                  }}>
                  Discover way to earn crypto
                </Title>
                <Caption
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Start earning
                </Caption>
              </View>
              <Image
                style={{
                  width: 80,
                  height: 100,
                  marginLeft: 8,
                }}
                source={require('../assets/slider_img.png')}
                resizeMode="contain"
              />
            </View>
          </View>
        </Drawer.Section>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: AppColors().bottomTabColor,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 12,
    color: 'white',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    height: 500,
    marginTop: 15,
    backgroundColor: 'white',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: AppColors().bottomTabColor,
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
