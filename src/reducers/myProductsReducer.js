import { SET_MY_PRODUCTS } from '../actions/actionsIndex';

const myProductsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MY_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default myProductsReducer;
