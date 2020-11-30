const LOG_IN_USER = 'LOG_IN_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

const logInUser = user => ({
  type: LOG_IN_USER,
  loggedIn: 'LOGGED_IN',
  user,
});

const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export {
  logInUser, LOG_IN_USER,
  logOutUser, LOG_OUT_USER,
};
