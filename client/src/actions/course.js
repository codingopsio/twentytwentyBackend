import {
  FREE_COURSE_LOAD_SUCCESS,
  FREE_COURSE_LOAD_FAILURE,
  CREATE_WEBINAR_SUCCESS,
  CREATE_WEBINAR_FAILURE,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAILURE,
  UPDATE_WEBINAR_SUCCESS,
  UPDATE_WEBINAR_FAILURE,
  DELETE_WEBINAR_SUCCESS,
  DELETE_WEBINAR_FAILURE,
  GET_SINGLE_WEBINAR_SUCCESS,
  GET_SINGLE_WEBINAR_FAILURE,
} from '../actions/types';
import axios from 'axios';

// For loading all webinars
// @access: Public
export const getAllWebinars = (param = '') => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/webinars?${param}`);

    dispatch({
      type: FREE_COURSE_LOAD_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FREE_COURSE_LOAD_FAILURE,
    });
  }
};

// For loading single webinar
// @access: Public
export const getSingleWebinar = (id) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/webinars/${id}`);

    dispatch({
      type: GET_SINGLE_WEBINAR_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_WEBINAR_FAILURE,
    });
  }
};

// For Creating a course/webinar
// @access: Private/ Admin only
export const createWebinar = ({
  title,
  description,
  time,
  plan,
  CourseStructure,
  ManageTopics,
  difficulty,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    title,
    description,
    time,
    plan,
    CourseStructure: CourseStructure.split(','),
    ManageTopics: ManageTopics.split(','),
    difficulty,
  });

  try {
    const response = await axios.post('/api/v1/webinars', body, config);

    dispatch({
      type: CREATE_WEBINAR_SUCCESS,
      payload: response.data,
    });

    dispatch(getAllWebinars());
  } catch (err) {
    dispatch({
      type: CREATE_WEBINAR_FAILURE,
    });
  }
};

// For adding image to a course/webinar
// @access: Private/ Admin only
export const uploadImage = (data) => async (dispatch) => {
  console.log(data);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };
  let formData = new FormData();
  formData.append('file', data.image);

  try {
    const response = await axios.post(
      `/api/v1/webinars/${data.id}/photo`,
      formData,
      config
    );

    dispatch({
      type: ADD_IMAGE_SUCCESS,
      payload: response.data,
    });

    dispatch(getAllWebinars());
  } catch (err) {
    dispatch({
      type: ADD_IMAGE_FAILURE,
    });

    return err;
  }
};

// For updating a course/webinar
// @access: Private/ Admin only
export const updateWebinar = ({
  title,
  description,
  time,
  plan,
  CourseStructure,
  ManageTopics,
  difficulty,
  id,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  const body = JSON.stringify({
    title,
    description,
    time,
    plan,
    CourseStructure: CourseStructure.split(','),
    ManageTopics: ManageTopics.split(','),
    difficulty,
  });

  try {
    const response = await axios.put(`/api/v1/webinars/${id}`, body, config);

    dispatch({
      type: UPDATE_WEBINAR_SUCCESS,
      payload: response.data,
    });

    dispatch(getAllWebinars());
  } catch (err) {
    dispatch({
      type: UPDATE_WEBINAR_FAILURE,
    });

    return err;
  }
};

// delete a webinar
export const deleteWebinar = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };
  try {
    const response = await axios.delete(`/api/v1/webinars/${id}`, config);
    dispatch({
      type: DELETE_WEBINAR_SUCCESS,
      payload: response.data,
    });

    dispatch(getAllWebinars());
  } catch (err) {
    dispatch({
      type: DELETE_WEBINAR_FAILURE,
    });

    return err;
  }
};
