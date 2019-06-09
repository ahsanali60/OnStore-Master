import React, { Component } from "react";
import SearchBox from "./searchbox";
import CartCounter from "./cartcounter";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
  onLougoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <a
        className="navbar-brand"
        href="#"
        onClick={this.onLougoutClick.bind(this)}
      >
        Logout
      </a>
    );
    const guestLinks = (
      <React.Fragment>
        <Link className="navbar-brand" to="/login">
          Login
        </Link>

        <Link className="navbar-brand" to="/signup">
          Register
        </Link>
      </React.Fragment>
    );

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand to="/">
          <h3>On-Store</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="navbar-brand" to="/">
              Products{" "}
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
            <Nav.Item>
              <SearchBox />
            </Nav.Item>
            <Nav.Item>
              <CartCounter />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
