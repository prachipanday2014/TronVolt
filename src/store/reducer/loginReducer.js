import {
  CHANGE_PASSWORD_DATA,
  CHANGE_SECOND_PASSWORD_DATA,
  LOGOUT,
  POSTS,
  SELECT_LANGUAGE,
  USER_LOGIN,
  USER_SIGNUP,
  REGISTER_DATA,
  ACCESS_TOKEN,
} from '../action';

const initState = {
  isLogin: 0,
  selectLanguage: '',
  loginData: [],
  signupData: [],
  posts: [],
  regis: [],
  accessToken: '',
};

export const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {...state, loginData: action.payload};
    }
    case REGISTER_DATA: {
      return {...state, regis: action.payload};
    }
    case USER_SIGNUP: {
      return {...state, signupData: action.payload};
    }
    case LOGOUT: {
      return {...state, loginData: action.payload};
    }
    case POSTS: {
      return {...state, posts: action.payload};
    }
    case SELECT_LANGUAGE: {
      return {...state, selectLanguage: action.payload};
    }
    case ACCESS_TOKEN: {
      return {...state, accessToken: action.payload};
    }
    default: {
      return state;
    }
  }
};
