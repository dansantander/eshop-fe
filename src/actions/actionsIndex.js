const LOG_IN_USER = 'LOG_IN_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';
const SET_FAVORITES = 'SET_FAVORITES';

const logInUser = user => ({
  type: LOG_IN_USER,
  loggedIn: 'LOGGED_IN',
  user,
});

const logOutUser = () => ({
  type: LOG_OUT_USER,
});

const setFavorites = favorites => ({
  type: SET_FAVORITES,
  favorites,
});

export {
  logInUser, LOG_IN_USER,
  logOutUser, LOG_OUT_USER,
  setFavorites, SET_FAVORITES,
};
