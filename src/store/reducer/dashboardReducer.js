import {DASHBOARD_DATA, SEND_DATA, HISTORY_DATA} from '../action';

const initState = {
  dashboardData: [],
  sendData: [],
  historyData: [],
};

export const DashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case DASHBOARD_DATA: {
      return {...state, dashboardData: action.payload};
    }
    case SEND_DATA: {
      return {...state, sendData: action.payload};
    }
    case HISTORY_DATA: {
      return {...state, historyData: action.payload};
    }
    default: {
      return state;
    }
  }
};
