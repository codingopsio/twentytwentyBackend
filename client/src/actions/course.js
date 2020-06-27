import {
  FREE_COURSE_LOAD_SUCCESS,
  FREE_COURSE_LOAD_FAILURE,
} from '../actions/types';
import axios from 'axios';

// For loading all webinars
export const getAllWebinars = (param) => async (dispatch) => {
  let query;
  if (param) {
    query = `ManageTopics[in]=${param}`;
  } else {
    query = '';
  }

  try {
    let response = await axios.get(`/api/v1/webinars?${query}`);

    console.log(response.data);

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
