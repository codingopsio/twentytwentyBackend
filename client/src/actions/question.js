import {
  ALL_QUESTION_LOAD_SUCCESS,
  ALL_QUESTION_LOAD_ERROR,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
  GET_SINGLE_QUESTION_SUCCESS,
  GET_SINGLE_QUESTION_FAILURE,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_ERROR,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_ERROR,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAILURE,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_FAILURE,
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

// For loading single question
// @access: Private
export const getSingleQuestion = (questionId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };
  try {
    const response = await axios.get(`/api/v1/questions/${questionId}`, config);

    dispatch({
      type: GET_SINGLE_QUESTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_QUESTION_FAILURE,
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

// For updating question
// @access: Private
export const updateQuestion = ({ description, image, questionId }) => async (
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
    const response = await axios.put(
      `/api/v1/questions/${questionId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_QUESTION_SUCCESS,
      payload: response.data,
    });

    dispatch(getSingleQuestion(questionId));
  } catch (err) {
    dispatch({
      type: UPDATE_QUESTION_ERROR,
    });
    return err;
  }
};

// Deleting question
// @access: Private
export const deleteQuestion = (questionId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  try {
    const response = await axios.delete(
      `/api/v1/questions/${questionId}`,
      config
    );

    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: response.data,
    });

    dispatch(getSingleQuestion(questionId));
  } catch (err) {
    dispatch({
      type: DELETE_QUESTION_ERROR,
    });
  }
};

// Creating a reply
// @access: Private
export const createReply = ({ description, image, questionId }) => async (
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
      `/api/v1/questions/${questionId}`,
      formData,
      config
    );

    dispatch({
      type: CREATE_REPLY_SUCCESS,
      payload: response.data,
    });

    dispatch(getSingleQuestion(questionId));
  } catch (err) {
    dispatch({
      type: CREATE_REPLY_FAILURE,
    });
    return err;
  }
};

// For deleting reply
// @access: Private
export const deleteReply = (questionId, replyId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };

  try {
    const response = await axios.delete(
      `/api/v1/questions/${questionId}/${replyId}`,
      config
    );

    dispatch({
      type: DELETE_REPLY_SUCCESS,
      payload: response.data,
    });

    dispatch(getSingleQuestion(questionId));
  } catch (err) {
    dispatch({
      type: DELETE_REPLY_FAILURE,
    });
    return err;
  }
};
