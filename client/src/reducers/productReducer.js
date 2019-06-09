import { GET_ALL_PRODUCTS, PRODUCT_LOADING } from "../actions/types";

const initialState = {
  product: null,
  products: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
