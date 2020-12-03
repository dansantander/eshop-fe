import { SET_FAVORITES } from '../actions/actionsIndex';

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.favorites;
    default:
      return state;
  }
};

export default favoritesReducer;
