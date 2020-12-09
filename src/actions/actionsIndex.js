const LOG_IN_USER = 'LOG_IN_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';
const SET_FAVORITES = 'SET_FAVORITES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const SET_PRODUCTS = 'SET_PRODUCTS';

const logInUser = user => ({
  type: LOG_IN_USER,
  loggedIn: 'LOGGED_IN',
  user,
});

const logOutUser = () => ({
  type: LOG_OUT_USER,
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
});

const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

const setFavorites = favorites => ({
  type: SET_FAVORITES,
  favorites,
});

const addFavorite = favorite => ({
  type: ADD_FAVORITE,
  favorite,
});

const removeFavorite = (id, favorite) => ({
  type: REMOVE_FAVORITE,
  id,
  favorite,
});

export {
  logInUser, LOG_IN_USER,
  logOutUser, LOG_OUT_USER,
  setFavorites, SET_FAVORITES,
  addFavorite, ADD_FAVORITE,
  removeFavorite, REMOVE_FAVORITE,
  setProducts, SET_PRODUCTS,
};
