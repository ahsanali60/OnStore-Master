import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadAllProductsToCart,
  deleteProductFromCart
} from "../../actions/cartActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Cart extends Component {
  componentDidMount() {
    this.props.loadAllProductsToCart();
  }
  deleteProduct(product, e) {
    e.preventDefault();
    this.props.deleteProductFromCart(product);
  }
  render() {
    const { products } = this.props;
    const { bill } = this.props;

    if (products.length === 0)
      return (
        <div className="container">
          <h1 className="text-center mt-5">Cart</h1>
          <hr />
          <h3 className="text-center mt-5 ">There is no product in cart</h3>
        </div>
      );
    else {
      let productCounter = 0;
      return (
        <div className="container">
          <h1 className="text-center mt-5">Cart</h1>
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                if (product !== null)
                  return (
                    <tr key={product._id}>
                      <th scope="row">{++productCounter}</th>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>
                        <button
                          onClick={this.deleteProduct.bind(this, product)}
                          className="btn btn-outline-danger"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
              })}
              <tr>
                <th />
                <td />
                <td>
                  <h6 className="d-inline text-left">Total Bill: </h6>${bill}
                </td>
                <td />
              </tr>
            </tbody>
          </table>
          <div className="mt-5">
            <h5>CheckOut</h5>
            <hr />
            <h6 className="d-inline text-left">Items Bill: </h6>${bill}
            <br />
            <br />
            <h6 className="d-inline text-left">Shiping Charges: </h6>${3}
            <hr />
            <br />
            <h6 className="d-inline text-left">Total Bill: </h6>${bill + 3}
            <br />
            <br />
            <span>
              {this.props.isAuthenticated ? (
                <Link to="/checkout" className="btn btn-outline-dark">
                  Check Out
                </Link>
              ) : (
                <h3>Login First to Check Out</h3>
              )}
            </span>
          </div>
          <br />
          <br />
          <br />
        </div>
      );
    }
  }
} //end class

Cart.propTypes = {
  products: PropTypes.array,
  loadAllProductsToCart: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  products: state.cart.products,
  bill: state.cart.bill,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadAllProductsToCart, deleteProductFromCart }
)(Cart);
