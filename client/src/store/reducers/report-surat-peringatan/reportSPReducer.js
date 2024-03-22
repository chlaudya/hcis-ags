const initialState = {
  reportSuratPeringatan: [],
  reportAllSuratPeringatan: [],
  loading: false,
  loadingGetAll: false
};

export const reportSuratPeringatanReducer = (state = initialState, action) => {
  const dictionary = {
    GET_REPORT_SURAT_PERINGATAN: {
      ...state,
      reportSuratPeringatan: action.payload,
      loading: false
    },
    SET_LOADING_REPORT_SURAT_PERINGATAN: {
      ...state,
      loading: action.payload
    },
    GET_REPORT_ALL_SURAT_PERINGATAN: {
      ...state,
      reportAllSuratPeringatan: action.payload,
      loadingGetAll: action.payload
    },
    SET_LOADING_REPORT_ALL_SURAT_PERINGATAN: {
      ...state,
      loadingGetAll: action.payload
    }
  };

  return dictionary[action.type] || state;
};
