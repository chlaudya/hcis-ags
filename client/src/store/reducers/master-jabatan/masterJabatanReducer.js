const initialState = {
  masterJabatanList: [],
  masterJabatanDetail: {},
  loading: false,
  loadingDetail: false,
  isSubmitting: false
};

export const masterJabatanReducer = (state = initialState, action) => {
  const dictionary = {
    GET_MASTER_JABATAN: {
      ...state,
      masterJabatanList: action.payload,
      loading: false
    },
    GET_MASTER_JABATAN_DETAIL: {
      ...state,
      masterJabatanDetail: action.payload,
      loadingDetail: false
    },
    SET_LOADING_MASTER_JABATAN_LIST: {
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
