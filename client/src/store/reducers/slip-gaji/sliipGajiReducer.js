const initialState = {
  slipGaji: [],
  loading: false
};

export const slipGajiReducer = (state = initialState, action) => {
  const dictionary = {
    GET_GENERATE_SLIP_GAJI: {
      ...state,
      slipGaji: action.payload,
      loading: false
    },
    SET_LOADING_GENERATE_SLIP_GAJI: {
      ...state,
      loading: action.payload
    }
  };

  return dictionary[action.type] || state;
};
