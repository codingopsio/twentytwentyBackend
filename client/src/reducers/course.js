import {
  FREE_COURSE_LOAD_SUCCESS,
  FREE_COURSE_LOAD_FAILURE,
  CREATE_WEBINAR_SUCCESS,
  CREATE_WEBINAR_FAILURE,
} from '../actions/types';

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
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case FREE_COURSE_LOAD_FAILURE:
    case CREATE_WEBINAR_FAILURE:
      return {
        ...state,
        courses: [],
        loading: false,
      };
    default:
      return state;
  }
}
