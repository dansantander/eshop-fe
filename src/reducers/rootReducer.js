import { combineReducers } from 'redux';
import logInReducer from './logInReducer';

const rootReducer = combineReducers({
  logIn: logInReducer,
});

export default rootReducer;
