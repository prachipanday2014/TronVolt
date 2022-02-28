import axios from 'axios';
import * as config from '../../constants/config.json';

axios.defaults.baseURL = config.liveUrl;

export const API = {
  getLogin: async data => {
    const result = await axios({
      method: 'POST',
      url: `user/login`,
      data: data.data,
    });
    return result;
  },

  getSignup: async data => {
    const result = await axios({
      method: 'POST',
      url: `/users/signup`,
      data: data,
    });
    return result;
  },

  getDashboardData: async data => {
    const result = await axios({
      method: 'GET',
      url: `dashboard`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  matchSeedPhraseData: async data => {
    const result = await axios({
      method: 'POST',
      url: `matchPhrase`,
      headers: {Authorization: `Bearer ${data.token}`},
      data: data.data,
    });
    return result;
  },

  getNewSeedPhraseData: async data => {
    const result = await axios({
      method: 'POST',
      url: `getNewSeedPhrase`,
      data: data.data.data,
      headers: {Authorization: `Bearer ${data.data.token}`},
    });
    return result;
  },

  getSwap: async data => {
    const result = await axios({
      method: 'POST',
      url: `swap`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getFiatCurrenciesApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/getFiatCurrencies`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getPercentageSwapApi: async data => {
    const result = await axios({
      method: 'POST',
      url: `perentageSwap`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  checkSwapRateApi: async data => {
    const result = await axios({
      method: 'POST',
      url: `checkSwapRate`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getRegister: async data => {
    const result = await axios({
      method: 'POST',
      url: `user/register`,
      data: data.data,
    });
    return result;
  },

  getAddress: async data => {
    const result = await axios({
      method: 'POST',
      url: `getAddress`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getNews: async data => {
    const result = await axios({
      method: 'GET',
      url: `news?page=2`,
      data: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });

    return result;
  },

  getSend: async data => {
    const result = await axios({
      method: 'POST',
      url: `users/withdrawal`,
      data: data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getHistoryData: async data => {
    const result = await axios({
      method: 'GET',
      url: `/transactionHistory`,
      params: data.data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getAllCoinsApi: async data => {
    const result = await axios({
      method: 'GET',
      url: `/getAllCoins`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },
  getCurrency: async data => {
    const result = await axios({
      method: 'GET',
      url: `getFiatCurrencies`,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  getPreferredCurrency: async data => {
    const result = await axios({
      method: 'POST',
      url: `preferredCurrency`,
      data: data,
      headers: {Authorization: `Bearer ${data.token}`},
    });
    return result;
  },

  // 10-11-21
  restoreWalletData: async data => {
    const result = await axios({
      method: 'POST',
      url: `/restoreWallet`,
      data: data.data,
    });
    return result;
  },
};
