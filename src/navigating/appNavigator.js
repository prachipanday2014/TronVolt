import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {AppColors} from '../constants/appColors';
import {getDimen} from '../dimensions/dimen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import Splash from '../screens/Splash';
import {useSelector} from 'react-redux';
import Seeds from '../screens/seeds/Seeds';
import Setting from '../screens/Setting';
import CreatePin from '../screens/PinGenrate/CreatePin';
import ReEnterPin from '../screens/PinGenrate/ReEnterPin';
import SeedConfirm from '../screens/SeedConfirm';
import SeedConfirmAgain from '../screens/SeedConfirmAgain';
import Receive from '../screens/Receive';
import SeedMatchPhrase from '../screens/seeds/SeedMatchPhrase';
import SelectAccount from '../screens/SelectAccount';
import BuyCrypto2 from '../screens/BuyCrypto2';
import BuyCrypto3 from '../screens/BuyCrypto3';
import News from '../screens/News/News';
import Portfolio from '../screens/Portfolio/Portfolio';
import Swap from '../screens/Swap/Swap';
import ChargeAmount from '../screens/Charge/ChargeAmount';
import ChargeDescription from '../screens/Charge/ChargeDescription';
import SendAmount1 from '../screens/SendAmount1';
import SendAmount2 from '../screens/SendAmount2';
import SendTransaction from '../screens/SendTransaction';
import transaction from '../screens/Swap/Transaction';
import Success from '../screens/Success';
import RestoreWallet from '../screens/wallet/RestoreWallet';
import HeaderRightView from '../components/HeaderRightView';
import Browser from '../screens/browser';
import ChooseLanguage from '../screens/ChooseLanguage';
import SwapAmount from '../screens/Swap/SwapAmount';
import strings from '../constants/localization';
import SwapSuccess from '../screens/Swap/SwapSuccess';
import ReEnterBGscreen from '../screens/PinGenrate/ReEnterPinForBG';
import SelectToken from '../screens/SelectToken';
import SelectAccountInfo from '../screens/Portfolio/SelectAccountInfo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  const setFocus = function (isFocused) {
    if (isFocused) {
      return 'white';
    } else {
      return 'gray';
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Portfolio"
      tabBarOptions={{
        activeTintColor: AppColors().white,
        inactiveTintColor: 'gray',
        safeAreaInset: {bottom: 'never', top: 'never'},
        style: {
          backgroundColor: AppColors().background,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          height: getDimen(0.15),
          paddingBottom: '0%',
        },
      }}>
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Icon name="newspaper-outline" size={30} color={AppColors().white} />
          ),
        }}
      />
      <Tab.Screen
        name="Browser"
        component={Browser}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Icon name="tennisball-outline" size={30} color={AppColors().white}/>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarLabel: ' ',
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Icon name="wallet-outline" size={30} color={AppColors().white}/>
          ),
        }}
      />
      <Tab.Screen
        name="Swap"
        component={Swap}
        options={{
          tabBarLabel: ' ',
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Icon name="sync-circle-outline" size={30} color={AppColors().white}/>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, horizontal, tintColor}) => (
            <Icon name="list-circle-outline" size={30} color={AppColors().white}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const loginStack = () => {
  return (
    <>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Seeds"
        component={Seeds}
        options={{
          headerLeft: () => null,
          headerRight: () => <HeaderRightView />,
          headerShown: true,
          title: `${strings.seedTitle}`,
          headerStyle: {
            backgroundColor: '#666793',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="SeedMatchPhrase"
        component={SeedMatchPhrase}
        options={{
          headerLeft: () => null,
          headerRight: () => <HeaderRightView />,
          headerShown: true,
          title: `${strings.seedConfirmTitle}`,
          headerStyle: {
            backgroundColor: '#666793',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="RestoreWallet"
        component={RestoreWallet}
        options={{
          headerLeft: () => null,
          headerRight: () => <HeaderRightView />,
          headerShown: true,
          title: `${strings.restoreWalletTitle}`,
          headerStyle: {
            backgroundColor: '#666793',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="CreatePin"
        component={CreatePin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReEnterPin"
        component={ReEnterPin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendTransaction"
        component={SendTransaction}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="seedconfirm"
        component={SeedConfirm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="seedconfirmagain"
        component={SeedConfirmAgain}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectAccount"
        component={SelectAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="buycrypto2"
        component={BuyCrypto2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="buycrypto3"
        component={BuyCrypto3}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="News"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Receive"
        component={Receive}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChargeAmount"
        component={ChargeAmount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChargeDescription"
        component={ChargeDescription}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendAmount1"
        component={SendAmount1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendAmount2"
        component={SendAmount2}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectAccountInfo"
        component={SelectAccountInfo}
        options={{
          headerLeft: () => null,
          headerRight: () => <HeaderRightView />,
          headerShown: true,
          title: 'Select Account',
          headerStyle: {
            backgroundColor: '#666793',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={transaction}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChooseLanguage"
        component={ChooseLanguage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SwapAmount"
        component={SwapAmount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SwapSuccess"
        component={SwapSuccess}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ReEnterBG"
        component={ReEnterBGscreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectToken"
        component={SelectToken}
        options={{
          headerShown: false,
        }}
      />
    </>
  );
};

const homeStack = () => {
  return (
    <>
      <Stack.Screen
        name="News"
        component={HomeTab}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{
          headerShown: true,
          title: 'Settings',
        }}
        screenOptions={{
          headerTintColor: 'white',
        }}
      />
    </>
  );
};

const AppNavigator = () => {
  const loginData = useSelector(state => state.login.loginData);

  useEffect(() => {}, [loginData]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Object.keys(loginData).length > 0 ? loginStack() : loginStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
