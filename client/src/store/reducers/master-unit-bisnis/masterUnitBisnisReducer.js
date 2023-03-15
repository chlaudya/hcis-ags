const initialState = {
  masterUnitBisnisList: [],
  loading: false,
  isSubmitting: false,
  dropdownUnitBisnis: []
};

export const masterUnitBisnisReducer = (state = initialState, action) => {
  const dictionary = {
    GET_MASTER_UNIT_BISNIS: {
      ...state,
      masterUnitBisnisList: action.payload,
      loading: false
    },
    SET_LOADING_MASTER_UNIT_BISNIS_LIST: {
      ...state,
      loading: action.payload
    },
    SET_LOADING_SUBMIT_BUTTON: {
      ...state,
      isSubmitting: action.payload
    },
    GET_DROPDOWN_UNIT_BISNIS: {
      ...state,
      dropdownUnitBisnis: action.payload
    }
  };

  return dictionary[action.type] || state;
};
