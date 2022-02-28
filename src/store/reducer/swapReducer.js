import { SWAP_DATA, FIATCURRENCIES_DATA, PERCENTAGESWAP_DATA, CHECKSWAPRATE_DATA } from '../action';

const initState = {
    swapData: [],
    fiatCurrenciesData: [],
    percentageSawpData: [],
    checkSwapRateData: [],
};

export const SwapReducer = (state = initState, action) => {
    switch (action.type) {
        case SWAP_DATA: {
            return { ...state, swapData: action.payload };
        }
        case FIATCURRENCIES_DATA: {
            return { ...state, fiatCurrenciesData: action.payload };
        }
        case PERCENTAGESWAP_DATA: {
            return { ...state, percentageSawpData: action.payload };
        }
        case CHECKSWAPRATE_DATA: {
            return { ...state, checkSwapRateData: action.payload };
        }
        default: {
            return state;
        }
    }
};
