const initialState = {
  masterIuranList: [],
  loading: false,
  isSubmitting: false
};

export const masterIuranReducer = (state = initialState, action) => {
  const dictionary = {
    GET_MASTER_IURAN: {
      ...state,
      masterIuranList: action.payload,
      loading: false
    },
    SET_LOADING_MASTER_IURAN_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_SUBMIT_BUTTON: {
      ...state,
      isSubmitting: action.payload
    }
  };

  return dictionary[action.type] || state;
};
