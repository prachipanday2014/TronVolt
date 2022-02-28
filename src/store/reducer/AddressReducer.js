import {GET_ADDRESS_DATA} from '../action';

const initState = {
  addressData: [],
};

export const AddressReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ADDRESS_DATA: {
      return {...state, addressData: action.payload};
    }
    default: {
      return state;
    }
  }
};
