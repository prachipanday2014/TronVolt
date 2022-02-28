import {combineReducers} from 'redux';
import {CommonReducer} from './commonReducer';
import {LoginReducer} from './loginReducer';
import {DashboardReducer} from './dashboardReducer';
import {SwapReducer} from './swapReducer';
import {persistReducer} from 'redux-persist';
import {EditPermissionReducer} from './EditPermissionReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerReducer} from './drawerReducer';
import {LOGOUT_DATA} from '../action';
import {SeedsReducer} from './seedsReducer';
import {AddressReducer} from './AddressReducer';
import {NewsReducer, newsReducer} from './NewsReducer';
import {ThemeReducer} from './themeReducer';
import {CurrencyReducer} from './CurrencyReducer';
import {PreferredCurrencyReducer} from './PreferredCurrencyReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'login',
    'dashboard',
    'swap',
    'address',
    'news',
    'currency',
    'preferredcurrency',
    'theme',
  ],
};

const RootReducer = combineReducers({
  common: CommonReducer,
  login: LoginReducer,
  dashboard: DashboardReducer,
  matchSeedPhrase: SeedsReducer,
  swap: SwapReducer,
  address: AddressReducer,
  news: NewsReducer,
  theme: ThemeReducer,
  currency: CurrencyReducer,
  preferredcurrency: PreferredCurrencyReducer,
});

const rootReducer1 = (state, action) => {
  if (action.type === LOGOUT_DATA) {
    state = undefined;
    AsyncStorage.clear();
  }
  return RootReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer1);
