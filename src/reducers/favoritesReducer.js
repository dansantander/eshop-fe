import { SET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/actionsIndex';

const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.favorites;
    case ADD_FAVORITE:
      return [...state, action.favorite];
    case REMOVE_FAVORITE:
      return state.slice().filter(favorite => favorite.id !== action.favorite.id);
    default:
      return state;
  }
};

export default favoritesReducer;
