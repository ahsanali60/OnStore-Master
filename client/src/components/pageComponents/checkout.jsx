import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { performCheckout } from "../../actions/cartActions";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      phone: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newOrder = {
      user: this.props.auth.user,
      address: this.state.address,
      phone: this.state.phone,
      products: this.props.cart.products,
      bill: this.props.cart.bill
    };
    this.props.performCheckout(newOrder, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/login");
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Check Out</h1>
              <form className="mt-5" noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />

                <TextFieldGroup
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />

                <input
                  type="submit"
                  className="btn btn-dark btn-block mt-4"
                  value="Place Order"
                />
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
Checkout.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  performCheckout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { performCheckout }
)(Checkout);
