import React, { Component } from "react";
import { Container } from "react-bootstrap";
//import { getProductById } from "../services/fakeProductServices";

class ProductPage extends Component {
  state = {};
  render() {
    return (
      <Container>
        <div className="row mt-5">
          <div className="col-6">
            <img src="" alt="" />
          </div>
          <div className="col-6">
            <h3 className="text-left" />
          </div>
        </div>
      </Container>
    );
  }
}

export default ProductPage;
