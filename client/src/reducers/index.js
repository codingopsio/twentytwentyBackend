import { combineReducers } from 'redux';
import auth from './auth';
import course from './course';
import question from './question';

export default combineReducers({
  auth,
  course,
  question,
});
