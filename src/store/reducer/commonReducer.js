import {
  LOADING,
  LOGOUT_DATA,
  NOTIFY,
  SELECT_CURRENCY_DATA,
  TRANSFER_DATA,
} from '../action';
import AsyncStorage from '@react-native-community/async-storage';

const initState = {
  loading: false,
  notify: '',
  currencyData: [],
  transferData: {},
  logoutData: {},
};

export const CommonReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING: {
      return {...state, loading: action.payload};
    }
    case NOTIFY: {
      return {...state, notify: action.payload, loading: false};
    }
    case SELECT_CURRENCY_DATA: {
      return {...state, currencyData: action.payload};
    }
    case TRANSFER_DATA: {
      return {...state, transferData: action.payload};
    }
    default: {
      return state;
    }
  }
};
