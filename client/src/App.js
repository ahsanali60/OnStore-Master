import React from "react";
import Landing from "./components/pageComponents/landing";
import LoginForm from "./components/auth/loginForm";
import SignUp from "./components/auth/signup";
import NavBar from "./components/common/navbar";
import Footer from "./components/common/footer";
import Cart from "./components/pageComponents/cart";
import Checkout from "./components/pageComponents/checkout";
import { Provider } from "react-redux";
import store from "./store";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
