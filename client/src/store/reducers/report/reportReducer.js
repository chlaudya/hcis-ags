const initialState = {
  reportTagihanGaji: [],
  loading: false
};

export const reportReducer = (state = initialState, action) => {
  const dictionary = {
    GET_REPORT_TAGIHAN_GAJI: {
      ...state,
      reportTagihanGaji: action.payload,
      loading: false
    },
    SET_LOADING_REPORT_TAGIHAN_GAJI: {
      ...state,
      loading: action.payload
    }
  };

  return dictionary[action.type] || state;
};
