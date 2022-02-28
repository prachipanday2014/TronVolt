import {NEWS_DATA, COINS_DATA} from '../action';

const initState = {
  newsData: [],
  coinData: [],
};

export const NewsReducer = (state = initState, action) => {
  switch (action.type) {
    case NEWS_DATA: {
      return {...state, newsData: action.payload};
    }
    case COINS_DATA: {
      return { ...state, coinData: action.payload };
    }
    default: {
      return state;
    }
  }
};
