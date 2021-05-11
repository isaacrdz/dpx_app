import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  SET_ERROR,
  SET_LOADING,
  CLEAR_STATE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,

        user: action.payload,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};