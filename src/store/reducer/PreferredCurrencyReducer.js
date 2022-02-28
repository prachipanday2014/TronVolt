import {PREFERRED_CURRENCY_DATA} from '../action';

const initState = {
  preferredcurrencyData: [],
};

export const PreferredCurrencyReducer = (state = initState, action) => {
  switch (action.type) {
    case PREFERRED_CURRENCY_DATA: {
      return {...state, preferredcurrencyData: action.payload};
    }
    default: {
      return state;
    }
  }
};
