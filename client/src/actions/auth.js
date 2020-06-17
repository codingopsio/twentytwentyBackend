import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "./types";
import axios from "axios";

// For Loading the user
export const getLoggedInUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      const response = await axios.get("/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

// For Registration
export const register = (id) => async (dispatch) => {
  try {
    let response = await axios.get(`${id}`);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch(getLoggedInUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

// For Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    let response = await axios.post("/api/v1/auth/login", body, config);
    console.log(response.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(getLoggedInUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

// logout user
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGIN_FAILURE,
  });
};
