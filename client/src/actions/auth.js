import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  FREE_COURSE_LOAD_FAILURE,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAILURE,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from './types';
import axios from 'axios';

// For Loading the user
export const getLoggedInUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      const response = await axios.get('/api/v1/auth/me', {
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
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    let response = await axios.post('/api/v1/auth/login', body, config);
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

  dispatch({
    type: FREE_COURSE_LOAD_FAILURE,
  });
};

// update user name
export const updateName = (name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };
  let body = JSON.stringify({ name });
  console.log(body);
  try {
    const response = await axios.put(
      '/api/v1/auth/updatedetails',
      body,
      config
    );
    dispatch({
      type: UPDATE_NAME_SUCCESS,
      payload: response.data,
    });
    dispatch(getLoggedInUser());
  } catch (err) {
    dispatch({
      type: UPDATE_NAME_FAILURE,
    });
    dispatch({
      type: FREE_COURSE_LOAD_FAILURE,
    });
  }
};

// Update User password
export const updatePassword = (currentPassword, newPassword) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  let body = JSON.stringify({ currentPassword, newPassword });

  try {
    const response = await axios.put(
      '/api/v1/auth/updatepassword',
      body,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: err.response.data.error,
    });
  }
};

// forgot user password
export const forgotPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };

  const body = JSON.stringify({ email });
  try {
    const response = await axios.post(
      '/api/v1/auth/forgotpassword',
      body,
      config
    );
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: err.response.data.error,
    });
    return err.response.data.error;
  }
};
