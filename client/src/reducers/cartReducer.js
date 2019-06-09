import {
  ADD_PRODUCT_TO_CART,
  LOAD_PRODUCTS_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  PERFORM_CHECKOUT
} from "../actions/types";

const initialState = {
  products: [],
  bill: 0
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: action.payload,
        bill: action.bill
      };
    case LOAD_PRODUCTS_TO_CART:
      return {
        ...state,
        products: action.payload,
        bill: action.bill
      };
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        products: action.payload,
        bill: action.bill
      };
    case PERFORM_CHECKOUT:
      return {
        ...state,
        products: action.payload,
        bill: action.bill
      };
    default:
      return state;
  }
}
