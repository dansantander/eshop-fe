import { combineReducers } from 'redux';
import logInReducer from './logInReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  logIn: logInReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
