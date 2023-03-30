const initialState = {
  dashboardData: {},
  loading: false
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
    }
  };

  return dictionary[action.type] || state;
};
