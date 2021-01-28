import { combineReducers } from 'redux';
import logInReducer from './logInReducer';
import favoritesReducer from './favoritesReducer';
import productsReducer from './productsReducer';
import myProductsReducer from './myProductsReducer';

const rootReducer = combineReducers({
  logIn: logInReducer,
  favorites: favoritesReducer,
  products: productsReducer,
  myProducts: myProductsReducer,
});

export default rootReducer;
