import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAILURE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_NAME_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOAD_USER_FAIL:
    case UPDATE_NAME_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
