const initialState = {
  menuPermission: [],
  listClient: [],
  isLoading: true,
};

export const keycloakReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'KEYCLOAK_MENU_PERMISSION': {
      return { ...state, menuPermission: action.payload, isLoading: false };
    }
    case 'KEYCLOAK_LIST_CLIENT': {
      return { ...state, listClient: action.payload, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
