const initialState = {
  karyawanList: [],
  karyawanDetail: {},
  loading: false,
  loadingDetail: false,
  isSubmitting: false
};

export const karyawanReducer = (state = initialState, action) => {
  const dictionary = {
    GET_KARYAWAN_LIST: {
      ...state,
      karyawanList: action.payload,
      loading: false
    },
    GET_KARYAWAN_DETAIL: {
      ...state,
      karyawanDetail: action.payload,
      loadingDetail: false
    },
    SET_LOADING_KARYAWAN_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_KARYAWAN_DETAIL: {
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
