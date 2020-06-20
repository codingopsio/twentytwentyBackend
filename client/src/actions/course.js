import {
  FREE_COURSE_LOAD_SUCCESS,
  FREE_COURSE_LOAD_FAILURE,
} from '../actions/types';
import axios from 'axios';

// For loading all webinars
export const getAllWebinars = () => async (dispatch) => {
  try {
    let response = await axios.get('/api/v1/webinars');

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
