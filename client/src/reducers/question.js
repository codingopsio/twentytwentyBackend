import {
  ALL_QUESTION_LOAD_ERROR,
  ALL_QUESTION_LOAD_SUCCESS,
  CREATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_ERROR,
  DELETE_QUESTION_SUCCESS,
  GET_SINGLE_QUESTION_SUCCESS,
  CREATE_QUESTION_ERROR,
  GET_SINGLE_QUESTION_FAILURE,
  DELETE_QUESTION_ERROR,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAILURE,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_FAILURE,
} from '../actions/types';

const initialState = {
  questions: [],
  singleQuestion: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_QUESTION_LOAD_SUCCESS:
      return {
        ...state,
        questions: payload.data,
        loading: false,
      };
    case CREATE_QUESTION_SUCCESS:
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case GET_SINGLE_QUESTION_SUCCESS:
      return {
        ...state,
        singleQuestion: payload.data,
        loading: false,
      };

    case CREATE_REPLY_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case DELETE_REPLY_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case ALL_QUESTION_LOAD_ERROR:
    case CREATE_QUESTION_ERROR:
    case GET_SINGLE_QUESTION_FAILURE:
    case UPDATE_QUESTION_ERROR:
    case DELETE_QUESTION_ERROR:
    case CREATE_REPLY_FAILURE:
    case DELETE_REPLY_FAILURE:
      return {
        ...state,
        questions: [],
        singleQuestion: null,
        loading: false,
      };

    default:
      return state;
  }
}
