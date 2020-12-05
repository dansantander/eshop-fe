import { combineReducers } from 'redux';
import logInReducer from './logInReducer';
import favoritesReducer from './favoritesReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  logIn: logInReducer,
  favorites: favoritesReducer,
  products: productsReducer,
});

export default rootReducer;
