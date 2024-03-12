const initialState = {
  kontrakList: [],
  kontrakListAll: [],
  kontrakListByNip: [],
  kontrakDetail: {},
  loading: false,
  loadingAll: false,
  loadingDetail: false,
  loadingListByNip: false,
  isSubmitting: false,
  loadingStopKontrak: true
};

export const kontrakReducer = (state = initialState, action) => {
  const dictionary = {
    GET_KONTRAK_LIST: {
      ...state,
      kontrakList: action.payload,
      loading: false
    },
    GET_KONTRAK_LIST_BY_NIP: {
      ...state,
      kontrakListByNip: action.payload,
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
    SET_LOADING_KONTRAK_LIST_BY_NIP: {
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
    },
    SET_LOADING_KONTRAK_BY_NIP: {
      ...state,
      loadingListByNip: action.payload
    },
    SET_LOADING_STOP_KONTRAK: {
      ...state,
      loadingStopKontrak: action.payload
    },
    GET_KONTRAK_LIST_ALL: {
      ...state,
      kontrakListAll: action.payload,
      loadingAll: false
    },
    SET_LOADING_KONTRAK_LIST_ALL: {
      ...state,
      loadingAll: action.payload
    }
  };

  return dictionary[action.type] || state;
};
