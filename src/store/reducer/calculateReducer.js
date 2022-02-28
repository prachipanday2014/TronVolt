import { INCREMENT, DECREMENT, MULTI, DEVIDE } from '../action';

const initState = {
  num: 0,
};

export const CalculateReducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT: {
      return { ...state, num: action.payload };
    }
    case DECREMENT: {
      return { ...state, num: action.payload };
    }
    case MULTI: {
      return { ...state, num: action.payload };
    }
    case DEVIDE: {
      return { ...state, num: action.payload };
    }
    default: {
      return state;
    }
  }
};

