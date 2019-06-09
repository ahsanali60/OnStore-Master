import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import { addProductToCart } from "../../actions/cartActions";

class Product extends Component {
  addProduct(product, e) {
    e.preventDefault();
    this.props.addProductToCart(product);
  }
  // constructor() {
  //   super();
  //   this.addProduct = this.addProduct.bind(this);
  // }
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products } = this.props;
    if (products !== null) {
      if (products.length === 0)
        return <div>There is no products in the database</div>;
      return (
        <React.Fragment>
          {products.map(product => {
            return (
              <div
                key={product._id}
                className="col-xs-6 col-sm-6 col-md-4 col-lg-3"
              >
                <Card
                  className="simple-product"
                  style={{
                    width: "14rem",
                    marginRight: "0.5rem",
                    marginTop: "0.5rem"
                  }}
                >
                  <Card.Img variant="top" src="https://picsum.photos/280" />
                  <Card.Body>
                    <hr />
                    <Card.Title className="text-center">
                      ${product.price}
                    </Card.Title>
                    <Card.Text className="text-center">
                      {product.name}
                    </Card.Text>
                    <div className="text-center">
                      <Button
                        onClick={this.addProduct.bind(this, product)}
                        variant="outline-dark"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </React.Fragment>
      );
    }
    return <p>Loading</p>;
  }
}

Product.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  products: state.product.products
});
export default connect(
  mapStateToProps,
  { getAllProducts, addProductToCart }
)(Product);
