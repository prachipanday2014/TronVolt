import React from 'react';
import {
  LOGIN,
  USER_LOGIN,
  USER_SIGNUP,
  SIGNUP,
  DASHBOARD,
  LOADING,
  NOTIFY,
  DASHBOARD_DATA,
  MATCHSEEDPHRASE,
  MATCHSEEDPHRASE_DATA,
  GETNEWSEEDPHRASE,
  GETNEWSEEDPHRASE_DATA,
  SWAP,
  SWAP_DATA,
  REGISTER,
  REGISTER_DATA,
  FIATCURRENCIES,
  FIATCURRENCIES_DATA,
  PERCENTAGESWAP_DATA,
  PERCENTAGESWAP,
  CHECKSWAPRATE,
  CHECKSWAPRATE_DATA,
  GET_ADDRESS,
  GET_ADDRESS_DATA,
  NEWS_DATA,
  NEWS,
  SEND,
  SEND_DATA,
  HISTORY,
  HISTORY_DATA,
  COINS_DATA,
  COINS,
  CURRENCY,
  CURRENCY_DATA,
  PREFERRED_CURRENCY,
  PREFERRED_CURRENCY_DATA,
  RESTOREWALLET,
  RESTOREWALLET_DATA,
} from '../action';
import {call, put, takeLatest} from 'redux-saga/effects';
import {API} from '../api';
import showMessage from '../../components/showMessage';

function* login(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getLogin, action.payload);
    yield put({type: USER_LOGIN, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    yield put({type: USER_LOGIN, payload: e.response.data});
  }
}

function* registeration(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getRegister, action.payload);
    yield put({type: REGISTER_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
    // yield put({type: USER_LOGIN, payload: {}});
    yield put({type: REGISTER_DATA, payload: e.response.data});
    //yield put({type: USER_LOGIN, payload: {}});
    // yield put({type: REGISTER_DATA, payload: e.response.data});
  }
}

function* signup(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getSignup, action.payload);
    yield put({type: USER_SIGNUP, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* dashboard(action) {
  try {
    //yield put({type: LOADING, payload: true});
    const data = yield call(API.getDashboardData, action.payload);
    yield put({type: DASHBOARD_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* swap(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getSwap, action.payload);
    yield put({type: SWAP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* fiatCurrencies(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getFiatCurrenciesApi, action.payload);
    yield put({type: FIATCURRENCIES_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* percentageSwap(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getPercentageSwapApi, action.payload);
    yield put({type: PERCENTAGESWAP_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* checkSwapRate(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.checkSwapRateApi, action.payload);
    yield put({type: CHECKSWAPRATE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getSend(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getSend, action.payload);
    yield put({type: SEND_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* historyData(action) {
  try {
    // yield put({type: LOADING, payload: true});
    const data = yield call(API.getHistoryData, action.payload);
    yield put({type: HISTORY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* showToast(action) {
  if (action.payload.response) {
    showMessage(action.payload.response.data.message);
    if (action.payload.response.data.message == 'Unauthorized access.') {
      yield put({type: USER_LOGIN, payload: {}});
    } else if (action.payload.response.data.message == 'Authorization error') {
      yield put({type: USER_LOGIN, payload: {}});
    }
  } else {
    showMessage('server not working');
  }
}
// 8-11-21
function* matchSeedPhrase(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.matchSeedPhraseData, action.payload);
    yield put({type: MATCHSEEDPHRASE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: MATCHSEEDPHRASE_DATA, payload: e.response.data});
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}
function* getNewSeedPhrase(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getNewSeedPhraseData, action.payload);
    yield put({type: GETNEWSEEDPHRASE_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getAddress(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getAddress, action.payload);
    yield put({type: GET_ADDRESS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getNews(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getNews, action.payload);
    yield put({type: NEWS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getAllCoins(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getAllCoinsApi, action.payload);
    yield put({type: COINS_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getCurrency(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getCurrency, action.payload);
    yield put({type: CURRENCY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* getPreferredCurrency(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.getPreferredCurrency, action.payload);
    yield put({type: PREFERRED_CURRENCY_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}

function* restoreWallet(action) {
  try {
    yield put({type: LOADING, payload: true});
    const data = yield call(API.restoreWalletData, action.payload);
    yield put({type: RESTOREWALLET_DATA, payload: data.data});
    yield put({type: LOADING, payload: false});
  } catch (e) {
    yield put({type: RESTOREWALLET_DATA, payload: e.response.data});
    yield put({type: LOADING, payload: false});
    yield put({type: NOTIFY, payload: e});
  }
}
export function* rootSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, registeration);
  yield takeLatest(SIGNUP, signup);
  yield takeLatest(DASHBOARD, dashboard);
  // 8-11-21
  yield takeLatest(MATCHSEEDPHRASE, matchSeedPhrase);
  yield takeLatest(GETNEWSEEDPHRASE, getNewSeedPhrase);
  yield takeLatest(SWAP, swap);
  yield takeLatest(FIATCURRENCIES, fiatCurrencies);
  yield takeLatest(PERCENTAGESWAP, percentageSwap);
  yield takeLatest(CHECKSWAPRATE, checkSwapRate);
  yield takeLatest(GET_ADDRESS, getAddress);
  yield takeLatest(NEWS, getNews);
  yield takeLatest(SEND, getSend);
  yield takeLatest(HISTORY, historyData);
  yield takeLatest(COINS, getAllCoins);

  yield takeLatest(CURRENCY, getCurrency);
  yield takeLatest(PREFERRED_CURRENCY, getPreferredCurrency);
  yield takeLatest(RESTOREWALLET, restoreWallet);
}
