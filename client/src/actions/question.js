import {
  ALL_QUESTION_LOAD_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  GET_SINGLE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
  ALL_QUESTION_LOAD_ERROR,
  CREATE_QUESTION_ERROR,
} from './types';
import axios from 'axios';

// For loading all questions
// @access: Private
export const getAllQuestions = (webinarId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  try {
    const response = await axios.get(
      `/api/v1/webinars/${webinarId}/questions`,
      config
    );

    dispatch({
      type: ALL_QUESTION_LOAD_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_QUESTION_LOAD_ERROR,
    });
  }
};

// For creating question
// @access: Private
export const createQuestion = ({ description, image, webinarId }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  let formData = new FormData();
  formData.append('file', image);
  formData.append('description', description);

  try {
    const response = await axios.post(
      `/api/v1/webinars/${webinarId}/questions`,
      formData,
      config
    );

    dispatch({
      type: CREATE_QUESTION_SUCCESS,
      payload: response.data,
    });

    dispatch(getAllQuestions(webinarId));
  } catch (err) {
    dispatch({
      type: CREATE_QUESTION_ERROR,
    });
    return err;
  }
};
