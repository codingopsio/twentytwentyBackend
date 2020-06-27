import {
  FREE_COURSE_LOAD_SUCCESS,
  FREE_COURSE_LOAD_FAILURE,
  CREATE_WEBINAR_SUCCESS,
  CREATE_WEBINAR_FAILURE,
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
