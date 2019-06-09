import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

class CartCounter extends Component {
  state = { count: 0 };
  render() {
    return (
      <Link to="/cart" className="btn btn-outline-dark">
        <h3>
          <i className="fas fa-shopping-cart" />
        </h3>
        <Badge variant={this.getBadgeClasses()}>
          {this.handleIncreament()}
        </Badge>
      </Link>
    );
  }
  getBadgeClasses() {
    return this.state.count === 0 ? "danger" : "warning";
  }
  handleIncreament() {
    return this.state.count === 0 ? "EMPTY" : this.state.count;
  }
}

export default CartCounter;
