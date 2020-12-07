import { LOG_IN_USER } from '../actions/actionsIndex';
/* eslint-disable no-console */
const initialState = {
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
};

const logInReducer = (state = initialState, action) => {
  console.log('entered login reducer?');
  console.log(state);
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
      };
    default:
      return state;
  }
};

export default logInReducer;
