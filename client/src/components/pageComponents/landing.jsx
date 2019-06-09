import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Product from "../common/product";
import "./style.css";

class Landing extends Component {
  state = {};
  render() {
    return (
      <Container>
        <br />
        <br />
        <h1>Products</h1>
        <br />
        <hr />
        <br />

        <Row>
          <Product />
        </Row>
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

export default Landing;
