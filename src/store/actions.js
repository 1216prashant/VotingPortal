import { Constants } from "../utils/Constants";

export const retrieveAppState = (data) => {
  return {
    type: Constants.RETRIEVE_APP,
    payload: {
      data: data,
    },
  };
};
export const loginSucces = (data) => {
  return {
    type: Constants.LOGIN_SUCCESS,
    payload: {
      data: data,
    },
  };
};
export const logout = () => {
  return {
    type: Constants.LOGOUT,
  };
};
