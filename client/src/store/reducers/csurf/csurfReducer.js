const initialState = {
  loading: true,
  error: null,
  token: null,
  response: null,
};

export const csurfReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CSURF': {
      return { ...state, token: action.payload };
    }
    default: {
      return state;
    }
  }
};
