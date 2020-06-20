import {
  FREE_COURSE_LOAD_SUCCESS,
  FREE_COURSE_LOAD_FAILURE,
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
    case FREE_COURSE_LOAD_FAILURE:
      return {
        ...state,
        courses: [],
        loading: false,
      };
    default:
      return state;
  }
}
