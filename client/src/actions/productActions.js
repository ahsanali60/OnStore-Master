import axios from "axios";
import { GET_ALL_PRODUCTS, PRODUCT_LOADING, GET_ERRORS } from "./types";

//get all products
export const getAllProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("api/products/all")
    .then(res => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS
      })
    );
};
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
