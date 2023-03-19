const initialState = {
  kontrakList: [],
  kontrakDetail: {},
  loading: false,
  loadingDetail: false,
  isSubmitting: false
};

export const kontrakReducer = (state = initialState, action) => {
  const dictionary = {
    GET_KONTRAK_LIST: {
      ...state,
      kontrakList: action.payload,
      loading: false
    },
    GET_KONTRAK_DETAIL: {
      ...state,
      kontrakDetail: action.payload,
      loadingDetail: false
    },
    SET_LOADING_KONTRAK_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_KONTRAK_DETAIL: {
      ...state,
      loadingDetail: action.payload
    },
    SET_LOADING_SUBMIT_BUTTON: {
      ...state,
      isSubmitting: action.payload
    }
  };

  return dictionary[action.type] || state;
};
