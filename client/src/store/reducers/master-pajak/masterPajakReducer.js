const initialState = {
  masterPajakList: [],
  loading: false,
  isSubmitting: false
};

export const masterPajakReducer = (state = initialState, action) => {
  const dictionary = {
    GET_MASTER_PAJAK: {
      ...state,
      masterPajakList: action.payload,
      loading: false
    },
    SET_LOADING_MASTER_PAJAK_LIST: {
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
