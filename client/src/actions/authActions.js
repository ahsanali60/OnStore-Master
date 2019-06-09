import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Login User
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      //Save Token to local Storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set token to request header
      setAuthToken(token);
      //decode the user
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
//logout user
export const logoutUser = () => dispatch => {
  //remove toke
  localStorage.removeItem("jwtToken");
  //remove auth header
  setAuthToken(false);
  //remove user from state
  dispatch(setCurrentUser({}));
};
