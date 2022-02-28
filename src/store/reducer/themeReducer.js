import {THEME_TYPE, SELECT_LANGUAGE} from '../action';

const initState = {
  isDarkTheme: true,
  selectLanguage: {languageId: 'en-US', languageName: 'English'},
};

export const ThemeReducer = (state = initState, action) => {
  switch (action.type) {
    case THEME_TYPE: {
      return {...state, isDarkTheme: action.payload};
    }
    case SELECT_LANGUAGE: {
      return {...state, selectLanguage: action.payload};
    }

    default: {
      return state;
    }
  }
};
