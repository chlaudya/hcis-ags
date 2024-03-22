const initialState = {
  reportTagihanGaji: [],
  reportAllTagihanGaji: [],
  loading: false,
  loadingGetAll: false
};

export const reportTagihanGajiReducer = (state = initialState, action) => {
  const dictionary = {
    GET_REPORT_TAGIHAN_GAJI: {
      ...state,
      reportTagihanGaji: action.payload,
      loading: false
    },
    SET_LOADING_REPORT_TAGIHAN_GAJI: {
      ...state,
      loading: action.payload
    },
    GET_REPORT_ALL_TAGIHAN_GAJI: {
      ...state,
      reportAllTagihanGaji: action.payload,
      loadingGetAll: action.payload
    },
    SET_LOADING_REPORT_ALL_TAGIHAN_GAJI: {
      ...state,
      loadingGetAll: action.payload
    }
  };

  return dictionary[action.type] || state;
};
