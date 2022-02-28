import {MATCHSEEDPHRASE_DATA,GETNEWSEEDPHRASE_DATA, RESTOREWALLET_DATA} from '../action';

const initState = {
  matchSeedPhraseData: [],
  newSeedPhraseData: [],
  restoreWallet: []
};

export const SeedsReducer = (state = initState, action) => {
  switch (action.type) {
    case MATCHSEEDPHRASE_DATA: {
      return {...state, matchSeedPhraseData: action.payload};
    }
    case GETNEWSEEDPHRASE_DATA: {
      return {...state, newSeedPhraseData: action.payload};
    }
    case RESTOREWALLET_DATA: {
      return {...state, restoreWallet: action.payload};
    }
    default: {
      return state;
    }
  }
};
