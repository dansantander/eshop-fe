import { LOG_IN_USER } from '../actions/actionsIndex';

const initialState = {
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
