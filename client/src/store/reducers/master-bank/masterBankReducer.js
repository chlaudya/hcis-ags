const initialState = {
  masterBankList: [],
  loading: false,
  isSubmitting: false,
  dropdownBank: []
};

export const masterBankReducer = (state = initialState, action) => {
  const dictionary = {
    GET_MASTER_BANK: {
      ...state,
      masterBankList: action.payload,
      loading: false
    },
    SET_LOADING_MASTER_BANK_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_SUBMIT_BUTTON: {
      ...state,
      isSubmitting: action.payload
    },
    GET_DROPDOWN_BANK: {
      ...state,
      dropdownBank: action.payload
    }
  };

  return dictionary[action.type] || state;
};
