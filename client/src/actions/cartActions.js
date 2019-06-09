import store from "../store";
import {
  ADD_PRODUCT_TO_CART,
  LOAD_PRODUCTS_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  PERFORM_CHECKOUT,
  GET_ERRORS
} from "./types";
import axios from "axios";

//get all products for cart
export const loadAllProductsToCart = () => dispatch => {
  var productsString = localStorage.cartProducts;
  var bill = localStorage.bill;
  var products = [];
  if (productsString !== undefined && bill !== undefined) {
    products = JSON.parse(productsString).map(product => {
      return product;
    });
    bill = parseInt(bill);
  } else {
    products = [];
    bill = 0;
  }
  dispatch({
    type: LOAD_PRODUCTS_TO_CART,
    payload: products,
    bill: bill
  });
};

export const addProductToCart = product => dispatch => {
  //get the state from store
  var { products } = store.getState().cart;
  var { bill } = store.getState().cart;
  //add the recieved product to array
  products.push(product);
  bill = bill + parseInt(product.price);
  storeCartContentsInLocalStorage(products, bill);
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: products,
    bill: bill
  });
};

export const deleteProductFromCart = product => dispatch => {
  //get the state from store
  var { products } = store.getState().cart;
  var { bill } = store.getState().cart;
  var index = products.findIndex(p => p._id === product._id);
  //removing item from array
  products.splice(index, 1);
  //reducing the bill
  bill = bill - parseInt(product.price);

  storeCartContentsInLocalStorage(products, bill);

  dispatch({
    type: DELETE_PRODUCT_FROM_CART,
    payload: products,
    bill: bill
  });
};

const storeCartContentsInLocalStorage = (products, bill) => {
  localStorage.setItem("cartProducts", JSON.stringify(products));
  localStorage.setItem("bill", bill);
};

export const performCheckout = (order, history) => dispatch => {
  axios
    .post("/api/orders", order)
    .then(res => {
      alert("Order is placed successfully");
      history.push("/");
      const cartProducts = [];
      storeCartContentsInLocalStorage(cartProducts, 0);
      dispatch({
        type: PERFORM_CHECKOUT,
        payload: cartProducts,
        bill: 0
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
