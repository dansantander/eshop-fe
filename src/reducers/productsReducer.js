import { SET_PRODUCTS } from '../actions/actionsIndex';

const initialState = {
  products: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default favoritesReducer;
