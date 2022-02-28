import {CURRENCY_DATA} from '../action';

const initState = {
  currencyData: [],
};

export const CurrencyReducer = (state = initState, action) => {
  switch (action.type) {
    case CURRENCY_DATA: {
      return {...state, currencyData: action.payload};
    }
    default: {
      return state;
    }
  }
};
