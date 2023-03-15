const initialState = {
  masterTempatTugasList: [],
  loading: false,
  isSubmitting: false,
  dropdownTempatTugas: []
};

export const masterTempatTugasReducer = (state = initialState, action) => {
  const dictionary = {
    GET_MASTER_TEMPAT_TUGAS: {
      ...state,
      masterTempatTugasList: action.payload,
      loading: false
    },
    SET_LOADING_MASTER_TEMPAT_TUGAS_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_SUBMIT_BUTTON: {
      ...state,
      isSubmitting: action.payload
    },
    GET_DROPDOWN_TEMPAT_TUGAS: {
      ...state,
      dropdownTempatTugas: action.payload
    }
  };

  return dictionary[action.type] || state;
};
