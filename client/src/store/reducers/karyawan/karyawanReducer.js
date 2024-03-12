const initialState = {
  karyawanList: [],
  karyawanListAll: [],
  karyawanDetail: {},
  karyawanByNip: {},
  loading: false,
  loadingAll: false,
  loadingDetail: false,
  loadingByNip: false,
  isSubmitting: false,
  loadingStopKaryawan: false
};

export const karyawanReducer = (state = initialState, action) => {
  const dictionary = {
    GET_KARYAWAN_LIST: {
      ...state,
      karyawanList: action.payload,
      loading: false
    },
    GET_ALL_KARYAWAN_LIST: {
      ...state,
      karyawanListAll: action.payload,
      loadingAll: false
    },
    GET_KARYAWAN_DETAIL: {
      ...state,
      karyawanDetail: action.payload,
      loadingDetail: false
    },
    GET_KARYAWAN_BY_NIP: {
      ...state,
      karyawanByNip: action.payload,
      loadingByNip: false
    },
    SET_LOADING_KARYAWAN_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_KARYAWAN_DETAIL: {
      ...state,
      loadingDetail: action.payload
    },
    SET_LOADING_KARYAWAN_BY_NIP: {
      ...state,
      loadingByNip: action.payload
    },
    SET_LOADING_SUBMIT_BUTTON: {
      ...state,
      isSubmitting: action.payload
    },
    SET_LOADING_STOP_KARYAWAN: {
      ...state,
      loadingStopKaryawan: action.payload
    },
    SET_LOADING_ALL_KARYAWAN_LIST: {
      ...state,
      loadingAll: action.payload
    }
  };

  return dictionary[action.type] || state;
};
