import { LOG_IN_USER, LOG_OUT_USER } from '../actions/actionsIndex';

const initialState = {
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
};

const logInReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
      };
    case LOG_OUT_USER:
      return state;
    default:
      return state;
  }
};

export default logInReducer;
