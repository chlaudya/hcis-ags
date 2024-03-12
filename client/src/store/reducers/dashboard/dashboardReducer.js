const initialState = {
  dashboardData: [],
  dashboardAllData: [],
  loading: false,
  loadingAllData: false
};

export const dashboardReducer = (state = initialState, action) => {
  const dictionary = {
    GET_DASHBOARD_DATA: {
      ...state,
      dashboardData: action.payload,
      loading: false
    },
    SET_LOADING_DASHBOARD_DATA: {
      ...state,
      loading: action.payload
    },
    GET_DASHBOARD_ALL_DATA: {
      ...state,
      dashboardAllData: action.payload,
      loadingAllData: false
    },
    SET_LOADING_DASHBOARD_ALL_DATA: {
      ...state,
      loadingAllData: action.payload
    }
  };

  return dictionary[action.type] || state;
};
