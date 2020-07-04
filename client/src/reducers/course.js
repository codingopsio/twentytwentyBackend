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
} from "../actions/types";

const initialState = {
  courses: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FREE_COURSE_LOAD_SUCCESS:
      return {
        ...state,
        courses: payload.data,
        loading: false,
      };
    case CREATE_WEBINAR_SUCCESS:
    case UPDATE_WEBINAR_SUCCESS:
    case ADD_IMAGE_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case DELETE_WEBINAR_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case FREE_COURSE_LOAD_FAILURE:
    case CREATE_WEBINAR_FAILURE:
    case ADD_IMAGE_FAILURE:
    case UPDATE_WEBINAR_FAILURE:
    case DELETE_WEBINAR_FAILURE:
      return {
        ...state,
        courses: [],
        loading: false,
      };
    default:
      return state;
  }
}
