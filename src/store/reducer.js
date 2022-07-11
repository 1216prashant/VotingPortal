import { Constants } from "../utils/Constants";

const initialState = {
  userData: null,
  login: false,
  retrieved: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.RETRIEVE_APP: {
      const data = action.payload.data;
      if (data) {
        return {
          ...state,
          retrieved: true,
          login: true,
          userData: data,
        };
      } else {
        return {
          ...state,
          retrieved: true,
          login: false,
        };
      }
    }
    case Constants.LOGIN_SUCCESS: {
      const data = action.payload.data;
      return {
        ...state,
        login: true,
        userData: data,
      };
    }
    case Constants.LOGOUT: {
      return {
        ...state,
        login: false,
        userData: null,
      };
    }
    default:
      return { ...state };
  }
};
export { reducer };
